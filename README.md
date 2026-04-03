# FinOps Dash

An intelligent Cloud Infrastructure Cost Management (FinOps) mobile dashboard built with **React Native** and **Expo**. This app allows developers and Ops teams to track infrastructure spending by simply pasting invoice logs or text, which is then parsed into actionable financial insights.



## 🌟 Key Features

- **Smart Input Parser**: Uses advanced Regex heuristics to extract BRL (R$) values and providers (AWS, Google Cloud, Vercel, etc.) from unstructured text.
- **Real-time Analytics**: Calculates **Burn Rate per Hour** based on a 720-hour commercial month.
- **Data Categorization**: Automatically groups expenses into categories like **Infra**, **Database**, **AI**, and **DevOps**.
- **Visual Insights**: Integrated SVG-based charts to visualize cost distribution.
- **Persistent Storage**: Offline-first approach using **Zustand** and **AsyncStorage**.
- **Modern UI**: Dark-themed "Ops" interface built with **NativeWind v4** (Tailwind CSS).

## 🛠️ Tech Stack

- **Framework**: Expo (SDK 54)
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: NativeWind v4 (Tailwind CSS)
- **Icons**: Lucide React Native
- **Storage**: AsyncStorage
- **Charts**: React Native SVG


## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Expo Go app on your mobile device

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GabsFerrarii/finops-dash.git

2. Install dependencies:
    ``` bash
    npm install

3. Start the development server:
    ``` bash
    npx expo start

4. Scan the QR Code with your Expo Go app (Android) or Camera (iOS).