# Inside the Game 2026 — Rules and Evidence Audit
Official rules: https://github.com/microsoft/insidethegamehackathon/blob/main/OFFICIAL%20RULES.md

## Mandatory, verifiable conditions
- New project produced after September 29, 2026: **owner must verify provenance**. The original archived BodyMap project has not been established.
- Functional on intended platform: local HTTP app with automated tests; a public testing URL **is not yet available**.
- AI-powered Microsoft hero technologies: **NOT SATISFIED**. Current workflow is deterministic Python functions, not Microsoft Foundry/Agent Framework. This is the largest Stage-One eligibility risk.
- Synthetic football-realistic events: **SATISFIED for local demo**, no third-party footage or players.
- Five stages: event ingestion, metric context, explanation, overlay output, differentiated audience profiles. **Implemented locally** as deterministic simulation with `/api/analyse`, `/api/overlay`, `/api/recap`.
- Public GitHub code URL: **NOT SATISFIED**; repository must be published.
- Demo video (<2 min), publicly hosted on YouTube/Vimeo/Facebook Video/Youku: **NOT SATISFIED**; record real working UI and share URL.
- Submission pitch and correct Microsoft technologies: **draft exists**; must update based on integrations actually deployed.
- Testing access free until judging ends: **NOT SATISFIED**; need publicly available build and/or explicitly documented accessible test build.
- English submission: English README, pitch, testing instructions; default UI English.
- Third-party trademarks/copyright/music: use only original visuals, invented team names, and no licensed match footage/music.
- Register and submit via Projects page: **NOT DONE**. 2026-10-27 23:59 PT / 2026-10-28 07:59 Serbia deadline.

## Judging rubric — 20% each
1. Technological Implementation: reproducible seeded generator, strict schema validation, maintainable stdlib Python API, automated tests. **Gap**: deploy genuine Microsoft AI tech.
2. Agentic Design & Innovation: five auditable specialized deterministic stages, shared-state handoffs, controlled error fallback. **Gap**: no real autonomous agents; do not claim multi-agent AI.
3. Real-World Impact & Applicability: synthetic broadcast overlay contract and recap, local low-latency demo. **Gap**: no verified production metrics, cloud availability or real deployment.
4. User Experience & Presentation: event timeline, replay, analyst/broadcast/fan modes, multilingual narrative. **Gap**: public video and accessibility evidence.
5. Adherence to Category: intended Best Multi-Agent System. **Gap**: Microsoft Agent Framework / real orchestration not implemented, so prize-readiness unproven.

## Ethical limitations
Gesture/facial annotations are fabricated categories, not detector outputs; never infer or claim an individual's emotional state or intention. Candidate scores are heuristic rankings, not calibrated probabilities. Metric names `event_share_percent` and `shot_threat_index` are not official possession/xG statistics.
