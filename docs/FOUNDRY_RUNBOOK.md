# Microsoft Foundry AI integration — reproducible instructions

This feature invokes **real** Microsoft Agent Framework `Agent` objects using `FoundryChatClient`. Four specialised agents pass prior outputs as structured shared context. GestureAgent handles visible *synthetic* cues; TacticalAgent uses location/pressure; PredictionAgent interprets uncalibrated candidate scores; NarrativeAgent writes grounded commentary. This is sequential agent handoff through application code, **not** a framework `SequentialBuilder` graph or autonomous planning. No Azure call is claimed unless the endpoint returns `ai_generated: true` and stage status `model`.

## Setup (Python 3.10+ recommended)

1. Create an Azure subscription and a Microsoft Foundry project, deploy a supported chat model; review costs, RBAC and quotas.
2. `python -m pip install -r requirements-ai.txt`
3. Install Azure CLI, run `az login`, grant appropriate access to the Foundry project/model.
4. Copy `.env.example` to `.env` for reference. **Environment files are not auto-loaded:** set `FOUNDRY_PROJECT_ENDPOINT` and `FOUNDRY_MODEL` in your shell or deployment environment. Never commit API keys.
5. `python server/app.py --port 8080`
6. `curl 'http://localhost:8080/api/health'` must show `foundry_configured: true`.
7. `curl 'http://localhost:8080/api/ai?index=20&lang=en&audience=analyst'` must show model stages and truthful `ai_generated` flag. The old `/api/analyse` endpoint continues working offline.

### Verification and limitations

- Offline automated tests inject fake agent objects for contract validation; they **do not** establish Azure connectivity. Validate with your own project account before competition submission.
- Timeout: 40 s per agent; one failing stage falls back without fabricating an LLM answer. Each later agent can inspect the prior stage statuses.
- In production add rate limits, authentication, caching, trace identifiers, cost protection and replayable observability. This demo endpoint is deliberately not offered as a public unauthenticated cloud API.
- Facial features and gestures are synthesised metadata rather than actual video-based computer vision. Do not claim emotional state recognition.

Official SDK: https://github.com/microsoft/agent-framework ; Foundry quickstart: https://learn.microsoft.com/azure/ai-foundry/quickstarts/get-started-code
