# 🎬 Movie App - Your Ultimate Film Discovery Platform

<div align="center">

![Nuxt.js](https://img.shields.io/badge/Nuxt.js-00DC82?style=for-the-badge&logo=nuxt.js&logoColor=white)
![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

*A modern, feature-rich movie discovery application built with Nuxt 3, Vue 3, and TypeScript*

[🚀 Live Demo](https://movie-app-uy5o.vercel.app/) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## 📖 About This Project

The **MovieApp** was developed as a **practice project** during our time at **Pentalog Brasov**, where we collaborated with fellow students to build a full-stack web application. The project served as an excellent opportunity to apply modern web development concepts, work in a team environment, and gain hands-on experience with cutting-edge technologies.

### 🎯 Project Goals
- **Learning Experience**: Master Nuxt 3, Vue 3, and TypeScript in a real-world context
- **Team Collaboration**: Work effectively with other students on a shared codebase
- **Full-Stack Development**: Build both frontend and backend components
- **Modern Architecture**: Implement best practices and modern development patterns
- **User Experience**: Create an intuitive and beautiful movie discovery platform

### 🤝 Collaborative Development
This project was developed in collaboration with other students at Pentalog Brasov, where we:
- **Shared knowledge** and learned from each other's expertise
- **Divided responsibilities** based on individual strengths and interests
- **Code reviewed** each other's work to ensure quality and consistency
- **Problem-solved together** when facing technical challenges
- **Presented our work** to demonstrate our learning outcomes

---

## ✨ Features

### 🎯 Core Functionality
- **🎬 Movie Discovery**: Browse thousands of movies with real-time search
- **⭐ Favorites System**: Save and manage your favorite movies with Supabase backend
- **🔍 Advanced Search**: Search by title, genre, and various criteria
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **⚡ Real-time Updates**: Instant search results and dynamic filtering

### 🎨 User Experience
- **🎭 Movie Details**: Comprehensive movie information with trailers and images
- **📊 Smart Sorting**: Sort by popularity, rating, release date, and more
- **🎪 Genre Filtering**: Filter movies by specific genres
- **🔄 Pagination**: Smooth navigation through large movie collections
- **💫 Loading States**: Elegant skeleton loaders and loading animations

### 🔧 Technical Features
- **🔐 Authentication**: Secure user authentication with Supabase
- **📸 Image Optimization**: Optimized movie posters and backdrops
- **🎥 Video Integration**: Movie trailers and video content
- **📱 PWA Ready**: Progressive Web App capabilities
- **🌙 Dark Theme**: Modern dark interface design

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Nuxt 3** | Full-stack Vue framework with SSR |
| **Vue 3** | Progressive JavaScript framework |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first CSS framework |
| **Supabase** | Backend-as-a-Service (Auth & Database) |
| **Pinia** | State management for Vue |
| **Nuxt Image** | Image optimization and processing |
| **Vue Router** | Client-side routing |

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- TMDB API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Raresssm/movie-app.git
   cd movie-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Supabase Configuration
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   
   # TMDB API Configuration
   API_KEY=your_tmdb_api_key
   
   # App Configuration
   NUXT_PUBLIC_BASE_URL=https://api.themoviedb.org/3/
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

---

## 📁 Project Structure

```
movie-app/
├── 📁 components/          # Vue components
│   ├── 🎬 MovieCard.vue
│   ├── 🔍 SearchBar.vue
│   ├── ⭐ FavoriteMovie.vue
│   ├── 📊 MovieRating.vue
│   ├── 🎪 TrailerModal.vue
│   └── ... (other components)
├── 📁 pages/              # Application pages
│   ├── 🏠 index.vue       # Home page
│   ├── 🎭 movie/[id]/     # Movie details
│   ├── ⭐ favorites/       # Favorites page
│   ├── 🔐 login/          # Authentication
│   └── 📝 register/       # User registration
├── 📁 server/             # API routes
│   └── 📁 api/            # Backend endpoints
├── 📁 composables/        # Vue composables
│   └── useMovies.ts       # Movie state management
├── 📁 types/              # TypeScript definitions
└── 📁 middleware/         # Route middleware
```

---

## 🎯 Key Features Explained

### 🎬 Movie Discovery
- **Real-time Search**: Instant search results as you type
- **Advanced Filtering**: Filter by genre, sort by various criteria
- **Pagination**: Navigate through large movie collections
- **Movie Details**: Comprehensive information including trailers and images

### ⭐ Favorites System
- **User Authentication**: Secure login/register with Supabase
- **Personal Favorites**: Save and manage your favorite movies
- **Persistent Storage**: Favorites saved to your account
- **Quick Access**: Dedicated favorites page

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on all devices
- **Dark Theme**: Easy on the eyes with modern aesthetics
- **Loading States**: Smooth loading animations and skeleton loaders
- **Interactive Elements**: Hover effects and smooth transitions

---

## 🔧 API Integration

### TMDB API
The app integrates with The Movie Database (TMDB) API for:
- Movie search and discovery
- Movie details and metadata
- Movie trailers and videos
- Movie images and posters
- Genre information

### Supabase Integration
- **Authentication**: User registration and login
- **Database**: Store user favorites and preferences
- **Real-time**: Live updates for collaborative features

---

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow Vue 3 Composition API patterns
- Use TypeScript for type safety
- Follow Tailwind CSS utility-first approach
- Write meaningful commit messages
- Test your changes thoroughly

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **TMDB** for providing the movie database API
- **Supabase** for backend-as-a-service
- **Nuxt Team** for the amazing framework
- **Vue.js Team** for the progressive JavaScript framework
- **Tailwind CSS** for the utility-first CSS framework

---

## 📞 Support

If you have any questions or need help:

- 📧 **Email**: lungurares4@gmail.com

---

<div align="center">



⭐ **Star this repository if you found it helpful!**

</div>
