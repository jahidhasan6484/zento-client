# Project Name

## Description

This project is a blog web application that includes user authentication, a dashboard, user profile, and a search functionality. Users can register, login, view their profile, see an overview of their articles, and search for blog posts. The application uses Firebase for authentication and React for the frontend.

## Features

- **User Authentication**: Register, login, and logout using Firebase.
- **Dashboard**: Users can view their personalized dashboard.
- **Profile**: Users can view and edit their profile information.
- **Search Functionality**: Users can search for blog posts. The search results are displayed dynamically as the user types.
- **Trending Topics**: Users can select a topic to read posts related to that particular type.
- **Latest Blogs**: Displays the newest posts on the portal.

## Technologies Used

- **Frontend**: React, React Router, Axios, dayJS, React Firebase Hooks
- **Backend**: Firebase
- **Styling**: Tailwind CSS
- **State Management**: React hooks
- **Build Tool**: Vite

## Setup and Running the Project Locally

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jahidhasan6484/zento-client.git
   cd zento-client
   ```

2. **Install dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

3. **Set up Firebase**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Register your app on the Firebase dashboard
   - Enable Email/Password and Sign In with Google Authentication in the Authentication section

4. **Configure environment variables**

   Create a `.env` file in the root of the project and add your Firebase configuration and backend server URL:

   ```plaintext
   VITE_apiKey=your-api-key
   VITE_authDomain=your-auth-domain
   VITE_projectId=your-project-id
   VITE_storageBucket=your-storage-bucket
   VITE_messagingSenderId=your-messaging-sender-id
   VITE_appId=your-app-id
   VITE_server=your-backend-server-url
   ```

5. **Run the project**

   Using npm:

   ```bash
   npm run dev
   ```

   Using yarn:

   ```bash
   yarn dev
   ```

   The application should now be running on `http://localhost:5173`.

### Backend Setup

The backend for this project can be found at [zento-server](https://github.com/jahidhasan6484/zento-server.git).

1. **Clone the server repository**

   ```bash
   git clone https://github.com/jahidhasan6484/zento-server.git
   cd zento-server
   ```

2. **Install dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root of the server project and add your configuration:

   ```plaintext
   PORT=your-port
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   ```

4. **Run the server**

   Using npm:

   ```bash
   npm start
   ```

   Using yarn:

   ```bash
   yarn start
   ```

   The server should now be running on `http://localhost:your-port`.

### Project Structure

- **/src**
  - **/components**: Reusable React components
  - **/firebase**: Firebase configuration
  - **/pages**: Page components for different routes
  - **App.js**: Main application component
  - **index.js**: Entry point for the React application

### Key Components

- **Navbar**: The navigation bar with user authentication controls and search functionality.
- **Dashboard**: The user dashboard displaying personalized information.
- **Profile**: The profile page where users can view and edit their information.
- **Latest Blogs**: The section displaying the newest posts on the portal.
- **Trending Topics**: The section displaying trending topics for users to explore.
- **Loading**: A loading spinner displayed during data fetching.
- **Footer**: The footer of the application.

### Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.
