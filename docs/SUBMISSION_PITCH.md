# Project Pitch — BodyMap (truthful current build)

BodyMap transforms a reproducible, wholly synthetic football match into explainable, timed match intelligence for analysts, broadcasters and fans. A zero-dependency Python service validates events, aggregates football-statistics proxies, explains contextual pressure and fabricated gesture annotations, and provides time-stamped, machine-readable overlays and automated match recaps. A browser dashboard replays all 90 events in both pitch views and offers differentiated audience perspectives and localized English, Spanish and Serbian narratives.

**Distinctive innovation:** body orientation, head direction, face-shape and hand-gesture annotations are combined as synthetic tactical context alongside the next-action heuristic. The system does not infer actual emotion or intent. The current orchestrator exposes named processing stages and explicit handoff states; it is a deterministic pipeline, NOT Microsoft Foundry or AI agents.

**Microsoft/Azure technologies used in current build:** none. Microsoft Foundry, Agent Framework and Azure deployment remain integration requirements; do not misrepresent them. GitHub Actions workflow is included but public repository/CI execution are not verified.

**Category aspiration:** Best Multi-Agent System — currently unmet pending actual supported agent orchestration.

**Problem:** raw match event feeds are difficult to narrate, visualize and personalize. **Solution:** one reproducible, inspectable pipeline produces three different presentation modes, timed overlays and recaps.
