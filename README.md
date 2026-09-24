# Smart Fuel Optimization System

A modern management & optimization dashboard built with Vite, React, and Tailwind CSS.

## 🚀 Tech Stack

- **React** 19.1.1
- **Vite** 7.1.7
- **Tailwind CSS** 3.4.18
- **PostCSS** & **Autoprefixer**

## 📦 Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

## 🛠️ Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:8001`

## 🧰 Development Tools Used

- **IDE / Code Editor:** Visual Studio Code (VS Code)
- **Frontend Framework:** React 19 & Vite 7
- **Styling:** Tailwind CSS 3
- **Backend Framework:** Node.js & Express.js
- **Database:** MongoDB
- **API Client:** Postman / Thunder Client

## 📦 Submission Requirement

You must submit a `.zip` / `.rar` or compressed folder containing all necessary files required to run your project prototype (Frontend Code, Backend Code, Database models/scripts & Documentation).

## 🏗️ Build

Build for production:

```bash
npm run build
```

## 👀 Preview

Preview the production build:

```bash
npm run preview
```

## 🎨 Tailwind CSS

This project uses **Tailwind CSS version 3** (not version 4). The configuration is in `tailwind.config.js`.

### Customizing Tailwind

Edit `tailwind.config.js` to customize your design system:

```js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Add your custom colors, fonts, etc.
    },
  },
  plugins: [],
};
```

## 📁 Project Structure

```
├── public/           # Static assets
├── src/
│   ├── assets/       # Images, icons, etc.
│   ├── App.jsx       # Main App component
│   ├── main.jsx      # Entry point
│   └── index.css     # Tailwind directives
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 📝 Notes

- The project uses ES modules (`"type": "module"` in package.json)
- Hot Module Replacement (HMR) is enabled for fast development
- Tailwind CSS 3 is configured with PostCSS and Autoprefixer

Happy coding! 🎉
