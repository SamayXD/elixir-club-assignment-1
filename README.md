# ⚗️ Elixir Club

Submission for SWE Intern (Mobile) Assignment at joinelixir.club

# Screenshots
| ![Image 8](https://github.com/user-attachments/assets/3867379b-3f32-4150-811c-dbaac4fa5465) | ![Image 7](https://github.com/user-attachments/assets/edb2cfde-96de-4780-95b0-12049839655e) | ![Image 6](https://github.com/user-attachments/assets/3c97233e-5549-49d4-a916-4decf959e58c) | ![Image 5](https://github.com/user-attachments/assets/3760f17d-3288-411a-a68f-9e696cc75e04) |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| ![Image 4](https://github.com/user-attachments/assets/1419f0e7-4bc8-4859-8b2d-f37f202cb533) | ![Image 3](https://github.com/user-attachments/assets/2fa36fba-91e4-402d-b250-09076a740ac0) | ![Image 2](https://github.com/user-attachments/assets/8db661d7-9542-4586-93be-04c748cb0c44) | ![Image 1](https://github.com/user-attachments/assets/839323e4-9c74-440a-8b15-a48e4fe6d4c4) |

# Video (Github Upload)

https://github.com/user-attachments/assets/21deeccc-9200-41fd-ad70-d5e10bfcb2a2



# Video (Youtube Upload)
[![Watch the video](https://img.youtube.com/vi/9reb6gdKkvs/hqdefault.jpg)](https://www.youtube.com/watch?v=9reb6gdKkvs)

*click to watch on Youtube

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### ✅ Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Android Studio or Xcode (for running on emulators/devices)

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/elixir-club.git
cd elixir-club
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npx expo start -c
```

> Requires macOS with Xcode installed

---

## 📁 Folder Structure

```
elixir-club/
├── .expo/                      # Expo-specific files
├── android/                    # Android native project files
├── app/
│   ├── screens/
│   │   ├── HomeScreen.jsx
│   │   ├── LoginScreen.jsx
│   │   ├── _layout.jsx         # Expo Router layout
│   │   └── index.jsx
│   ├── assets/
│   │   ├── adaptive-icon.png
│   │   ├── elixir-bg.png
│   │   ├── elixir-logo.png
│   │   ├── elixir-onboard-1.png
│   │   ├── favicon.png
│   │   ├── icon.png
│   │   └── splash-icon.png
│   ├── components/
│   │   ├── OTPVerification.jsx
│   │   ├── PhoneNumberInput.jsx
│   │   └── UserDetails.jsx
├── ios/                        # iOS native project files
├── node_modules/               # Node packages
├── utils/
│   ├── api/                    # API logic
│   ├── constants/              # Static constants (e.g., colors, dimensions)
│   └── fonts/                  # Custom font files
├── .gitignore
├── App.js                      # Main App file (legacy entry)
├── app.json                    # Expo app config
├── babel.config.js             # Babel config
├── eas.json                    # EAS build config
├── index.js                    # Entry point (linked to Expo Router)
├── package-lock.json
└── package.json
```


---

## 📦 Build Info

- This app uses a **FAT APK** to support all architectures (not platform-specific).
- New architecture (Fabric + TurboModules) is **disabled** to support `react-native-reanimated` and ensure animation stability.
- The app is built with the following Android configurations:

```
buildTools:   35.0.0
minSdk:       24
compileSdk:   35
targetSdk:    35
ndk:          27.1.12297006
kotlin:       2.0.21
ksp:          2.0.21-1.0.28
```

---

## 🧱 Tech Stack

- **React Native 0.79.2**
- **Expo SDK 53**
- **Expo Router 5**
- **TypeScript 5**
- **Reanimated 3.17**
- **Victory Native for charts**

---

