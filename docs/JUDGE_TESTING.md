# Judge instructions (English)
Requires desktop or laptop with Python 3.9+. No credentials, accounts or payments.
1. Unzip repository; from repository root run `python server/app.py --port 8080`.
2. Visit `http://localhost:8080`; press Play; switch Analyst/Broadcast/Fan, perspective, gestures and languages.
3. Open `http://localhost:8080/api/overlay?index=20&audience=broadcast&lang=en` for synchronized, machine-readable overlay.
4. Open `http://localhost:8080/api/recap?lang=en&audience=fan` for end-of-match recap.
5. Open `http://localhost:8080/api/analyse?index=20&fail=Gesture%20Intelligence` for explicit fallback demonstration.
6. Run `python -m unittest discover -s tests -v`.
This is not a public deployed instance; independent judge access still needs publication/hosting as required by the official rules.
