import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Pin Turbopack root when a parent repo also has a package-lock (avoids wrong workspace inference). */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
