# Google Keep Clone

A clone of Google Keep with major functionality built using **ReactJS**, **SCSS**, **Vite**, **Firebase Authentication**, **Firebase Realtime Database**, **Firebase Hosting**, and **React Router DOM**. This app allows users to sign in via Google, Facebook, GitHub, and Twitter to create and manage notes in a user-friendly interface.

## Features

- **User Authentication**: Sign in with Google, Facebook, GitHub, or Twitter via Firebase Authentication.
- **Note Management**: Create, edit, and delete notes.
- **Real-time Sync**: All notes are stored and updated in Firebase Realtime Database.
- **Responsive UI**: Built with SCSS for a modern and responsive user experience.
- **Routing**: Managed with React Router DOM for seamless navigation.

## Live Site

You can access the live version of the site here: [Google Keep Clone Live](https://keep11.web.app)

## Installation

To run this project locally, follow these steps:

## 1. Clone the repository:

```bash
git clone https://github.com/sahedulislamrony/google-keep-clone.git

cd google-keep-clone
```

## 2. Install Dependencies

Ensure that [Node.js](https://nodejs.org/) is installed on your machine. Then, run the following command to install all required dependencies:

```bash
npm install
```

## 3. Configure Firebase

To set up Firebase services (Authentication and Realtime Database) in the project, follow these steps:

1. **Create a Firebase Project**:

   - Go to [**Firebase Console**](https://firebase.google.com/), log in with your Google account, and create a new Firebase project.

2. **Enable Firebase Authentication**:

   - In the Firebase Console, navigate to **Authentication**.
   - Click on the **Sign-in method** tab and enable the desired authentication providers (Google, Facebook, GitHub, and Twitter).
   - For Facebook, GitHub, and Twitter, you will need to provide API keys and secrets from the corresponding developer portals.

3. **Enable Firebase Realtime Database**:

   - Go to the **Realtime Database** section in the Firebase Console.
   - Click **Create Database** and choose your preferred location.
   - Set up the database rules to allow authenticated users to read and write. You can modify the rules like this:
     ```json
     {
       "rules": {
         ".read": "auth != null",
         ".write": "auth != null"
       }
     }
     ```

4. **Get Firebase Configuration**:

   - Go to **Project Settings** in the Firebase Console.
   - Scroll down to the **Your apps** section and copy the Firebase SDK configuration (API Key, Auth Domain, Project ID, etc.).

5. **Create a `.env` File**:

   - In the root of your project directory, create a `.env` file.
   - Add your Firebase configuration to the `.env` file like this:
     ```env
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     VITE_FIREBASE_DATABASE_URL=your-database-url
     ```

6. **Install Firebase SDK**:
   Run the following command to install Firebase:
   ```bash
   npm install firebase
   ```

## 4. Run the Project

Once you have configured Firebase and installed the necessary dependencies, you can start the development server. Follow these steps:

**1. Start the Development Server**  
 Use the following command to run the application locally:

```bash
npm run dev
```

**2. Open in Browser**

After running the command, the terminal will display a local server URL, usually:

```bash
http://localhost:5173
```

Open this URL in your web browser.

**3. Access the Application**

You should now see the Google Keep Clone application running. You can start adding, editing, and managing your notes.

**4. Hot Reloading**

**Vite** supports **Hot Module Replacement (HMR)**, meaning any changes you make to the code will automatically refresh the browser without needing to restart the server.

**5. Debugging**

If you encounter any issues, check the terminal for error messages and the browser's console for any relevant logs.

## Additional Scripts

In addition to running the development server, the project includes several useful scripts for committing changes, deploying the site, building for production, and previewing the build. Here are the available scripts:

**1. Commit Changes**

To commit your changes using a standardized format, run:

```bash
npm run commit
```

**2. Deploy to Firebase**

To deploy the application directly to Firebase Hosting, use the following command:

```bash
npm run host
```

**3. Build for Production**

To create an optimized production build of your application, run:

```bash
npm run build
```

**4. Preview Build**

To preview the production build locally, execute:

```bash
npm run preview
```
