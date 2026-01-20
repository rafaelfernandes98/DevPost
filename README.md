# DevPost

A React Native mobile application for developers to share posts, connect with others, and discover content. Built with TypeScript and Firebase.

## Tech Stack

- **Framework:** React Native 0.71.8
- **Language:** TypeScript
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **Navigation:** React Navigation (Native Stack + Bottom Tabs)
- **Styling:** styled-components
- **Icons:** react-native-vector-icons

## Features

- **Authentication** - User login and registration via Firebase Auth
- **Home Feed** - Browse and discover posts from the community
- **Create Posts** - Share content with other developers
- **User Profiles** - View and manage your profile
- **Search** - Find posts and users
- **Image Support** - Upload and share images with posts

## Project Structure

```
src/
├── assets/        # Static resources (images, fonts)
├── components/    # Reusable UI components
│   ├── Header/
│   ├── PostsList/
│   └── SearchList/
├── contexts/      # React Context for state management
├── pages/         # Screen components
│   ├── Home/
│   ├── Login/
│   ├── NewPost/
│   ├── PostsUser/
│   ├── Profile/
│   └── Search/
├── routes/        # Navigation configuration
└── types/         # TypeScript type definitions
```

## Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

## Setup

1. Clone the repository

```bash
git clone https://github.com/rafaelfernandes98/DevPost.git
cd DevPost
```

2. Install dependencies

```bash
npm install
```

3. Install iOS dependencies (macOS only)

```bash
cd ios && pod install && cd ..
```

4. Configure Firebase

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication, Firestore, and Storage
   - Download the configuration files:
     - `google-services.json` for Android (place in `android/app/`)
     - `GoogleService-Info.plist` for iOS (place in `ios/`)

## Running the App

### Development Server

```bash
npm run dev
```

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

## Testing

```bash
npm test
```

## Linting

```bash
npm run lint
```

## License

This project is private and not licensed for public use.
