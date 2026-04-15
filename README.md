# Duck Island Icecream

Workspace repo (app / source). **Knowledge-only** Markdown lives in the **nested** folder **`duck-island-icecream-knowledge-base/`** (separate git history).

**Git:** That folder is listed in this repo’s `.gitignore` so commits **from this root** do not try to embed the nested `.git` (which caused “embedded repository” / IDE failures). **Commit knowledge changes** with the nested folder as the working tree (open `duck-island-icecream-knowledge-base/` as the folder root in your editor, or `cd` there and use `git` / Cursor’s Source Control scoped to that folder).

Runtime files generated here are intentionally minimal for Cursor + MCP.

**edf-client-kit:** **`vendor/edf-client-kit`** is a **git submodule** (published repo). Pull updates with `git pull` inside that folder, or `git submodule update --remote vendor/edf-client-kit` from this root, then `npm install` there if needed. See the framework **`docs/repository_layout.md`** and **`npm run refresh:vendor-kit`** when the published kit lags the monorepo.

## Sample storefront (ticketing demo)

A small **Next.js** app lives in **`sample-storefront/`**. Run it when you want a faux “client product” in the browser while tickets are filed against this workspace in EDF:

```bash
cd sample-storefront
npm install
npm run dev
```

Then open `http://localhost:3000`. See **`sample-storefront/README.md`** for build/start.

## Next steps

1. Verify `edf.config` (`--push` auto-fills `GITHUB_OWNER` + `KNOWLEDGE_REPO_HTTPS` from created remotes).
2. Open this folder in Cursor and restart Cursor if MCP does not appear immediately.
3. **Cursor Settings → Features → Model Context Protocol:** enable the **edf-tickets** server (quickstart cannot toggle this for you).
4. **Tickets from the terminal:** `npm run edf:tickets` (see `AGENTS.md`).
5. Refresh MCP token later by re-running: `npm run quickstart:customer -- --client-root "C:/VSCode/ExtremeDevelopmentFramework/quickstarts/duck-island-icecream"`.
