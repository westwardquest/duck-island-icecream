# EDF client workspace — agent instructions

Use this workspace through **MCP tools first**. Do not treat local JSON files as a source of truth for memberships.

## Preconditions

- **`edf.config`** exists at the workspace repo root. **`WORKSPACE_SLUG`** equals the **main workspace repo folder name** (not the knowledge repo).
- **`.cursor/mcp.json`** exists and points MCP at `vendor/edf-client-kit`.
- The **knowledge** repository is the folder named **`<WORKSPACE_SLUG>-knowledge-base`** (often **nested** under the workspace repo). The `workspace` row’s **`git_repo_url`** must point to that repo’s **HTTPS** URL (not the app source repo).

## Steps

1. Read **`edf.config`** for `WORKSPACE_NAME`, `WORKSPACE_SLUG`, and `KNOWLEDGE_REPO_HTTPS` (or build `https://github.com/<GITHUB_OWNER>/<WORKSPACE_SLUG>-knowledge-base`).
2. Use MCP tool **`bootstrap_workspace`** when appropriate: pass `name`, `slug`, and `git_repo_url` set to the **knowledge** repo HTTPS URL only.
3. For ticket work after bootstrap, use **`list_tickets`**, **`get_ticket`**, etc., with `slug` = `WORKSPACE_SLUG`.
4. If the user asks to add/remove members and MCP has no membership tool, state that clearly and direct them to the framework app/API membership flow; do not fake this via local files.

## Do not

- Point **`git_repo_url`** at the application repo when it is separate from the knowledge repo (GitHub `push` webhooks would reindex on every code push).
- Create or edit local membership JSON as if it updates Supabase.
