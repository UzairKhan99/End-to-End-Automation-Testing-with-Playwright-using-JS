# Adactin Playwright Automation Framework

An end-to-end test automation framework for the **Adactin Hotel Booking application**, built with **JavaScript**, **Playwright** and the **Page Object Model (POM)**. It also includes **JSONPlaceholder API tests**, **Allure reporting**, **Docker** support and **CI/CD** pipelines (GitHub Actions and Jenkins).

**Repository:** https://github.com/UzairKhan99/End-to-End-Automation-Testing-with-Playwright-using-JS

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Project Structure](#project-structure)
5. [Setup](#setup)
6. [Configure Credentials](#configure-credentials)
7. [Running the Tests](#running-the-tests)
8. [Reports](#reports)
9. [Running with Docker](#running-with-docker)
10. [CI/CD](#cicd)
11. [Test Data and Safety](#test-data-and-safety)
12. [Troubleshooting](#troubleshooting)

---

## Features

- UI automation of the Adactin booking journey: login, hotel search, hotel selection, booking, booking confirmation, itinerary verification and logout
- Positive and negative UI scenarios
- API tests (GET, POST, PUT, DELETE) against JSONPlaceholder
- Page Object Model for maintainable locators and actions
- Data-driven tests using JSON files
- Reusable utilities (credentials, dates, waits, screenshots, logging, dialogs)
- Screenshot on failure and browser console/page-error logging
- HTML and Allure reports
- Docker image, GitHub Actions workflow and Jenkins pipeline

## Tech Stack

| Tool | Purpose |
| --- | --- |
| Playwright Test | Browser automation, test runner, assertions |
| JavaScript (Node.js) | Test scripting |
| Page Object Model | Test design pattern |
| Allure | Detailed reporting |
| Docker | Containerised execution |
| GitHub Actions | API-test CI workflow |
| Jenkins | Full-suite CI/CD pipeline |

## Prerequisites

- **Node.js** and **npm**
- **Git**
- **Adactin test credentials** (for authenticated UI tests)
- **Docker Desktop** (only for container runs)
- A **Jenkins agent with Docker access** (only for the Jenkins pipeline)

## Project Structure

```
pages/                 Page Object Model classes for Adactin
tests/
  positive/            Successful UI and booking scenarios
  negative/            Invalid login and search scenarios
  api/                 JSONPlaceholder GET, POST, PUT, DELETE tests
  helpers/             Shared UI test hooks (authHooks.js)
test-data/             JSON data (hotel, booking, API scenarios)
utils/                 Credentials, date, wait, screenshot, logging, dialog helpers
docs/                  Architecture and project documentation
.github/workflows/     GitHub Actions API-test workflow
Dockerfile             Playwright container image
Jenkinsfile            Jenkins pipeline (Docker + Allure)
playwright.config.js   Browser, discovery, retry and reporter configuration
```

The suite currently discovers **13 tests** (8 UI and 5 API).

## Setup

**1. Clone the repository**

```bash
git clone https://github.com/UzairKhan99/End-to-End-Automation-Testing-with-Playwright-using-JS.git
cd End-to-End-Automation-Testing-with-Playwright-using-JS
```

**2. Install dependencies**

```bash
npm ci
```

**3. Install the Playwright browser**

```bash
npx playwright install chromium
```

## Configure Credentials

Authenticated UI tests read credentials from environment variables. Credentials are **not** stored in the repository or in the JSON test data.

**Windows (PowerShell)**

```powershell
$env:ADACTIN_USERNAME = "your-test-username"
$env:ADACTIN_PASSWORD = "your-test-password"
```

**macOS / Linux (bash)**

```bash
export ADACTIN_USERNAME="your-test-username"
export ADACTIN_PASSWORD="your-test-password"
```

The variables apply to the current terminal session only. API tests do not need credentials.

## Running the Tests

| Command | Purpose |
| --- | --- |
| `npm test` | Run all UI and API tests |
| `npm run test:headed` | Run with a visible browser |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:debug` | Run in Playwright debug mode |
| `npx playwright test tests/api` | Run only the API tests |
| `npx playwright test tests/positive` | Run only the positive UI tests |
| `npx playwright test tests/negative` | Run only the negative UI tests |
| `npx playwright test <file>.spec.js` | Run a single spec file |

Playwright waits automatically for locator actions and assertions, so no fixed sleeps are used. `utils/waitUtils.js` offers an explicit visible-element wait where needed.

## Reports

| Report | Command |
| --- | --- |
| Playwright HTML report | `npm run report` |
| Build Allure report | `npm run allure:generate` |
| Open Allure report | `npm run allure:open` |

Output folders: `playwright-report/`, `allure-results/`, `test-results/` (ignored by Git). Failed UI tests attach a screenshot automatically.

For a fresh Allure report rather than a merge with older runs, clear the raw results first:

```powershell
Remove-Item -Recurse -Force .\allure-results -ErrorAction SilentlyContinue
npm test
npm run allure:generate
```

On macOS/Linux use `rm -rf allure-results` instead.

## Running with Docker

Build the image from the repository root:

```bash
docker build -t adactin-playwright .
```

Set the two credential variables, then run the full suite inside the container:

```bash
docker run --rm -e ADACTIN_USERNAME -e ADACTIN_PASSWORD adactin-playwright
```

The image uses the Playwright browser image that matches the project's Playwright version and runs `npm test` on start.

## CI/CD

### GitHub Actions

`.github/workflows/playwright.yml` runs the **API suite** on pushes and pull requests to `main`. Adactin's anti-bot protection can block hosted runners, so UI tests are not run there. UI tests run locally and in Jenkins.

### Jenkins with Docker

1. Install the Jenkins **Pipeline, Git, Credentials Binding** and **Allure Jenkins** plugins.
2. Add a Jenkins **Username with password** credential with ID `adactin-credentials`.
3. Use an agent with Docker installed and permission to use the Docker daemon.
4. Create a **Pipeline** job pointing at this repository (it uses the `Jenkinsfile`).
5. Optionally configure a GitHub webhook for push-triggered builds. The Jenkinsfile also schedules a weekday build.

The pipeline builds the Docker image, runs the full suite in the container, generates the Allure report and archives Playwright/Allure results and failure screenshots.

## Test Data and Safety

- Hotel and booking inputs: `test-data/hotel.json`, `test-data/booking.json`
- API endpoints, payloads and expected responses: `test-data/apiPost.json`
- Card and booking details are fictitious. Never commit real passwords, tokens or payment details.
- JSONPlaceholder simulates writes: POST, PUT and DELETE do not permanently change its data.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Credential validation error at start | Set `ADACTIN_USERNAME` and `ADACTIN_PASSWORD` in the same terminal |
| `Executable doesn't exist` | Run `npx playwright install chromium` |
| UI tests fail in Jenkins or CI but pass locally | Adactin may block the agent; confirm the site and account are reachable from it |
| Old results appear in the Allure report | Delete `allure-results/` before running |
| Docker run fails to log in | Pass both `-e` variables and confirm they are set |

## Author

**Uzair Khan**, BS Computer Science, FAST NUCES Karachi
