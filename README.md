# 💕 Tinder Swipe App

A modern, responsive Tinder-style swipe application built with Next.js 15, TypeScript, Redux Toolkit, and Framer Motion. Features smooth swipe animations, profile management, and a beautiful mobile-first design.

![Tinder Swipe App](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.9.0-purple?style=for-the-badge&logo=redux)

## ✨ Features

### 🎯 Core Functionality
- **Swipeable Cards**: Smooth swipe animations with Framer Motion
- **Profile Management**: Like, skip, and undo actions
- **Match System**: Mock compatibility percentage calculation
- **Profile Details**: Comprehensive profile modals with detailed information
- **Liked Users Page**: View and manage all liked profiles

### 📱 Mobile-First Design
- **Responsive Layout**: Optimized for mobile and desktop
- **Touch Gestures**: Native swipe interactions
- **Bottom Navigation**: Fixed bottom bar with action buttons
- **Safe Areas**: Proper handling of mobile safe areas

### 🎨 UI/UX Features
- **ShadCN Components**: Modern, accessible UI components
- **Toast Notifications**: User feedback with Sonner
- **Loading States**: Skeleton loaders and loading indicators
- **Confirmation Modals**: Safe delete operations
- **High-Quality Images**: Optimized image loading with Next.js Image

### 🔧 Technical Features
- **State Management**: Redux Toolkit with persistence
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized with Next.js 15 features
- **Code Organization**: Modular component structure

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tinder-swipe-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── liked/             # Liked users page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── cards/            # Card-related components
│   │   ├── ProfileCard.tsx
│   │   ├── ProfileModal.tsx
│   │   ├── LikedUserCard.tsx
│   │   ├── LikedUsersList.tsx
│   │   └── ProfileSwipeStack.tsx
│   ├── navigation/       # Navigation components
│   │   └── BottomBar.tsx
│   ├── common/          # Common/reusable components
│   │   ├── ClientBadge.tsx
│   │   ├── ClientLikedBadge.tsx
│   │   ├── LikedPageSkeleton.tsx
│   │   └── UndoButton.tsx
│   ├── ui/              # ShadCN UI components
│   └── Providers.tsx    # App providers
├── constants/           # App constants
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── store/              # Redux store and slices
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🎮 Usage

### Swiping
- **Swipe Right**: Like a profile
- **Swipe Left**: Skip a profile
- **Undo**: Reverse the last action
- **View Profile**: Open detailed profile modal

### Navigation
- **Home**: Main swipe interface
- **Liked Page**: View all liked profiles
- **Profile Modal**: Detailed profile information

### Actions
- **Like**: Add profile to matches
- **Skip**: Move to next profile
- **Undo**: Reverse last swipe action
- **Remove**: Remove from liked profiles
- **Clear All**: Remove all liked profiles

## 🛠️ Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library

### State Management
- **Redux Toolkit**: Predictable state container
- **React Redux**: React bindings for Redux
- **localStorage**: Data persistence

### UI Components
- **ShadCN UI**: Modern component library
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icons
- **Sonner**: Toast notifications

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixes

## 📊 Data Source

The app uses the [Random User API](https://randomuser.me/) to fetch Indian user profiles with:
- Profile pictures
- Names and ages
- Location information
- Generated bios and interests
- Mock compatibility scores

## 🎨 Design System

### Colors
- **Primary**: Pink to Red gradient
- **Secondary**: Blue accents
- **Neutral**: Gray scale
- **Success**: Green
- **Warning**: Yellow
- **Error**: Red

### Typography
- **Font**: Geist Sans (primary), Geist Mono (code)
- **Sizes**: Responsive text scaling
- **Weights**: Regular, medium, semibold, bold

### Spacing
- **Mobile**: Compact spacing for small screens
- **Desktop**: Generous spacing for larger screens
- **Consistent**: 4px base unit system

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific configuration:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://randomuser.me/api

# App Configuration
NEXT_PUBLIC_APP_NAME=Tinder Swipe App
```

### Next.js Configuration
The app is configured with:
- Image optimization for Random User API
- WebP and AVIF format support
- Responsive image sizing
- 30-day cache TTL

## 📱 Mobile Optimization

### Touch Interactions
- **Swipe Gestures**: Native touch handling
- **Touch Action**: Optimized for mobile performance
- **Safe Areas**: Proper mobile safe area handling

### Performance
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Components load as needed
- **Code Splitting**: Automatic route-based splitting

### Responsive Design
- **Breakpoints**: Mobile-first approach
- **Flexible Layouts**: Adapts to all screen sizes
- **Touch Targets**: Properly sized for mobile

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Additional Commands
npm run type-check   # TypeScript type checking
```

### Code Quality
- **ESLint**: Configured for Next.js and TypeScript
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting (if configured)

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Random User API](https://randomuser.me/) for profile data
- [ShadCN UI](https://ui.shadcn.com/) for beautiful components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Next.js](https://nextjs.org/) for the amazing framework
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Review the code comments

---

**Made with ❤️ using Next.js, TypeScript, and modern web technologies**