# Inside the Game 2026 — Rules and Evidence Audit
Official rules: https://github.com/microsoft/insidethegamehackathon/blob/main/OFFICIAL%20RULES.md

## Mandatory, verifiable conditions
- New project produced after September 29, 2026: **owner must verify provenance**. The original archived BodyMap project has not been established.
- Functional on intended platform: local HTTP app with automated tests; a public Render deployment is LIVE at https://bodymap-football-intelligence.onrender.com (last verified 2026-10-28).
- AI-powered Microsoft hero technologies: **NOT SATISFIED**. Current workflow is deterministic Python functions, not Microsoft Foundry/Agent Framework. This is the largest Stage-One eligibility risk.
- Synthetic football-realistic events: **SATISFIED for local demo**, no third-party footage or players.
- Five stages: event ingestion, metric context, explanation, overlay output, differentiated audience profiles. **Implemented locally** as deterministic simulation with `/api/analyse`, `/api/overlay`, `/api/recap`.
- Public GitHub code URL: **SATISFIED**; GitHub visibility verified as public on 2026-10-28: https://github.com/milosgnjidicenquiries/bodymap-football-intelligence.
- Demo video (<2 min), publicly hosted on YouTube/Vimeo/Facebook Video/Youku: **NOT VERIFIED / NOT SATISFIED BY LINK IN REPO**; the current anonmp4.art video link uses an unapproved host; duration and real UI footage not independently verified.
- Submission pitch and correct Microsoft technologies: **draft exists**; must update based on integrations actually deployed.
- Testing access free until judging ends: **PARTIALLY SATISFIED**; public Render demo is live, but uptime through November 10 must be monitored and free access maintained.
- English submission: English README, pitch, testing instructions; default UI English.
- Third-party trademarks/copyright/music: use only original visuals, invented team names, and no licensed match footage/music.
- Register and submit via Projects page: **UNVERIFIED**. Official deadline: October 27, 2026 at 11:59 p.m. Pacific Daylight Time = October 28, 2026 at 07:59 in Serbia. The deadline is past as of this audit. Changing the repo after the deadline is not evidence of a timely submitted entry.

## Judging rubric — 20% each
1. Technological Implementation: reproducible seeded generator, strict schema validation, maintainable stdlib Python API, automated tests. **Gap**: verify genuine Microsoft AI technology within an eligible submission.
2. Agentic Design & Innovation: five auditable specialized deterministic stages, shared-state handoffs, controlled error fallback. **Gap**: no real autonomous agents; do not claim multi-agent AI.
3. Real-World Impact & Applicability: synthetic broadcast overlay contract and recap, local low-latency demo. **Gap**: no verified production metrics, cloud availability or real deployment.
4. User Experience & Presentation: event timeline, replay, analyst/broadcast/fan modes, multilingual narrative. **Gap**: approved-host video, accessibility evidence and verified original submission.
5. Adherence to Category: intended Best Multi-Agent System. **Gap**: Microsoft Agent Framework / real orchestration not implemented, so prize-readiness unproven.

## Ethical limitations
Gesture/facial annotations are fabricated categories, not detector outputs; never infer or claim an individual's emotional state or intention. Candidate scores are heuristic rankings, not calibrated probabilities. Metric names `event_share_percent` and `shot_threat_index` are not official possession/xG statistics.

## UX update — October 28, 2026
- The public dashboard now foregrounds football-specific explanations in English, Serbian and Spanish: event briefing, match context, five methodological stages and interpretable movement annotations.
- Raw deterministic execution labels are hidden in an optional technical detail panel, not misrepresented as real AI agent invocations.
- The guided Analyst / Broadcast / Fan scenes remain available and show the same synthetic data for different audiences.
- Public deployment reported LIVE by Render for commit `6fd6a4d`; latest documentation changes may be deployed separately.
- The official submission page, accepted submission status, video platform and Microsoft hero-technology use require independent verification. A polished UI cannot by itself ensure competition eligibility or a prize.
