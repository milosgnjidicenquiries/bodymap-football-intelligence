# Public deployment — Render

This app needs a Python server, since the frontend requests `/api/match`, `/api/analyse`, and `/api/metrics`. GitHub Pages alone won't host those APIs.

1. Publish this folder's contents to a public GitHub repository, not only a ZIP file. Never commit `.env` or keys.
2. Connect GitHub to Render at https://dashboard.render.com/ . Choose **New → Blueprint** and select the repository containing `render.yaml`.
3. Deploy the Blueprint. Once Render reports *Live*, visit the assigned `https://<service>.onrender.com/` address and test `/api/health`.
4. Leave the optional Microsoft Foundry credentials unset for the public deterministic synthetic demonstration. To use Microsoft Foundry, configure server-side secrets and authentication separately. The rendered UI currently uses `/api/analyse` (deterministic), not `/api/ai` (optional).
5. Render's free service may sleep after inactivity and may have availability limitations. Check current terms.

Never claim it is deployed before Render confirms a working public endpoint. A live URL cannot be predicted from the repository name.
