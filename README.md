# Duck Island Icecream

Workspace repo (app / source). **Knowledge-only** Markdown lives in the **nested** folder **`duck-island-icecream-knowledge-base/`** (separate git history).

**Git:** That folder is listed in this repo’s `.gitignore` so commits **from this root** do not try to embed the nested `.git` (which caused “embedded repository” / IDE failures). **Commit knowledge changes** with the nested folder as the working tree (open `duck-island-icecream-knowledge-base/` as the folder root in your editor, or `cd` there and use `git` / Cursor’s Source Control scoped to that folder).

Runtime files generated here are intentionally minimal for Cursor + MCP.

## Next steps

1. Verify `edf.config` (`--push` auto-fills `GITHUB_OWNER` + `KNOWLEDGE_REPO_HTTPS` from created remotes).
2. Open this folder in Cursor and restart Cursor if MCP does not appear immediately.
3. Refresh MCP token later by re-running: `npm run quickstart:customer -- --client-root "C:/VSCode/ExtremeDevelopmentFramework/quickstarts/duck-island-icecream"`.
