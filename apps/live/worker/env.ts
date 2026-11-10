import type { LiveSession, Catalog } from "./objects";
export interface Env {
  SESSIONS: DurableObjectNamespace<LiveSession>;
  CATALOG: DurableObjectNamespace<Catalog>;
  PDFS: R2Bucket;
  ASSETS: Fetcher;
  APP_ORIGIN: string;
  ACCESS_TEAM_DOMAIN: string;
  ACCESS_AUD: string;
  PRESENTER_EMAIL: string;
  DEV_AUTH?: string;
}
