import type { OpenNextConfig } from "@opennextjs/cloudflare";

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      incrementalCache: async () => (await import("@opennextjs/cloudflare")).r2IncrementalCache,
      tagCache: "dummy",
      queue: "dummy",
    },
  },
};

export default config;
