# University Course Scheduler

A modern, interactive course scheduling application built with React, Vite, and Tailwind CSS.

## Features

- **📅 Interactive Scheduler**: Visual timetable with drag-and-drop course management
- **📚 Course Catalog**: Browse and select from available courses
- **🏢 Classroom Availability**: Check room availability across campus
- **🤖 AI Assistant**: Floating chat box for future AI integration
- **📱 Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/university-scheduler.git
   cd university-scheduler
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## Project Structure

```
src/
├── components/          # Shared UI components
│   ├── Navbar.jsx      # Main navigation
│   ├── Card.jsx        # Reusable card component
│   └── AIChatBox.jsx   # Floating AI chat interface
├── features/           # Feature-specific components
│   ├── scheduler/      # Course scheduling functionality
│   ├── courses/        # Course catalog and selection
│   └── classrooms/     # Classroom availability
├── data/               # Static data files
│   ├── courses.js      # Course information
│   └── buildings.js    # Building/room data
├── App.jsx             # Main application component
└── main.jsx            # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Contact

For questions or collaboration requests, please reach out to the repository owner.
