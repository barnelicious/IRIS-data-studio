// ─── KGG Token Pricing Engine ─────────────────────────────────────
//
// Dynamic token pricing that considers:
// 1. Expert rate → token multiplier (€400 bands)
// 2. Quarterly overhead that must be recouped
// 3. Quarter progression: higher early, relaxes as overhead is covered
// 4. Configurable target margin

// ─── Constants & Configuration ────────────────────────────────────

export const RATE_BAND = 400; // €400 per band

export interface QuarterConfig {
  /** Total quarterly overhead to recoup (rent, salaries, tools, etc.) */
  quarterlyOverhead: number;
  /** Target profit margin on top of break-even (e.g. 0.20 = 20%) */
  targetMarginPct: number;
  /** Minimum token price floor */
  minTokenPrice: number;
  /** Current quarter label, e.g. "Q1 2026" */
  quarterLabel: string;
  /** Quarter start date */
  quarterStart: Date;
  /** Quarter end date */
  quarterEnd: Date;
}

export interface QuarterProgress {
  /** Revenue earned so far this quarter */
  revenueToDate: number;
  /** Tokens sold so far this quarter */
  tokensSoldToDate: number;
  /** Days elapsed in the quarter */
  daysElapsed: number;
  /** Total days in the quarter */
  totalDays: number;
}

export interface PricingResult {
  /** Recommended token price for the client */
  tokenPrice: number;
  /** How many tokens the client pays per hour of consultation */
  tokensPerHour: number;
  /** Effective hourly cost to the client */
  effectiveHourlyRate: number;
  /** Expert's actual hourly rate */
  expertRate: number;
  /** Margin on this engagement */
  marginPct: number;
  /** Price pressure level: how urgently we need revenue */
  pressureLevel: "low" | "moderate" | "high";
  /** Overhead coverage: what % of quarterly overhead is already covered */
  overheadCoveredPct: number;
  /** Breakdown of price components */
  breakdown: {
    baseCost: number;
    overheadAllocation: number;
    marginComponent: number;
    pressureAdjustment: number;
  };
}

// ─── Core Functions ───────────────────────────────────────────────

/**
 * Calculate how many tokens to charge per hour based on expert rate.
 * €0-400 = 1 token, €401-800 = 2 tokens, €801-1200 = 3 tokens, etc.
 */
export function tokensPerHour(expertRate: number): number {
  return Math.ceil(expertRate / RATE_BAND);
}

/**
 * Calculate the quarter progress ratio (0 = start, 1 = end).
 */
export function quarterProgressRatio(progress: QuarterProgress): number {
  return Math.min(progress.daysElapsed / progress.totalDays, 1);
}

/**
 * Calculate the overhead coverage ratio.
 * < 1 means we haven't covered overhead yet; >= 1 means we're profitable.
 */
export function overheadCoverage(
  config: QuarterConfig,
  progress: QuarterProgress
): number {
  return progress.revenueToDate / config.quarterlyOverhead;
}

/**
 * Compute the pricing pressure level.
 * Compares where we SHOULD be (time-proportional) vs where we ARE (revenue-proportional).
 */
export function pricingPressure(
  config: QuarterConfig,
  progress: QuarterProgress
): { level: "low" | "moderate" | "high"; factor: number } {
  const timeRatio = quarterProgressRatio(progress);
  const coverageRatio = overheadCoverage(config, progress);

  // Expected coverage at this point in the quarter
  const expectedCoverage = timeRatio;

  // How far ahead or behind we are
  const delta = coverageRatio - expectedCoverage;

  if (delta >= 0.1) {
    // Ahead of schedule — we've covered more overhead than expected
    return { level: "low", factor: -0.10 }; // 10% discount
  } else if (delta >= -0.1) {
    // On track
    return { level: "moderate", factor: 0 }; // no adjustment
  } else {
    // Behind schedule — need to catch up
    return { level: "high", factor: 0.15 }; // 15% premium
  }
}

/**
 * Main pricing calculation.
 * Returns the recommended token price and full breakdown.
 */
export function calculateTokenPrice(
  expertRate: number,
  config: QuarterConfig,
  progress: QuarterProgress
): PricingResult {
  const tph = tokensPerHour(expertRate);

  // 1. Base cost per token = expert rate spread across tokens charged
  const baseCostPerToken = expertRate / tph;

  // 2. Overhead allocation per token
  //    Distribute remaining uncovered overhead across expected remaining tokens
  const remainingOverhead = Math.max(
    0,
    config.quarterlyOverhead - progress.revenueToDate
  );
  const timeRemaining = 1 - quarterProgressRatio(progress);
  // Estimate remaining tokens based on run rate
  const runRate =
    progress.daysElapsed > 0
      ? progress.tokensSoldToDate / progress.daysElapsed
      : 5; // default ~5 tokens/day
  const estimatedRemainingTokens = Math.max(
    runRate * (progress.totalDays - progress.daysElapsed),
    1
  );
  const overheadPerToken = remainingOverhead / estimatedRemainingTokens;

  // 3. Target margin component
  const marginComponent = baseCostPerToken * config.targetMarginPct;

  // 4. Pressure adjustment
  const pressure = pricingPressure(config, progress);
  const rawPrice = baseCostPerToken + overheadPerToken + marginComponent;
  const pressureAdjustment = rawPrice * pressure.factor;

  // 5. Final price (enforce floor)
  const calculatedPrice = Math.round(rawPrice + pressureAdjustment);
  const tokenPrice = Math.max(calculatedPrice, config.minTokenPrice);

  // Effective rate to client
  const effectiveHourlyRate = tokenPrice * tph;

  // Margin calculation
  const marginPct =
    Math.round(((tokenPrice - baseCostPerToken) / tokenPrice) * 1000) / 10;

  const coveragePct =
    Math.round(overheadCoverage(config, progress) * 1000) / 10;

  return {
    tokenPrice,
    tokensPerHour: tph,
    effectiveHourlyRate,
    expertRate,
    marginPct,
    pressureLevel: pressure.level,
    overheadCoveredPct: coveragePct,
    breakdown: {
      baseCost: Math.round(baseCostPerToken),
      overheadAllocation: Math.round(overheadPerToken),
      marginComponent: Math.round(marginComponent),
      pressureAdjustment: Math.round(pressureAdjustment),
    },
  };
}

// ─── Default Quarter Config (mock) ────────────────────────────────

export function getCurrentQuarterConfig(): QuarterConfig {
  return {
    quarterlyOverhead: 180_000, // €180k quarterly overhead
    targetMarginPct: 0.20,
    minTokenPrice: 350,
    quarterLabel: "Q1 2026",
    quarterStart: new Date("2026-01-01"),
    quarterEnd: new Date("2026-03-31"),
  };
}

export function getCurrentQuarterProgress(): QuarterProgress {
  const config = getCurrentQuarterConfig();
  const now = new Date();
  const totalDays = Math.ceil(
    (config.quarterEnd.getTime() - config.quarterStart.getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const daysElapsed = Math.max(
    0,
    Math.ceil(
      (now.getTime() - config.quarterStart.getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  return {
    // Mock: ~€155k earned so far (~86% of overhead covered by day ~69 of 90)
    revenueToDate: 155_000,
    tokensSoldToDate: 292,
    daysElapsed: Math.min(daysElapsed, totalDays),
    totalDays,
  };
}
