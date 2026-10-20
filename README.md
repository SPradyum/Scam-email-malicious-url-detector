# Scam Email and Malicious URL Detection Using AI

An AI-assisted cybersecurity web application developed as a college project for the **Machine Learning** subject. The application analyzes suspicious emails, text messages, and website URLs to identify potential scam and phishing indicators.

## Project Overview

Scam emails and malicious URLs are commonly used in phishing attacks to trick users into sharing sensitive information, clicking suspicious links, or making fraudulent payments.

This project provides a simple web interface where users can submit an email/message or a URL and receive an AI-generated risk assessment with explanations of potential warning signs.

**Note:** This is an educational prototype. It uses a hosted generative AI service and basic URL checks; it is not a separately trained machine-learning classifier.

## Features

- **Email and Message Analysis:** Reviews submitted text for potential scam and phishing indicators.
- **URL Analysis:** Parses URLs and checks basic characteristics, including HTTP usage, hostname structure, and suspicious-looking path terms.
- **AI-Assisted Assessment:** Uses the Google Gemini API to explain potential warning signs and suggest safe next steps.
- **Interactive Web Interface:** Provides separate input modes for email/message and website URL analysis.
- **Input Validation:** Checks the input type and limits the length of submitted content.
- **Error Handling:** Displays useful messages when the AI service cannot complete a request.
- **API Documentation:** Provides interactive API documentation through FastAPI.

## Technologies Used

| Technology | Purpose |
|---|---|
| Python | Backend application logic |
| FastAPI | Backend API and HTTP endpoints |
| Google Gemini API | AI-assisted text analysis |
| HTML | Web page structure |
| CSS | Interface styling |
| JavaScript | Frontend interaction and API requests |
| Pydantic | Input validation |
| Uvicorn | Local development server |
| python-dotenv | Loading environment variables |

## System Architecture

1. **User Input:** The user enters an email/message or website URL.
2. **Frontend:** HTML, CSS, and JavaScript provide the interface and send the request.
3. **Backend:** FastAPI validates the request and processes the input.
4. **URL Checks:** For URL input, basic parsing and format indicators are evaluated locally.
5. **AI Assessment:** The backend sends the submitted content and analysis instructions to Google Gemini.
6. **Result:** The application displays the AI assessment, potential warning signs, and recommended next steps.

## Project Structure

```text
scam_email_url_detector/
├── main.py
├── requirements.txt
├── .env.example
├── .gitignore
├── README.md
├── static/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── tests/
    └── test_validation.py
```

## Prerequisites

Before running the application, install:

- Python 3.12 recommended
- Visual Studio Code or another code editor
- Internet connectivity
- A Google Gemini API key with access to a supported model

Create an API key using [Google AI Studio](https://aistudio.google.com/apikey).

## Installation and Setup

### 1. Clone the repository

Replace `YOUR_GITHUB_USERNAME` with your GitHub username.

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/scam-email-malicious-url-detector.git
cd scam-email-malicious-url-detector
```

Alternatively, download the repository as a ZIP file and extract it.

### 2. Create a virtual environment

**Windows PowerShell or Command Prompt:**

```powershell
py -3.12 -m venv .venv
```

If PowerShell blocks activation, you can use the environment's Python executable directly without activating it.

### 3. Install dependencies

```powershell
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

### 4. Configure the Gemini API

Copy `.env.example` to a new file named `.env` in the project root.

Update `.env` with your own API key and a model available to your account:

```dotenv
GEMINI_API_KEY=your_actual_api_key_here
GEMINI_MODEL=your_supported_model_name
```

Use the model name recommended by the current Google Gemini API documentation and supported by your API account.

**Security:** Never upload `.env` or expose your API key in source code, screenshots, or public repositories.

### 5. Run the application

On Windows:

```powershell
.\.venv\Scripts\python.exe -m uvicorn main:app --reload
```

Open the application in your browser:

- **Web application:** http://127.0.0.1:8000
- **Interactive API documentation:** http://127.0.0.1:8000/docs
- **Health check:** http://127.0.0.1:8000/api/health

Keep the terminal open while using the application. Press `Ctrl + C` to stop the server.

## Testing

The project includes basic automated tests for input validation, API health, and URL parsing.

Install the testing dependencies:

```powershell
.\.venv\Scripts\python.exe -m pip install pytest httpx
```

Run the tests:

```powershell
.\.venv\Scripts\python.exe -m pytest -q
```

Manual testing can include:

- Submitting a normal email/message.
- Submitting text with urgency and requests for sensitive information.
- Entering a constructed suspicious-looking URL.
- Submitting an empty or malformed input.
- Checking the application's response when the AI service is unavailable.

These tests do not establish real-world detection accuracy. AI-dependent cases should be tested separately with a working API configuration.

## Limitations

- AI-generated assessments may contain false positives or false negatives.
- Basic URL indicators cannot establish that a website is safe or malicious.
- The application does not currently use a labelled dataset to train a separate classifier.
- Accuracy, precision, recall, and F1-score have not been established through a labelled evaluation dataset.
- AI analysis requires a working internet connection, valid API access, model availability, and sufficient quota.
- The application is an educational prototype and is not intended to replace professional security tools.

## Future Improvements

- Train and evaluate a machine-learning classifier using a labelled dataset.
- Measure precision, recall, F1-score, and confusion matrix results.
- Integrate reputable URL reputation and threat-intelligence sources.
- Improve automated testing and input handling.
- Add authentication, rate limiting, and production security controls.
- Deploy the application using a suitable hosting platform.

## Academic Project

**Subject:** Machine Learning  
**Project Title:** Scam Email and Malicious URL Detection Using AI  
**Project Type:** College academic project

## Disclaimer

This project is intended for educational and cybersecurity-awareness purposes only. Do not submit passwords, one-time passwords (OTPs), confidential emails, or other sensitive information. The application's output is advisory and does not guarantee that a message or URL is safe or malicious.

## Author

**Name:** Pradyum Sanyasi  
**Course / Department:** COMPUTER SCIENCE & ENGINEERING 

Developed as part of an academic project in Machine Learning.
