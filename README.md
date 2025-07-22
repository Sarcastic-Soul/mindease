# MindEase ✨

MindEase is a web application designed to assist users in assessing and improving their mental health through a comprehensive diagnostic system, mental disorder resources, and well-being tools. 💖

## Features 🚀

  * **Custom Authentication System:** Secure user authentication with email verification. 🔐
  * **User Dashboard:** A personalized dashboard that tracks progress, including a daily task streak and a heatmap to visualize activity. 📈🔥
  * **Diagnostic System:**
      * **Main Questionnaire:** A tool that helps users self-assess potential mental health disorders by answering a set of questions. 🤔
      * **Specialized Tests:** In-depth diagnostic tests for specific mental disorders, including depression, anxiety, and others, with severity-based results to aid in precise diagnosis. 🧠
  * **Meditation & Well-being:** A calming meditation page with music and a timer for users to access guided meditation and other well-being resources to help improve mental health. 🧘‍♀️🎶
  * **Community Page:** A platform with media support where users can post about their progress and show support by liking posts. 🤝💬
  * **AI Assistant Chatbot:** An intelligent chatbot powered by Gemini to provide support and information. 🤖💡
  * **Accessibility:** Focus on creating an accessible user interface with modern and calming design elements to help users feel comfortable while interacting with the website. 🎨😌

## Tech Stack 💻

  * **Frontend:** Next.js 15, Tailwind CSS
  * **Backend:** MongoDB, Mongoose
  * **API:** Axios for API calls and data fetching
  * **AI:** Google Gemini

## Website 🌐

The website is currently in production on Vercel: [https://mindease-ruddy.vercel.app/](https://mindease-ruddy.vercel.app/)

## Setup 🛠️

To run the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/mindEase.git
    cd mindEase
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:** Create a `.env.local` file in the root directory and add the necessary environment variables:
    ```
    MONGO_URI=your-mongo-db-uri
    TOKEN_SECRET=your-secret-token
    DOMAIN=http://localhost:3000

    NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-emailjs-service-id
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your-emailjs-public-key
    NEXT_PUBLIC_EMAILJS_PASSWORD_RESET_TEMPLATE_ID=your-emailjs-password-reset-template-id
    NEXT_PUBLIC_EMAILJS_VERIFICATION_TEMPLATE_ID=your-emailjs-verification-template-id

    GEMINI_API_KEY=your-gemini-api-key

    CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
    CLOUDINARY_API_KEY=your-cloudinary-api-key
    CLOUDINARY_API_SECRET=your-cloudinary-api-secret
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
5.  Open your browser and visit `http://localhost:3000` to see the application in action. 🚀