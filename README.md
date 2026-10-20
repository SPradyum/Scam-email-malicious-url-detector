# ScamShield — Scam Email and Malicious URL Detector

An educational prototype based on the supplied report: Python, FastAPI, basic input/URL validation, and Google Gemini AI. It provides an advisory explanation, not a guaranteed verdict or a locally trained classifier.

## 1. Requirements

- Python 3.11+ recommended
- VS Code or another editor
- Internet access for Gemini API calls
- A Gemini API key with access to the configured model

## 2. Open the project

Extract the ZIP. In VS Code, choose **File → Open Folder** and select `scam_email_url_detector`.

Open the VS Code terminal (**Terminal → New Terminal**).

## 3. Create a virtual environment

### Windows PowerShell
```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
```
If PowerShell blocks activation, use Command Prompt:
```bat
.venv\Scripts\activate.bat
```

### macOS / Linux
```bash
python3 -m venv .venv
source .venv/bin/activate
```

## 4. Install packages

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

## 5. Configure Gemini

1. Create an API key at https://aistudio.google.com/apikey.
2. Copy `.env.example` and rename the copy to `.env`.
3. Open `.env` and replace `put_your_key_here` with your key.
4. Do not share `.env`, commit it to Git, or put the key in browser JavaScript.

If the model name is unavailable for your API account, set `GEMINI_MODEL` in `.env` to a currently supported text-generation model from the Google AI documentation.

## 6. Start the app

```bash
uvicorn main:app --reload
```

Open **http://127.0.0.1:8000** in your browser. Keep the terminal running while using the site.

API documentation is available at **http://127.0.0.1:8000/docs**.
Health endpoint: **http://127.0.0.1:8000/api/health**.

## 7. Test it

Try a harmless sample:
> Hi team, our meeting is scheduled for 3 PM. Please review the agenda before the meeting.

Try a suspicious-pattern sample:
> Your account will be suspended today. Verify your password immediately to avoid losing access.

For URL checks, use a non-sensitive example such as:
`http://example.com/login`

These are illustrative test inputs, not claims about the real-world safety of a domain. The application does not open or fetch the submitted URL.

## 8. Run the basic tests

Install the test dependency:
```bash
pip install pytest httpx
```
Then run:
```bash
pytest -q
```
These tests cover API health, input validation, and local URL parsing. They do not measure AI detection accuracy.

## Project structure

```text
scam_email_url_detector/
├── main.py                 # FastAPI backend and Gemini integration
├── requirements.txt        # Python dependencies
├── .env.example            # Example configuration; copy to .env
├── .gitignore              # Excludes secrets and virtual environment
├── static/
│   ├── index.html          # Browser interface
│   ├── style.css           # Interface styling
│   └── app.js              # Form submission and result rendering
└── tests/
    └── test_validation.py  # Basic automated tests
```

## Troubleshooting

- **`python` or `py` not found:** install Python and enable “Add Python to PATH”, then reopen the terminal.
- **Activation blocked:** use Command Prompt activation shown above, or configure your shell's policy according to your institution's IT guidance.
- **`ModuleNotFoundError`:** activate `.venv` and run `pip install -r requirements.txt`.
- **503 / key not configured:** confirm `.env` exists in the project root and uses `GEMINI_API_KEY=...`; restart the server after editing it.
- **502 AI service error:** check network access, API key validity, model access, quota, and the terminal message.
- **Port already in use:** run `uvicorn main:app --reload --port 8001` and open `http://127.0.0.1:8001`.

## Safety and limitations

- The AI output may be wrong; false positives and false negatives are possible.
- Basic URL parsing is not domain-reputation analysis and does not prove a URL is safe or malicious.
- Never paste passwords, OTPs, private data, or confidential messages.
- Do not automatically open submitted links or download their content.
- For real deployment, add authentication, rate limiting, HTTPS, privacy-aware logging, and a proper security review.
- The report describes an AI-service-based system, not a trained ML model. Do not claim accuracy, precision, recall, or F1 scores unless you evaluate against a labelled held-out dataset.
