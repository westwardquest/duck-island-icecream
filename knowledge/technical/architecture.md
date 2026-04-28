## What this repository is

This repo is a **WarpDesk workspace** quickstart: a thin shell around **`vendor/warpdesk-client-kit`** (git submodule) plus a **sample Next.js storefront** used as a fake "product under support." It does **not** ship a production Duck Island deployment; it exists so tickets, MCP, and knowledge workflows can be exercised in Cursor.
tst
## Layout

| Path | Role |
| ---- | ---- |
| **`sample-storefront/`** | Next.js App Router app (demo UI; static flavour copy, no ticketing API calls) |
| **`vendor/warpdesk-client-kit/`** | Published client kit: MCP server, ticket CLI, templates, **`AGENTS.md`** rules |
| **`warpdesk.config`** (gitignored) | `WORKSPACE_NAME`, `WORKSPACE_SLUG`, `DEV_APP_ORIGIN`, GitHub/knowledge URLs - filled by quickstart |
| **`.cursor/mcp.json`** (gitignored) | Cursor MCP: `warpdesk-tickets` with `WARPDESK_BASE_URL` and `WARPDESK_PERSONAL_ACCESS_TOKEN` |
| **`...-knowledge-base/`** (nested, gitignored from this root) | Separate git repo for Markdown indexed by WarpDesk; business vs **`knowledge/technical/`** paths |

The workspace **slug** must match the main folder name (here: `duck-island-icecream`). The knowledge-only repo name is conventionally **`<slug>-knowledge-base`**.

## Data flow

- **Tickets:** HTTP API on the WarpDesk deployment (`WARPDESK_BASE_URL`); MCP and `npm run warpdesk:*` scripts use a personal access token (`wds_pat_...`), not Supabase keys.
- **Sample storefront:** No env vars required; no backend. Flavour text is static TypeScript data aligned with public duckislandicecream.co.nz pages for realism.
- **Knowledge indexing:** Push webhooks on the **knowledge** repo trigger indexing; the workspace app repo does not replace that pipeline.

## Submodule updates

From this repo root:

```bash
git submodule update --remote vendor/warpdesk-client-kit
```

Then `npm install` inside **`vendor/warpdesk-client-kit`** if package changes matter for MCP. See the framework **`docs/repository_layout.md`** when the published kit lags the monorepo.
