# My Hayat — Final Agent Delegation Matrix

Purpose: keep the Claude Code lead focused on architecture, conflict resolution, difficult UI/motion work, final judgment, testing and safe integration while pushing high-volume research/audit/implementation work to the owner's other local agents.

## Lead: Claude Code

Claude owns:
- repository safety and local-history preservation
- decomposition and delegation
- deciding which findings are trustworthy
- final content architecture and claims gate
- shared design-system decisions
- difficult/novel animation implementation, especially the shooting star and any motion requiring visual judgment
- resolving edit conflicts between workers
- final accessibility/responsive review
- final end-to-end Lebanese chat evaluation interpretation
- final test/build gate, commits, safe push, and post-push verification

Claude should NOT spend large context on tasks that AGY or FX can perform independently.

## Worker family A: Antigravity / AGY

Best use:
- browser-based before/after visual audits
- screenshot capture and responsive inspection
- external research / fact verification
- product-claims audit
- accessibility/design critique
- repo-wide content inventory
- Impeccable critique if installed locally
- Unslop copy QA if installed locally
- adversarial review after implementation

Default AGY tasks should be read-only or report-producing unless Claude explicitly gives a non-overlapping file set.

Suggested artifacts:
- `/tmp/myhayat-final/content-audit.md`
- `/tmp/myhayat-final/visual-before.md`
- `/tmp/myhayat-final/claims-audit.md`
- `/tmp/myhayat-final/final-visual-review.md`

## Worker family B: FX (owner-installed coding-agent CLI, GLM-5.2-backed)

Treat `fx` as a locally installed coding-agent command whose exact CLI contract must be discovered at runtime. DO NOT assume syntax from an unrelated `fx` binary.

Before first use:
- run `command -v fx`
- run `fx --help` (or the installed agent's documented help command)
- identify how to run a non-interactive task, set working directory, and capture output
- verify that this `fx` is the intended coding agent, not the common JSON-viewer utility

Vercel documents GLM-5.2 as a long-horizon coding/agentic model with a 1M context window and tool use, so use FX for high-volume implementation where exact final aesthetic judgment is not the bottleneck.

Best use:
- repo/file inventory
- mechanical multi-file copy replacement after Claude establishes the copy map
- CSS cleanup/refactoring with explicit acceptance criteria
- shared-card/button/nav implementation drafts
- responsive cleanup across pages after Claude sets the design system
- asset-usage inventory and dead/repeated decoration report
- writing deterministic tests from Claude's specification
- running tests/builds and summarizing failures
- implementing non-overlapping page batches
- code review of Claude/AGY changes
- lint/type/build failure triage

Avoid giving FX sole authority over:
- final clinical/privacy claims
- final Lebanese-native quality judgments
- destructive Git operations
- production deployment
- the final visual taste decision
- novel shooting-star physics unless Claude reviews and owns the result

Suggested FX artifacts/worktrees:
- `/tmp/myhayat-final/fx-copy-implementation.md`
- `/tmp/myhayat-final/fx-design-system-review.md`
- `/tmp/myhayat-final/fx-test-results.md`

Prefer FX to edit a clearly assigned, non-overlapping file set or a temporary worktree/branch if Claude's orchestration supports it. Claude integrates/cherry-picks/reconciles; workers should not race on the same files.

## One CLI access for both AGY and FX

The owner has an already-configured `one` CLI that can provide connected external services. The owner specifically reports Cloudflare, Exa/search and GitHub access, and may have other configured apps.

Any AGY or FX worker that needs external state may use One CLI, but must FIRST discover the actual local syntax:
- `command -v one`
- `one --help`
- inspect existing local configuration/documentation

Do NOT guess commands.
Do NOT print secrets.
Do NOT modify Cloudflare/Vercel/GitHub production resources merely because access exists.
Default connector use in this final My Hayat pass is READ-ONLY verification/research.

Useful external work examples:
- GitHub: verify remote branch/head/status after Claude's push
- Exa/search: verify a factual/statistical claim before publication
- Cloudflare: inspect current model/resource state only if needed for the chat evaluation
- Vercel, if exposed: inspect deployment/build state after push

## Load-balancing policy

Claude should keep at most 2 heavy workers active concurrently unless the local environment is clearly handling more without collision.

Recommended sequence:

### Wave 1 — parallel read-only discovery
- AGY A: full visual/browser screenshot audit
- FX A: repo-wide content/component/asset inventory + implementation-risk map

### Wave 2 — parallel preparation
- AGY B: claims/copy fact-check + anti-slop review
- FX B: design-system/card/nav refactor draft OR deterministic Lebanese-test prep

### Wave 3 — implementation
Claude integrates the shared design system and delegates non-overlapping page batches:
- FX: mechanical page/content implementation and repetitive responsive cleanup
- AGY: screenshot comparison and critique, not simultaneous edits on the same files
- Claude: difficult hero/motion work, About architecture, truth-sensitive copy, conflict resolution

### Wave 4 — QA
- FX: tests/build/typecheck + code review
- AGY: final browser visual/accessibility/adversarial review
- Claude: fixes only real failures and makes final acceptance decision

## Context conservation

Workers should write concise durable artifacts to `/tmp/myhayat-final/` rather than dumping huge transcripts back into Claude's context.

Claude should request summaries with:
- findings
- exact files/lines/components
- recommended action
- blockers
- pass/fail

Do not paste whole pages/source files unless needed to resolve a specific conflict.

## Git safety

Only Claude performs the final push.
Workers may make local changes only inside their assigned scope, but they must not:
- force push
- reset --hard
- rewrite history
- delete unrelated work
- promote Vercel deployments
- make destructive Cloudflare changes

If temporary branches/worktrees are used, Claude owns integration and cleanup.
