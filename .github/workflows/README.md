# GitHub Actions workflows

## Workflow lockfile (required)

This repo uses [workflow dependency lockfiles](https://docs.github.com/en/actions/concepts/security/workflow-dependency-lockfiles).

- **File:** `actions.lock` (machine-generated — do not hand-edit)
- **Policy:** Settings → Actions → [Policies](https://github.com/fringe4life/3dmodels/settings/actions/policies) — create/enable **Require lockfile** for all workflows after `actions.lock` is on `main` (#226). **Confirm enforcement on that page** before assuming unlocked workflows are blocked (repo Settings are not verified by this file).
- **Effect when Active:** a workflow that is not listed in `actions.lock` fails at startup (`startup_failure`), even if its `uses:` lines look fine

Readable tags in YAML (`uses: owner/action@v1.2.3`) are expected. The lockfile pins the commit (including transitive nested actions).

### When you add or change a workflow

```bash
gh extension install github/gh-actions-lock   # once
gh actions-lock                               # regenerate actions.lock
gh actions-lock --verify                      # must pass before merge
```

Commit the workflow **and** the updated `actions.lock` in the same PR. Dependabot action bumps should update both together.

### Relock a floating ref on purpose

```bash
gh actions-lock --relock
```

Review the lockfile diff: a changed commit SHA means different code will run.

### Not covered by the lockfile

- Reusable workflow calls (`jobs.<job_id>.uses`) — pin those by full commit SHA
- Local `./` path actions
- Container image digests

## Other hardening (not Policies)

Settings rows are **not** proven by this file — confirm in the linked UI.

| Control | Where | Status |
| --- | --- | --- |
| Default `GITHUB_TOKEN` read-only | Actions → General → Workflow permissions | Confirm in Settings (prefer Read) — #226 |
| Selected / allowlisted actions | Actions → General → Actions permissions | Optional follow-up — #226 |
| Egress firewall | `.github/egress-firewall.yaml` + `runs-on: ubuntu-24.04-firewall` | Deferred — #226 |
| Shrink third-party write scopes | #225 | react-doctor: sticky comment only (`issues: write`); fallow: annotations only (`contents: read`); dependency-review still needs `pull-requests: write` for PR summary |
| Lockfile / deps gates | Bun deps workflow | `bun dedupe --check` + `bun audit --prod --audit-level=moderate` |

## Socket reference

[Hardening GitHub Actions Against Outside Threats](https://socket.dev/blog/hardening-github-actions-against-outside-threats) — tracking: #225 (first pass), #226 (egress + Settings).
