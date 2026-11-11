# GitHub Actions workflows

## Workflow lockfile (required)

This repo uses [workflow dependency lockfiles](https://docs.github.com/en/actions/concepts/security/workflow-dependency-lockfiles).

- **File:** `actions.lock` (machine-generated — do not hand-edit)
- **Policy:** Settings → Actions → [Policies](https://github.com/fringe4life/3dmodels/settings/actions/policies) — create/enable **Require lockfile** for all workflows. **Confirm enforcement on that page** before assuming unlocked workflows are blocked (repo Settings are not verified by this file).
- **Effect when Active:** a workflow that is not listed in `actions.lock` fails at startup (`startup_failure`), even if its `uses:` lines look fine

Readable tags in YAML (`uses: owner/action@vX.Y.Z`) are expected. The lockfile pins the commit (including transitive nested actions).

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
| Default `GITHUB_TOKEN` read-only | Actions → General → Workflow permissions | Confirm in Settings (prefer Read) — human checklist below |
| Selected / allowlisted actions | Actions → General → Actions permissions | Optional follow-up — human checklist below |
| Egress firewall | `.github/egress-firewall.yaml` + `runs-on: ubuntu-24.04-firewall` | Phase 1: `mode: log` (#226); then `enforce` + allowlist |
| Shrink third-party write scopes | #225 / #226 | See write blast radius below |
| Lockfile / deps gates | Bun deps workflow | `bun dedupe --check` + `bun audit --prod --audit-level=moderate` |

## Egress firewall

- Policy file: [`.github/egress-firewall.yaml`](../egress-firewall.yaml) (must live there — not under `workflows/`)
- Runner: `ubuntu-24.04-firewall` (technical preview; ~15–20% slower; log mode can still break some TLS clients)
- **Phase 1:** `mode: log` only — traffic is recorded, not denied. Candidate Phase 2 hosts are commented in the YAML (Bun/npm, GitHub APIs, React Doctor telemetry)
- **Phase 2:** set `mode: enforce` and copy confirmed hosts into `allow` from `firewall-decisions-*` artifacts (job summary + run artifact)
- **Who can widen policy:** any PR can edit the YAML; [CODEOWNERS](../CODEOWNERS) requires `@fringe4life` review. No org-level egress ceiling in the preview
- Preview logs: job summary + run artifact — when a needed host is blocked under enforce, add it under `allow` with a comment naming the job/tool
- Ref: [Actions native egress firewall](https://github.com/github-early-access/actions-native-egress-firewall)

## Write blast radius (post-#228)

Job-level `write` scopes that remain after hardening:

| Workflow | Write scope | Why kept |
| --- | --- | --- |
| CodeQL | `security-events: write` | Upload SARIF to the security tab |
| Zizmor | `security-events: write` | `advanced-security: true` SARIF upload |
| Dependency review | `pull-requests: write` | `comment-summary-in-pr: always` |
| React Doctor | `issues: write` | Sticky PR summary comment only (`review-comments` / `commit-status` off) |

Trimmed in #226 follow-up: CodeQL no longer requests `packages: read` / `actions: read` (public repo; no private CodeQL packs).

To drop `pull-requests: write` on dependency-review, set `comment-summary-in-pr` off (or remove it) and remove that permission — product choice, not done here.

## Human Settings checklist

Agents cannot click these. Confirm in the UI (repo and, if you want org defaults, org admin):

### Repo — Actions General

1. Open [Settings → Actions → General](https://github.com/fringe4life/3dmodels/settings/actions)
2. **Workflow permissions:** choose **Read repository contents and packages permissions** (read-only `GITHUB_TOKEN` default). Uncheck “Allow GitHub Actions to create and approve pull requests” unless you have a concrete need
3. **Actions permissions:** prefer **Allow fringe4life, and select non-fringe4life, actions and reusable workflows** (or org equivalent “Allow enterprise/org, and select non-…”). Add required third-party actions (`oven-sh/setup-bun`, `fallow-rs/fallow`, `millionco/react-doctor`, `zizmorcore/zizmor-action`, `actions/*`, `github/codeql-action`, etc.) to the allowlist. Do **not** use “Allow all actions” long-term
4. Save changes

### Repo — Actions Policies (lockfile)

1. Open [Settings → Actions → Policies](https://github.com/fringe4life/3dmodels/settings/actions/policies)
2. Create/enable **Require lockfile** for all workflows (after `actions.lock` is on `main`)
3. Confirm the policy shows **Active** before assuming unlocked workflows are blocked

### Org (optional; needs org admin)

1. Open `https://github.com/organizations/fringe4life/settings/actions`
2. Align org defaults with Socket Ch.2: read-only default `GITHUB_TOKEN`, restricted actions posture, and any org-level Policies that should cascade to this repo
3. There is **no** org-level egress ceiling in the native firewall technical preview — repo YAML + CODEOWNERS remain the control

## Socket reference

[Hardening GitHub Actions Against Outside Threats](https://socket.dev/blog/hardening-github-actions-against-outside-threats) — tracking: #225 (first pass), #226 (egress + Settings).
