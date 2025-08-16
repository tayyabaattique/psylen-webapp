# Psylen - Mental Wellness Companion App 🌷

A lightweight, fully functional mental wellness web app designed to provide users with calming activities for stress, anxiety, and depression relief.

## Features ✨

- 🎨 **Doodle Canvas** - Creative expression with customizable brushes and colors
- 📝 **Journal System** - Write, edit, and save personal reflections
- 🧘 **Mindfulness Exercises** - Interactive breathing exercises and grounding techniques
  - Box breathing for general relaxation
  - 4-7-8 breathing for anxiety relief
  - Quick breathing for panic attacks
  - Stress relief breathing patterns
  - 5-4-3-2-1 grounding exercise with writing prompts
- 🌙 **Dark/Light Mode** - Comfortable viewing for any time of day
- 📱 **Mobile-First Design** - Optimized for phones, tablets, and desktop

## Technology Stack 🛠️

- **Frontend**: React, TypeScript, Tailwind CSS
- **UI Components**: Radix UI with shadcn/ui
- **Backend**: Express.js with TypeScript
- **Storage**: In-memory (perfect for lightweight deployment)
- **Build Tool**: Vite
- **Icons**: Lucide React

## Setup on Your Laptop 💻

### Prerequisites
1. **Node.js** (LTS version) - Download from [nodejs.org](https://nodejs.org)
2. **Git** - Download from [git-scm.com](https://git-scm.com)

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/psylen-app.git
   cd psylen-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   ```
   http://localhost:5000
   ```

## Deployment Options 🚀

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

### Option 2: Netlify
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub account
3. Select your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy!

### Option 3: Railway
1. Go to [railway.app](https://railway.app)
2. Connect GitHub
3. Select your repository
4. Auto-deploys on every push!

## Scripts 📜

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server

## Project Structure 📁

```
psylen-app/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # App pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities
├── server/                # Backend Express app
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data storage
├── shared/               # Shared types and schemas
└── README.md            # This file
```

## Mobile Usage 📱

The app is fully responsive and works perfectly on:
- ✅ iOS Safari
- ✅ Android Chrome
- ✅ All modern mobile browsers
- ✅ Tablets and desktop

Users can add it to their home screen for an app-like experience!

## Features in Detail 🔍

### Doodle Canvas
- Draw with finger or mouse
- Color picker and brush size controls
- Save drawings to device
- Clear canvas functionality

### Journal System
- Create, edit, delete entries
- Timestamps for all entries
- Clean, distraction-free writing interface

### Mindfulness Exercises
- **Interactive timers** for all breathing exercises
- **Visual breathing guides** with color changes
- **Writing prompts** for grounding exercises
- **Multiple techniques** for different situations

## Support 💚

This app is designed for people dealing with:
- Daily stress and overwhelm
- Anxiety and worry
- Depressive episodes
- Need for creative expression
- Desire for mindful moments

## License 📄

This project is for personal and educational use.

---

**Built with care for mental wellness and accessibility** 🌱