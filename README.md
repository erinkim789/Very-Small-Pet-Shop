# The Very Small Pet Shop

**A whimsical, interactive pet adoption experience where the pets choose you.**

Meet six unique pets, discover their personalities, and complete a personality questionnaire to find out whether you're their perfect match. Each pet has individual preferences, expectations, and dealbreakers, so even a high compatibility score doesn't guarantee you'll be accepted!

<p align="center">
  <a href="https://very-small-pet-shop.onrender.com/"><strong>Visit the Live Application</strong></a>
</p>

---

## Features

### Interactive Pet Shop
- Explore six unique pets, each with their own personality, profile, preferences, and adoption requirements.
- View interactive pet profiles and discover what each pet looks for in an owner.
- Experience custom illustrations, animated pet sprites, and interactive transitions.

### Personality Questionnaire
- Complete a scenario-based questionnaire designed to evaluate four personality traits:
  - **Sociability:** How outgoing and socially engaged are you?
  - **Persistence:** How determined are you when facing challenges?
  - **Patience:** How well do you handle waiting and difficult situations?
  - **Spontaneity:** How open are you to unexpected experiences?

### Compatibility Engine
- Calculate personalized compatibility scores using weighted comparisons between applicant and pet personality profiles.
- Account for individual pet preferences, acceptance thresholds, and non-negotiable dealbreakers.
- Receive individualized adoption decisions, including rejection regardless of the overall compatibility score.

### Personality Percentiles
- Compare your personality against historical applicants across all four personality traits.
- Calculate percentile rankings dynamically using PostgreSQL queries against previously submitted applications.
- Provide additional context for personality scores using historical application data.

### Adoption Experience
- Get matched with pets that accept your application.
- Adopt an accepting pet and bring your new companion home.

---

## Compatibility Engine

Each pet has an independently configured ideal personality profile, individual trait weights, acceptance threshold, and set of dealbreaker conditions.

The compatibility engine evaluates applicants through several stages:

1. **Personality Scoring:** Questionnaire responses contribute points to one or more personality traits.
2. **Score Normalization:** Raw personality scores are normalized to a consistent 0 to 10 scale.
3. **Weighted Compatibility:** The applicant's personality profile is compared against each pet's ideal profile. Individual trait weights determine how much each personality difference affects the final compatibility score.
4. **Dealbreaker Evaluation:** Specific questionnaire answers can trigger hard rejection conditions, independently of the compatibility score.
5. **Acceptance Decision:** Each pet applies its own acceptance threshold and dealbreaker requirements to determine whether an applicant is accepted.

Compatibility is not simply a matter of achieving the highest score. Every pet has their own standards!

## Historical Personality Comparisons

In addition to compatibility scores, applicants can see how their personality compares with previous applicants.

- Normalized personality scores are stored in PostgreSQL.
- Percentiles are calculated dynamically through database queries against historical application records.
- Rankings are generated independently for Sociability, Persistence, Patience, and Spontaneity.

Rather than relying on predefined percentile values, the application uses previously submitted applications to provide data-driven personality comparisons.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, JavaScript, Vite, CSS |
| **Backend** | Python, FastAPI, SQLAlchemy |
| **Database** | PostgreSQL |

---

## Running Locally

### Prerequisites

- Node.js and npm
- Python 3.10+
- PostgreSQL

### 1. Clone the Repository

```bash
git clone https://github.com/erinkim789/Very-Small-Pet-Shop.git
cd Very-Small-Pet-Shop
```

### 2. Configure Environment Variables

**Frontend**

Create a `.env` file inside `frontend/`:

```env
VITE_API_URL=http://localhost:8000
```

This specifies the URL of the FastAPI backend.

**Backend**

Create a `.env` file inside `backend/`:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

Replace the example credentials and database name with your local PostgreSQL configuration.

### 3. Set Up the Backend

Create and activate a virtual environment from the project root:

```bash
python -m venv .venv
```

Activate it:

**Linux / macOS / WSL**
```bash
source .venv/bin/activate
```

**Windows**
```bash
.venv\Scripts\activate
```

Install the backend dependencies:

```bash
pip install -r backend/requirements.txt
```

### 4. Initialize the Database

Make sure your PostgreSQL server is running and your backend `.env` file is configured correctly.

Run the database seeding script from the project root:

```bash
python -m backend.seed_data
```

The seed script populates the database with sample historical applications. This provides existing applicant data for the personality percentile calculations.

### 5. Start the Backend

From the project root:

```bash
uvicorn backend.application:app --reload
```

The FastAPI server will be available at:

`http://localhost:8000`

### 6. Start the Frontend

Open a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will provide the local frontend URL in the terminal.

---

## Design

The Very Small Pet Shop combines custom artwork and interactive frontend design to create a playful adoption experience.

- Custom-designed user interface
- Original pet illustrations
- Animated pet sprites
- Interactive personality and pet profiles
- Smooth transitions throughout the adoption experience

---

<p align="center">
  <strong>Thank you for visiting The Very Small Pet Shop!</strong>
  <br/>
  <em>You're not choosing your pet. Your pet is choosing you.</em>
</p>