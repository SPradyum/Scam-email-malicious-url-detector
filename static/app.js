let inputType = "email";
const tabs = document.querySelectorAll(".tab");
const form = document.getElementById("analyze-form");
const content = document.getElementById("content");
const label = document.getElementById("input-label");
const helper = document.getElementById("helper-text");
const counter = document.getElementById("counter");
const submit = document.getElementById("submit");
const loading = document.getElementById("loading");
const result = document.getElementById("result");
const assessment = document.getElementById("assessment");
const urlChecks = document.getElementById("url-checks");
const disclaimer = document.getElementById("disclaimer");

tabs.forEach((tab) => tab.addEventListener("click", () => {
  inputType = tab.dataset.type;
  tabs.forEach((item) => item.classList.toggle("active", item === tab));
  if (inputType === "email") {
    label.textContent = "Paste the email or message";
    content.placeholder = "Paste suspicious email or message text here…";
    helper.textContent = "Remove personal details before submitting.";
    submit.innerHTML = 'Analyze for risks <span aria-hidden="true">→</span>';
  } else {
    label.textContent = "Paste the website URL";
    content.placeholder = "example.com/suspicious-page";
    helper.textContent = "The app will parse the URL but will not open it.";
    submit.innerHTML = 'Check URL indicators <span aria-hidden="true">→</span>';
  }
}));

content.addEventListener("input", () => counter.textContent = `${content.value.length} / 10000`);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  result.classList.add("hidden");
  loading.classList.remove("hidden");
  submit.disabled = true;

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({input_type: inputType, content: content.value})
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || "Request failed. Please try again.");

    assessment.textContent = data.assessment;
    disclaimer.textContent = data.disclaimer;
    urlChecks.classList.add("hidden");
    urlChecks.replaceChildren();

    if (data.url_checks) {
      const info = data.url_checks;
      urlChecks.classList.remove("hidden");
      const heading = document.createElement("strong");
      heading.textContent = `Basic URL checks — ${info.hostname}`;
      const details = document.createElement("p");
      details.textContent = `${info.scheme.toUpperCase()} · ${info.note}`;
      const list = document.createElement("ul");
      info.indicators.forEach((indicator) => {
        const li = document.createElement("li");
        li.textContent = indicator;
        list.appendChild(li);
      });
      urlChecks.append(heading, details, list);
    }
    result.classList.remove("hidden");
  } catch (error) {
    assessment.textContent = `Could not complete analysis:\n${error.message}`;
    disclaimer.textContent = "Check the server terminal and API configuration. Do not treat an error as a safety verdict.";
    urlChecks.classList.add("hidden");
    result.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
    submit.disabled = false;
  }
});

document.getElementById("clear").addEventListener("click", () => {
  content.value = "";
  counter.textContent = "0 / 10000";
  result.classList.add("hidden");
  content.focus();
});
