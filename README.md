# MindEase

MindEase is a web application developed by me and my team as part of our 3rd-semester minor project. It is designed to assist users in assessing and improving their mental health through a comprehensive diagnostic system, mental disorder resources, and well-being tools.

## Features

- **Main Questionnaire:** A tool that helps users self-assess potential mental health disorders by answering a set of questions.
- **Specialized Tests:** In-depth diagnostic tests for specific mental disorders, including depression, anxiety, and others, with severity-based results.
- **Mental Disorder Information:** A library of articles in card format about various mental disorders. Clicking on a card displays detailed information such as:
  - Disorder Name
  - Description
  - Symptoms
  - Problems Faced
  - Methods of Cure
  - Famous People who have faced or overcome the disorder
- **Disorder Carousel:** An interactive carousel for users to easily browse and access disorder details.
- **User Dashboard:** A personalized dashboard that tracks progress, showing whether the user has completed the main questionnaire and specialized tests.
- **Meditation & Well-being:** A feature for users to access guided meditation and other well-being resources to help improve mental health.
- **Accessibility:** Focus on creating an accessible user interface with modern and calming design elements to help users feel comfortable while interacting with the website.

## Tech Stack

- **Frontend:** Next.js 15, Tailwind CSS
- **Backend:** MongoDB, Mongoose
- **API:** Axios for API calls and data fetching

## Website
- Website is currently in production on Vercel: https://mindease-ruddy.vercel.app/

## Setup

To run the project locally, follow these steps:

1. **Clone the repository:**
  ```bash
   git clone https://github.com/your-username/mindEase.git
   cd mindEase
   ```
2. **Install dependencies:**
  ```bash
   npm install
   ```
3. **Set up environment variables:** Create a .env.local file in the root directory and add the necessary environment variables:
  ```bash
   NEXT_PUBLIC_API_URL=your-api-url
   MONGO_URI=your-mongo-db-uri
   ```
4. **Run the development server:**
  ```bash
   npm run dev
   ```
6. Open your browser and visit http://localhost:3000 to see the application in action.
