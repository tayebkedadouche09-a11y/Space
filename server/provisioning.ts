import { ENV } from "./_core/env";
import { createCustomerRepository, isGitHubConfigured } from "./github";
import { createVercelProject, isVercelConfigured } from "./vercel";
import { checkHttpHealth } from "./os/health";

type ProvisionRequest = {
  purchaseId: number;
  orderId: number;
  productId: number;
  productName: string;
  productSlug: string;
  sourceRepoUrl?: string | null;
  sourceRepoBranch?: string | null;
  mode?: "manual" | "external" | "native";
};

export type ProvisionResponse = {
  instanceUrl?: string;
  adminUrl?: string;
  sourceReady?: boolean;
  documentationReady?: boolean;
  licenseReady?: boolean;
  sourceRepoUrl?: string;
  deploymentId?: string;
  healthOk?: boolean;
  healthStatus?: number;
  healthLatencyMs?: number;
  mode: "native" | "external" | "manual";
  notes?: string;
};

export async function requestProvisioning(input: ProvisionRequest): Promise<ProvisionResponse | null> {
  const mode = input.mode ?? "manual";

  if (mode === "native") {
    if (!input.sourceRepoUrl) throw new Error("Native provisioning requires product.sourceRepoUrl.");
    if (!isGitHubConfigured()) throw new Error("GitHub is NOT_CONFIGURED. Set GITHUB_TOKEN and GITHUB_OWNER.");
    if (!isVercelConfigured()) throw new Error("Vercel is NOT_CONFIGURED. Set VERCEL_TOKEN.");

    const repo = await createCustomerRepository(
      input.sourceRepoUrl,
      input.sourceRepoBranch || "main",
      input.purchaseId,
      input.productSlug,
    );
    const deployment = await createVercelProject(repo, `${input.productSlug}-${input.purchaseId}`);
    if (!deployment.url) throw new Error("Vercel created the project but did not return a reachable deployment URL yet.");

    const health = await checkHttpHealth(deployment.url);
    if (!health.ok) {
      return {
        mode: "native",
        instanceUrl: deployment.url,
        sourceReady: true,
        documentationReady: false,
        licenseReady: true,
        sourceRepoUrl: `https://github.com/${repo.owner}/${repo.repo}`,
        deploymentId: deployment.id,
        healthOk: false,
        healthStatus: health.status,
        healthLatencyMs: health.latencyMs,
        notes: `Deployment URL returned but health check failed: ${health.error ?? `HTTP ${health.status}`}`,
      };
    }

    return {
      mode: "native",
      instanceUrl: deployment.url,
      adminUrl: undefined,
      sourceReady: true,
      documentationReady: false,
      licenseReady: true,
      sourceRepoUrl: `https://github.com/${repo.owner}/${repo.repo}`,
      deploymentId: deployment.id,
      healthOk: true,
      healthStatus: health.status,
      healthLatencyMs: health.latencyMs,
      notes: "Native GitHub repo + Vercel deployment created and health check passed.",
    };
  }

  if (mode === "external") {
    if (!ENV.provisioningApiUrl || !ENV.provisioningApiKey) {
      throw new Error("External provisioning is NOT_CONFIGURED. Set PROVISIONING_API_URL and PROVISIONING_API_KEY.");
    }
    const response = await fetch(`${ENV.provisioningApiUrl.replace(/\/$/, "")}/provision`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ENV.provisioningApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const payload = (await response.json()) as ProvisionResponse & { error?: string };
    if (!response.ok) throw new Error(payload.error ?? "Provisioning provider rejected the request");
    return { ...payload, mode: "external" };
  }

  return null;
}
