# TryndBuy — React Native Machine Test

> Virtual fashion try-on app built as a React Native assignment for TryndBuy.

---

## 📱 Screens

### Task 1 — Face Upload Flow

| Screen                  | Description                                           |
| ----------------------- | ----------------------------------------------------- |
| **Splash**              | Logo animation, auto-navigates after 2.5 s            |
| **Intro**               | App overview + "Get Started" CTA                      |
| **Selfie Selection**    | Camera or Gallery picker                              |
| **Camera / Liveliness** | Image preview + simulated 3-step liveliness check     |
| **Upload Progress**     | Animated progress bar (0 → 100%) with step indicators |

### Task 2 — Landing Page

| Screen          | Description                                                                                               |
| --------------- | --------------------------------------------------------------------------------------------------------- |
| **My Wardrobe** | Model preview (left) + 2-column SKU grid (right). Drawer + category chips. Pull-to-refresh, toast on tap. |
| **My Profile**  | Placeholder profile with stats                                                                            |
| **Friends**     | Friends list placeholder                                                                                  |

---

## 🗂️ Folder Structure

```
src/
├── assets/          # Images, fonts
├── components/      # Reusable UI components
│   ├── CategoryChips.tsx
│   ├── CustomDrawerContent.tsx
│   ├── ErrorView.tsx
│   ├── SKUCard.tsx
│   └── SkeletonCard.tsx
├── hooks/
│   └── useSKUs.ts   # Data fetching & category filter hook
├── navigation/
│   ├── BottomTabNavigator.tsx
│   ├── DrawerNavigator.tsx
│   └── RootNavigator.tsx
├── screens/
│   ├── SplashScreen.tsx
│   ├── IntroScreen.tsx
│   ├── SelfieSelectionScreen.tsx
│   ├── CameraScreen.tsx
│   ├── UploadProgressScreen.tsx
│   ├── MyWardrobeScreen.tsx
│   ├── MyProfileScreen.tsx
│   └── FriendsScreen.tsx
├── services/
│   └── api.ts       # API service layer
├── theme/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   └── index.ts
└── utils/
    ├── types.ts
    └── toastConfig.tsx
```

---

## 🚀 Setup & Run

### Prerequisites

- Node.js >= 18
- React Native CLI
- Android Studio + SDK **or** Xcode (macOS only)

### Install

```bash
yarn install
```

### Android

```bash
yarn android
```

### iOS

```bash
cd ios && pod install && cd ..
yarn ios
```

---

## 🔌 API

| Field       | Value                                                  |
| ----------- | ------------------------------------------------------ |
| Endpoint    | `GET https://t03.tryndbuy.com/api/GetMappedSKUDetails` |
| Auth header | `authID: 3c643a25e11144ad`                             |
| Image URL   | `https://demo03.tryndbuy.com/images/Th{SKUID}.jpg`     |

---

## 🧪 Tech Stack

- **React Native CLI** + **TypeScript**
- **@react-navigation** (native-stack, bottom-tabs, drawer)
- **react-native-image-picker** — camera & gallery
- **react-native-toast-message** — custom toasts
- **React Native Animated API** — progress bar, skeleton loader, splash animations
- **react-native-gesture-handler** and **react-native-reanimated** — drawer gestures

---

## ✅ Acceptance Criteria

### Task 1

- [x] Camera opens via `launchCamera()`
- [x] Gallery opens via `launchImageLibrary()`
- [x] Liveliness check simulated (3-step, always success)
- [x] Upload progress simulated (0 → 100%, 3 s)
- [x] Redirect to landing page on completion

### Task 2

- [x] API data fetched with auth header
- [x] Images loaded via SKUID URL
- [x] 2-column `FlatList` (numColumns=2)
- [x] Scroll works (FlatList)
- [x] Toast shows SKUID on item tap
- [x] Drawer category filter (All / Dresses / Tops / Pants / Jeans)
- [x] Bottom tabs (Wardrobe / Profile / Friends)

---

## 🎁 Bonus Features Implemented

- [x] Skeleton loader while fetching
- [x] Pull to refresh
- [x] TypeScript throughout
- [x] ESLint + Prettier configured
- [x] Clean README

---
