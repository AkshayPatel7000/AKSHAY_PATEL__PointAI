Below is a **structured Development Document** you can directly give to a coding agent (or use as a technical blueprint). It is written in implementation-ready format with explicit requirements, architecture decisions, API contracts, navigation flow, and acceptance criteria.

---

# 📘 React Native Machine Test

## Development Specification Document

Reference: Assignment PDF 

---

# 1. Project Overview

Build a React Native mobile application consisting of:

### Task 1 — Static Flow + Face Upload Simulation

* Splash screen
* Introduction screen
* Selfie selection (Camera / Gallery)
* Camera capture screen
* Liveliness check simulation
* Upload progress simulation
* Redirect to landing page

⚠ No backend required for Task 1.

---

### Task 2 — Landing Page with API Integration

* Fetch SKU data from API
* Display images using SKUID
* 2-column scrollable layout
* Show toast on item click
* Bottom tab navigation (3 tabs)
* Drawer-based category selection

---

# 2. Technical Stack

### Core

* React Native CLI (preferred) OR Expo
* JavaScript (or TypeScript preferred)

### Navigation

* @react-navigation/native
* @react-navigation/native-stack
* @react-navigation/bottom-tabs
* @react-navigation/drawer

### Media Handling

* react-native-image-picker

### Toast

* react-native-toast-message (cross platform)

### Animation

* React Native Animated API

---

# 3. App Architecture

## 3.1 Navigation Structure

```
RootStack
 ├── SplashScreen
 ├── IntroScreen
 ├── SelfieSelectionScreen
 ├── CameraScreen
 ├── UploadProgressScreen
 └── MainApp (Drawer)

MainApp (Drawer)
 ├── HomeTabs
 │     ├── MyWardrobe
 │     ├── MyProfile
 │     └── Friends
 └── CategoryFilterScreen
```

---

## 3.2 Folder Structure

```
src/
 ├── navigation/
 ├── screens/
 ├── components/
 ├── services/
 ├── hooks/
 ├── utils/
 └── assets/
```

---

# 4. Functional Requirements

---

# TASK 1 — FACE UPLOAD FLOW

## 4.1 Splash Screen

### Behavior

* Display logo/image
* Auto navigate to IntroScreen after 2 seconds

### Acceptance Criteria

* No user interaction required
* Uses navigation.replace()

---

## 4.2 Intro Screen

### UI

* Static image
* Short description
* Continue button

### Behavior

* On press → navigate to SelfieSelectionScreen

---

## 4.3 Selfie Selection Screen

### UI

* Two buttons:

  * Capture from Camera
  * Pick from Gallery

### Functional Logic

#### Camera

Use:

```js
launchCamera()
```

#### Gallery

Use:

```js
launchImageLibrary()
```

### Acceptance Criteria

* Image selected successfully
* Image stored in local state
* Navigate to CameraScreen or UploadProgressScreen

---

## 4.4 Camera Capture Screen

### Features

* Show selected image preview
* Simulate liveliness check

### Liveliness Simulation

* 2 second delay
* Show checking animation
* Always return success (mock)

### Acceptance Criteria

* Show loading state
* Show success state
* Navigate to UploadProgressScreen

---

## 4.5 Upload Progress Screen

### Behavior

* Simulate upload progress from 0% → 100%
* Duration: 3 seconds

### Implementation

Use Animated.Value

### On Completion

* Navigate to MainApp (Landing Page)

---

# TASK 2 — LANDING PAGE

---

# 5. API Integration

## 5.1 Endpoint

```
GET https://t03.tryndbuy.com/api/GetMappedSKUDetails
Header:
authID: 3c643a25e11144ad
```

(From page 2 of assignment )

---

## 5.2 Response Format

```
{
  MappedSKUList: [
    {
      SKUID: number,
      Gender: string,
      Cat: string
    }
  ]
}
```

---

## 5.3 Image URL Format

```
https://demo03.tryndbuy.com/images/Th${item.SKUID}.jpg
```

---

# 6. Landing Screen Requirements

## 6.1 Layout

### Left Section

* Model preview image (static)

### Right Section

* 2 column scrollable list of SKUs

Use:

```
FlatList
numColumns = 2
```

---

## 6.2 On Item Click

* Show toast
* Display SKUID

---

## 6.3 Category Filtering (Drawer)

Drawer should include:

* Dresses
* Tops
* Pants
* Jeans

Filter logic:

```
filteredData = data.filter(item => item.Cat === selectedCategory)
```

---

# 7. Bottom Tabs

Tabs:

* MyWardrobe
* MyProfile
* Friends

Each tab:

* Placeholder screen
* Icon + Label

---

# 8. State Management

Use:

* useState
* useEffect

No external state management required.

---

# 9. Error Handling

* Show loading spinner while fetching API
* Show error message if API fails
* Retry option (optional)

---

# 10. Non-Functional Requirements

* Clean component separation
* Reusable SKUItem component
* Responsive layout
* Proper keyExtractor in FlatList
* Avoid inline heavy functions
* Handle Android permissions

---

# 11. Acceptance Criteria Checklist

### Task 1

☑ Camera opens
☑ Gallery opens
☑ Liveliness simulated
☑ Upload progress simulated
☑ Redirect to landing page

### Task 2

☑ API data fetched
☑ Images loaded correctly
☑ 2 column layout
☑ Scroll works
☑ Toast shows SKUID
☑ Drawer filters category
☑ Bottom tabs implemented

---

# 12. Deliverables

As per assignment :

* GitHub repository
* Working Android APK

---

# 13. Performance Considerations

* Use FlatList instead of ScrollView for SKU grid
* Memoize SKUItem with React.memo
* Avoid re-rendering entire list on filter

---

# 14. Optional Enhancements (Bonus Points)

* Pull to refresh
* Skeleton loader
* TypeScript
* ESLint + Prettier
* Clean README documentation

---

# 15. Coding Agent Instructions Summary

The coding agent must:

1. Create navigation architecture first
2. Implement Task 1 flow fully before Task 2
3. Isolate API logic inside services/api.js
4. Build reusable SKUItem component
5. Ensure Android build works
6. Produce production-ready folder structure
7. Avoid hardcoding category logic

---

If you want, I can also provide:

* A GitHub README template
* A project setup script
* A fully structured TypeScript version
* A prompt specifically optimized for AI coding agents (Cursor / Copilot / Claude Code)
