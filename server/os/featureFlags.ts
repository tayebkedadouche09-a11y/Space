export type FeatureFlag = {
  key: string;
  enabled: boolean;
  description?: string;
};

const defaults: FeatureFlag[] = [
  { key: "native_provisioning", enabled: true, description: "GitHub + Vercel native customer instances" },
  { key: "chargily_checkout", enabled: true, description: "Chargily Pay for DZD" },
  { key: "ai_faq", enabled: true, description: "Admin AI FAQ generation" },
];

export function listFeatureFlags(): FeatureFlag[] {
  return defaults.map((f) => ({ ...f }));
}

export function isFeatureEnabled(key: string): boolean {
  return defaults.find((f) => f.key === key)?.enabled ?? false;
}
