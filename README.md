
### **Biteato**

Biteato is a modern social media platform designed to connect food enthusiasts with passionate food creators and local businesses. It's built as a full-stack application with a vertical video feed, user authentication, and social features like liking, saving, and commenting on food-related content. Users can discover new dishes, while food partners can showcase their creations and manage their offerings.

-----

### **Key Features**

  * **User Authentication**: Secure sign-up and login for both regular users and food partners.
  * **Reel Feed**: A vertical video feed for exploring food videos. The feed uses an Intersection Observer to automatically play and pause videos as they enter and leave the viewport.
  * **Social Interactions**: Users can like, save, and comment on food videos.
  * **Food Partner Dashboard**: Food partners have a private dashboard where they can upload new food videos and manage their profile.
  * **Real-time Updates**: The app shows real-time like, save, and comment counts.
  * **Private Routes**: The application uses private routes to protect certain pages, ensuring only authenticated users and partners can access them.

-----

### **Tech Stack**

**Frontend**

  * **React**: A JavaScript library for building user interfaces.
  * **Vite**: A fast frontend build tool.
  * **React Router DOM**: For handling client-side routing.
  * **Zustand**: A state management library.
  * **Axios**: For making API requests to the backend.
  * **React Toastify**: For displaying notifications.

**Backend**

  * **Node.js & Express**: The server environment and web framework.
  * **MongoDB & Mongoose**: The database and object data modeling (ODM) library.
  * **Bcryptjs & JWT**: For password hashing and JSON Web Token-based authentication.
  * **ImageKit**: A third-party service for handling image and video uploads.

-----

### **Getting Started**

Follow these steps to set up and run the Biteato project locally.

#### **Prerequisites**

  * Node.js (v18 or higher)
  * MongoDB Atlas account
  * ImageKit account

#### **1. Backend Setup**

Navigate to the `backend` directory and follow these steps:

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Create a `.env` file**:
    Create a file named `.env` in the `backend` directory and add your environment variables.
    ```
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
    IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
    IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
    ```
3.  **Run the server**:
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:3000`.

#### **2. Frontend Setup**

Navigate to the `frontend` directory and follow these steps:

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Create a `.env` file**:
    Create a file named `.env` in the `frontend` directory and add your backend URL.
    ```
    VITE_BACKEND_URL=http://localhost:3000
    ```
3.  **Run the frontend**:
    ```bash
    npm run dev
    ```
    The app will open in your browser, typically at `http://localhost:5173`.
