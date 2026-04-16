# Duck Island Icecream

Workspace repo (app / source). **Knowledge-only** Markdown lives in the **nested** folder **`duck-island-icecream-knowledge-base/`** (separate git history).

**Git:** That folder is listed in this repo’s `.gitignore` so commits **from this root** do not try to embed the nested `.git` (which caused “embedded repository” / IDE failures). **Commit knowledge changes** with the nested folder as the working tree (open `duck-island-icecream-knowledge-base/` as the folder root in your editor, or `cd` there and use `git` / Cursor’s Source Control scoped to that folder).

Runtime files generated here are intentionally minimal for Cursor + MCP.

**warpdesk-client-kit:** **`vendor/warpdesk-client-kit`** is a **git submodule** (published repo). Pull updates with `git pull` inside that folder, or `git submodule update --remote vendor/warpdesk-client-kit` from this root, then `npm install` there if needed. See the framework **`docs/repository_layout.md`** and **`npm run refresh:vendor-kit`** when the published kit lags the monorepo.

## Sample storefront (ticketing demo)

A small **Next.js** app lives in **`sample-storefront/`**. Run it when you want a faux “client product” in the browser while tickets are filed against this workspace in WarpDesk:

```bash
cd sample-storefront
npm install
npm run dev
```

Then open `http://localhost:3000`. See **`sample-storefront/README.md`** for build/start.

## Next steps

1. Verify `warpdesk.config` (`--push` auto-fills `GITHUB_OWNER` + `KNOWLEDGE_REPO_HTTPS` from created remotes).
2. Open this folder in Cursor and restart Cursor if MCP does not appear immediately.
3. **Cursor Settings → Features → Model Context Protocol:** enable the **warpdesk-tickets** server (quickstart cannot toggle this for you).
4. **Tickets from the terminal:** `npm run warpdesk:tickets` (full rules in `vendor/warpdesk-client-kit/AGENTS.md`; root `AGENTS.md` is the pointer).
5. Set **`WARPDESK_PERSONAL_ACCESS_TOKEN`** (`wds_pat_…` from the app **Settings → Personal access tokens**) in **`.cursor/mcp.json`** next to the same deployment as **`WARPDESK_BASE_URL`**, then restart Cursor or reload MCP.
6. Refresh MCP later by re-running: `npm run quickstart:customer -- --client-root "C:/VSCode/warpdesk/quickstarts/duck-island-icecream"` from the WarpDesk framework repo.
