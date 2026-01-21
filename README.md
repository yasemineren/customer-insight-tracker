#  Stochastic Signal Analyzer

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![Stack](https://img.shields.io/badge/Tech-React%20%7C%20Node.js%20%7C%20Gemini%20AI-orange)

##  Overview
**Stochastic Signal Analyzer** is a full-stack engineering project designed to simulate, visualize, and analyze noisy time-series data. 

This application generates synthetic signals (sinusoidal waves affected by Gaussian noise) to mimic real-world sensor data. It leverages **Generative AI (Google Gemini)** to act as an automated "Lab Assistant," performing real-time anomaly detection and signal integrity analysis on the stochastic datasets.

##  Key Features
* ** Signal Simulation Engine:** A Node.js backend that generates time-series data using the formula $S(t) = A \sin(\omega t) + \xi(t)$, where $\xi(t)$ represents random stochastic noise.
* ** AI-Driven Inspection:** Integrates **Google Gemini 2.5 Flash** to interpret numerical arrays, detecting anomalies (spikes, drops) and calculating signal confidence levels.
* ** Real-Time Visualization:** Uses `Recharts` to render dynamic data plots on a React-based frontend.
* ** Secure & Flexible:** Implements client-side API key management (BYOK) and supports **JSON file uploads** for external data analysis.
* ** Dockerized:** Fully containerized with Docker Compose for consistent deployment across any environment.

##  Tech Stack
| Component | Technology | Usage |
|-----------|------------|-------|
| **Frontend** | React.js (Vite) | Interactive Dashboard & State Management |
| **Backend** | Node.js / Express | Stochastic Data Generation API |
| **AI Model** | Google Gemini API | Automated Data Analysis |
| **Visualization** | Recharts | Data Plotting |
| **DevOps** | Docker & Compose | Containerization |

##  Installation & Setup

### Run with Docker (Recommended)
You can run the entire stack with a single command.

```bash
# 1. Clone the repository
git clone [https://github.com/yasemineren/stochastic-signal-analyzer.git](https://github.com/yasemineren/stochastic-signal-analyzer.git)

# 2. Run with Docker Compose
docker-compose up --build
Access the application at: http://localhost:5174

Author
Yasemin Eren Physics Student & Aspiring AI Engineer Combining analytical problem-solving skills from Physics with modern software engineering.

Built with using React, Node.js and Math.