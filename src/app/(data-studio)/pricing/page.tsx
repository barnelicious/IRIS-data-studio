import { computeKPIs, getMonthlyTrends } from "@/lib/db";
import {
  getCurrentQuarterConfig,
  getCurrentQuarterProgress,
} from "@/lib/pricing-engine";
import PricingTool from "./PricingTool";
import QuarterOverview from "./QuarterOverview";

export default async function PricingPage() {
  const [kpis, trends] = await Promise.all([
    computeKPIs(),
    getMonthlyTrends(),
  ]);

  const quarterConfig = getCurrentQuarterConfig();
  const quarterProgress = getCurrentQuarterProgress();

  return (
    <div className="space-y-6">
      <QuarterOverview
        config={quarterConfig}
        progress={quarterProgress}
        avgTokenPrice={kpis.avgTokenPrice}
      />
      <PricingTool
        config={quarterConfig}
        progress={quarterProgress}
      />
    </div>
  );
}
