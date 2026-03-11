"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import {
  Calculator,
  User,
  Coins,
  ArrowRight,
  Info,
} from "lucide-react";
import {
  calculateTokenPrice,
  tokensPerHour,
  RATE_BAND,
  type QuarterConfig,
  type QuarterProgress,
  type PricingResult,
} from "@/lib/pricing-engine";

interface Props {
  config: QuarterConfig;
  progress: QuarterProgress;
}

export default function PricingTool({ config, progress }: Props) {
  const [expertRate, setExpertRate] = useState<string>("350");
  const [hours, setHours] = useState<string>("8");
  const [result, setResult] = useState<PricingResult | null>(null);

  const handleCalculate = () => {
    const rate = parseFloat(expertRate);
    if (isNaN(rate) || rate <= 0) return;
    setResult(calculateTokenPrice(rate, config, progress));
  };

  const rate = parseFloat(expertRate) || 0;
  const tph = rate > 0 ? tokensPerHour(rate) : 1;
  const bandMin = (tph - 1) * RATE_BAND + 1;
  const bandMax = tph * RATE_BAND;
  const parsedHours = parseInt(hours) || 1;

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Input panel */}
      <Card title="Price a Consultation" subtitle="Enter expert details to get a dynamic token price">
        <div className="space-y-5">
          {/* Expert rate input */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Expert Hourly Rate
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">€</span>
              <input
                type="number"
                value={expertRate}
                onChange={(e) => {
                  setExpertRate(e.target.value);
                  setResult(null);
                }}
                placeholder="350"
                min={0}
                step={10}
                className="w-full pl-7 pr-4 py-2.5 bg-[#1e2130] border border-[#2a2d3e] rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
              />
            </div>
            {rate > 0 && (
              <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
                <Info size={12} />
                <span>
                  Band: €{bandMin === 1 ? 0 : bandMin}–€{bandMax}/hr →{" "}
                  <span className="text-blue-400 font-medium">{tph} token{tph > 1 ? "s" : ""}/hr</span>
                </span>
              </div>
            )}
          </div>

          {/* Hours input */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Estimated Hours
            </label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="8"
              min={1}
              className="w-full px-4 py-2.5 bg-[#1e2130] border border-[#2a2d3e] rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
            />
          </div>

          {/* Token multiplier visual */}
          <div className="bg-[#1e2130] rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-3 uppercase tracking-wider">Token Multiplier Scale</div>
            <div className="space-y-1.5">
              {[1, 2, 3].map((tier) => {
                const min = (tier - 1) * RATE_BAND;
                const max = tier * RATE_BAND;
                const isActive = tph === tier;
                return (
                  <div
                    key={tier}
                    className={`flex items-center justify-between px-3 py-1.5 rounded text-xs transition-colors ${
                      isActive
                        ? "bg-blue-500/15 text-blue-400 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    <span>€{min === 0 ? 0 : min + 1}–€{max}/hr</span>
                    <span className="flex items-center gap-1">
                      {Array.from({ length: tier }).map((_, i) => (
                        <Coins key={i} size={12} className={isActive ? "text-blue-400" : "text-gray-600"} />
                      ))}
                      <span className="ml-1">{tier} token{tier > 1 ? "s" : ""}</span>
                    </span>
                  </div>
                );
              })}
              <div className="flex items-center justify-between px-3 py-1.5 rounded text-xs text-gray-600">
                <span>€1,200+/hr</span>
                <span>…and so on</span>
              </div>
            </div>
          </div>

          {/* Calculate button */}
          <button
            onClick={handleCalculate}
            disabled={rate <= 0}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg text-sm font-medium text-white transition-colors"
          >
            <Calculator size={16} />
            Calculate Token Price
          </button>
        </div>
      </Card>

      {/* Results panel */}
      <Card title="Pricing Recommendation" subtitle="Dynamic price based on current quarter position">
        {result ? (
          <div className="space-y-5">
            {/* Main price */}
            <div className="text-center py-4">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                Recommended Token Price
              </div>
              <div className="text-4xl font-bold text-white">
                €{result.tokenPrice}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                per token
              </div>
            </div>

            {/* Summary row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#1e2130] rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">Tokens/Hour</div>
                <div className="text-lg font-semibold text-white">{result.tokensPerHour}</div>
              </div>
              <div className="bg-[#1e2130] rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">Client Hourly</div>
                <div className="text-lg font-semibold text-white">€{result.effectiveHourlyRate}</div>
              </div>
              <div className="bg-[#1e2130] rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">Margin</div>
                <div
                  className="text-lg font-semibold"
                  style={{
                    color:
                      result.marginPct >= 50
                        ? "#4ade80"
                        : result.marginPct >= 35
                          ? "#f59e0b"
                          : "#f87171",
                  }}
                >
                  {result.marginPct}%
                </div>
              </div>
            </div>

            {/* Engagement summary */}
            <div className="bg-[#1e2130] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <User size={14} className="text-gray-400" />
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                  Engagement Summary — {parsedHours}h consultation
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="text-gray-500">Expert rate</div>
                <div className="text-right text-white">€{result.expertRate}/hr</div>
                <div className="text-gray-500">Tokens charged</div>
                <div className="text-right text-white">
                  {result.tokensPerHour * parsedHours} tokens
                  <span className="text-gray-500 text-xs ml-1">
                    ({result.tokensPerHour}/hr × {parsedHours}h)
                  </span>
                </div>
                <div className="text-gray-500">Client pays</div>
                <div className="text-right text-white font-medium">
                  €{(result.tokenPrice * result.tokensPerHour * parsedHours).toLocaleString()}
                </div>
                <div className="text-gray-500">Expert cost</div>
                <div className="text-right text-gray-400">
                  €{(result.expertRate * parsedHours).toLocaleString()}
                </div>
                <div className="border-t border-[#2a2d3e] pt-2 text-gray-400 font-medium">Gross profit</div>
                <div className="border-t border-[#2a2d3e] pt-2 text-right text-green-400 font-medium">
                  €{(result.tokenPrice * result.tokensPerHour * parsedHours - result.expertRate * parsedHours).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="bg-[#1e2130] rounded-lg p-4">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                Price Breakdown (per token)
              </div>
              <div className="space-y-2">
                <BreakdownRow
                  label="Base cost"
                  value={result.breakdown.baseCost}
                  description="Expert rate ÷ tokens per hour"
                  color="#60a5fa"
                />
                <BreakdownRow
                  label="Overhead allocation"
                  value={result.breakdown.overheadAllocation}
                  description="Share of uncovered quarterly overhead"
                  color="#f59e0b"
                />
                <BreakdownRow
                  label="Target margin"
                  value={result.breakdown.marginComponent}
                  description={`${Math.round(config.targetMarginPct * 100)}% target on base cost`}
                  color="#4ade80"
                />
                <BreakdownRow
                  label="Pressure adjustment"
                  value={result.breakdown.pressureAdjustment}
                  description={`${result.pressureLevel} pressure`}
                  color={
                    result.pressureLevel === "low"
                      ? "#4ade80"
                      : result.pressureLevel === "moderate"
                        ? "#f59e0b"
                        : "#f87171"
                  }
                />
                <div className="flex items-center justify-between pt-2 border-t border-[#2a2d3e]">
                  <span className="text-sm text-white font-medium">Total</span>
                  <span className="text-sm text-white font-bold">€{result.tokenPrice}</span>
                </div>
              </div>
            </div>

            {/* Pressure indicator */}
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-xs"
              style={{
                background:
                  result.pressureLevel === "low"
                    ? "rgba(74, 222, 128, 0.08)"
                    : result.pressureLevel === "moderate"
                      ? "rgba(245, 158, 11, 0.08)"
                      : "rgba(248, 113, 113, 0.08)",
                color:
                  result.pressureLevel === "low"
                    ? "#4ade80"
                    : result.pressureLevel === "moderate"
                      ? "#f59e0b"
                      : "#f87171",
              }}
            >
              <ArrowRight size={14} />
              {result.pressureLevel === "low" && (
                <span>Overhead is well-covered. Pricing can be competitive to win the deal.</span>
              )}
              {result.pressureLevel === "moderate" && (
                <span>On track to cover overhead. Standard pricing recommended.</span>
              )}
              {result.pressureLevel === "high" && (
                <span>Behind on overhead recovery. Higher pricing recommended to catch up.</span>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <Calculator size={40} className="mb-3 text-gray-600" />
            <p className="text-sm">Enter an expert rate and click calculate</p>
            <p className="text-xs text-gray-600 mt-1">
              Price adjusts dynamically based on quarter position
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}

function BreakdownRow({
  label,
  value,
  description,
  color,
}: {
  label: string;
  value: number;
  description: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
        <div>
          <div className="text-sm text-gray-300">{label}</div>
          <div className="text-xs text-gray-600">{description}</div>
        </div>
      </div>
      <span className="text-sm text-white font-medium">
        {value >= 0 ? "€" : "-€"}{Math.abs(value)}
      </span>
    </div>
  );
}
