# GradTrack - AI Productivity Assistant

An AI-powered productivity assistant for college students that helps track study habits, fitness, and goals through an intuitive chat-based interface.

## Features

- **Modern Chat Interface**: Clean, ChatGPT-style conversational UI with intelligent responses
- **Visual Components**: Interactive charts, stat cards, and progress tracking
- **Backend Integration**: FastAPI backend with graceful fallback to mock data
- **Responsive Design**: Built with Tailwind CSS for mobile and desktop
- **Sidebar Navigation**: Profile section with placeholders for stats and settings
- **Message Display**: User and AI messages with timestamps and avatars
- **Auto-resizing Input**: Smart textarea that grows with your message
- **Keyboard Shortcuts**: Press Enter to send, Shift+Enter for new line
- **Loading States**: Visual feedback while waiting for responses
- **Smart Data Fetching**: Automatic API calls with caching and timeout handling

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Hooks (useState, useCallback)

### Backend
- **Framework**: FastAPI (Python)
- **Server**: Uvicorn
- **Validation**: Pydantic
- **API**: RESTful endpoints with CORS support

## Project Structure

```
gradtrack-app/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Main page (integrates Sidebar + ChatInterface)
│   └── globals.css             # Global styles
├── components/
│   ├── chat/
│   │   ├── ChatInterface.tsx   # Main chat container with quick actions
│   │   ├── ChatMessage.tsx     # Renders messages with visual components
│   │   ├── ChatInput.tsx       # Message input with send button
│   │   └── Sidebar.tsx         # Left sidebar with profile/stats
│   └── ui/
│       ├── StatCard.tsx        # Stat display card component
│       ├── ProgressChart.tsx   # Recharts wrapper for bar/line charts
│       └── GoalCard.tsx        # Goal progress display component
├── hooks/
│   └── useChat.ts              # Async chat state management
├── lib/
│   ├── types.ts                # TypeScript type definitions
│   ├── utils.ts                # Utility functions (cn, generateId)
│   ├── apiClient.ts            # API client with fallback and caching
│   └── responseGenerator.tsx   # Async response generation with API calls
├── data/
│   └── mockData.ts             # Mock data (fallback when backend offline)
├── .env.local                  # Environment variables (backend URL)
└── public/                     # Static assets
```

## Getting Started

### Prerequisites

- **Frontend**: Node.js 18.x or higher, npm or yarn
- **Backend**: Python 3.9+ (tested on Python 3.13)

### Quick Start (Frontend Only)

If you want to run the frontend without the backend, it will automatically use mock data:

1. **Navigate to the project directory**:
   ```bash
   cd gradtrack-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

The app will work with fallback mock data when the backend is not available.

### Running with Backend (Recommended)

To get the full experience with live API integration, run both frontend and backend servers:

#### Terminal 1 - Backend Server

1. **Navigate to the backend directory**:
   ```bash
   cd ../backend
   ```

2. **Install Python dependencies** (one-time setup):
   ```bash
   pip3 install -r requirements.txt
   ```

3. **Start the FastAPI server**:
   ```bash
   python3 -m uvicorn app.main:app --reload --port 8000
   ```

   You should see:
   ```
   INFO:     Uvicorn running on http://127.0.0.1:8000
   INFO:     Application startup complete.
   ```

4. **Verify backend is running**:
   Open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) to see the interactive API documentation.

#### Terminal 2 - Frontend Server

1. **Navigate to the frontend directory**:
   ```bash
   cd gradtrack-app
   ```

2. **Ensure environment is configured**:
   The `.env.local` file should already exist with:
   ```
   NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Test the integration**:
   - Try asking "Show my study progress"
   - Try "How's my gym consistency?"
   - Check the browser console for `[APIClient]` logs showing successful API calls
   - If the backend is offline, you'll see fallback logs and mock data will be used

### Available Scripts

- `npm run dev` - Start development server (with hot reload)
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run lint` - Run ESLint

## Current Implementation Status

### ✅ Completed

**Module 1 - Chat UI Prototype**
- [x] Next.js 15 project setup with TypeScript
- [x] Tailwind CSS configuration
- [x] Modular component architecture
- [x] Chat interface layout
- [x] Sidebar with profile section
- [x] Message display (user & assistant)
- [x] Message input with auto-resize
- [x] Chat state management hook
- [x] Responsive design
- [x] Welcome screen with quick actions

**Module 2 - Mock Data + Response Logic**
- [x] Mock data for study hours, gym attendance, goals
- [x] Visual response components (StatCard, ProgressChart, GoalCard)
- [x] Intelligent keyword-based response generation
- [x] Quick action buttons for common queries
- [x] Recharts integration (bar and line charts)
- [x] Goal progress tracking UI

**Module 3 - Backend Integration**
- [x] FastAPI backend with 5 REST endpoints
- [x] Pydantic models matching frontend types
- [x] CORS configuration for local development
- [x] API client with timeout and caching
- [x] Automatic fallback to mock data
- [x] Async response generation with API calls
- [x] Environment-based backend URL configuration
- [x] Error handling and graceful degradation

### 🚧 Coming Next (Phase 3+)
- [ ] Database integration (Supabase/PostgreSQL)
- [ ] User authentication and multi-user support
- [ ] Subject-specific study tracking
- [ ] Workout type tracking for fitness
- [ ] Calendar integration for deadlines
- [ ] Message streaming for real-time responses
- [ ] AI agent integration (LangChain/CrewAI)

### 📋 Future Phases
- [ ] External integrations (Google Calendar, Toggl, Notion)
- [ ] Advanced analytics dashboard
- [ ] Study session timer with Pomodoro technique
- [ ] Habit tracking and streaks
- [ ] Goal recommendations based on progress
- [ ] Export reports (PDF, CSV)
- [ ] Mobile app (React Native)

## Key Components

### Frontend Components

#### ChatInterface
Main chat container that manages the conversation flow, displays messages, handles scrolling, and provides quick action buttons for common queries.

#### ChatMessage
Renders individual messages with support for:
- Text content
- Visual components (charts, stat cards, goals)
- User/AI avatar distinction
- Timestamp display
- Proper styling for message roles

#### ChatInput
Smart input field featuring:
- Auto-resizing textarea
- Send button with gradient styling
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- Disabled state during loading

#### Sidebar
Left navigation panel with:
- User profile section
- Stats placeholders (for future analytics)
- Settings button

#### Visual Components
- **StatCard**: Displays key metrics with icons, values, trends, and color coding
- **ProgressChart**: Recharts wrapper supporting bar and line charts with custom tooltips
- **GoalCard**: Shows goal progress with progress bars and deadline information

### Core Utilities

#### useChat Hook
Custom React hook managing:
- Message state
- Loading state
- **Async** send message functionality with API integration
- Error handling with user-friendly messages
- Clear messages functionality

#### apiClient
Centralized API client with:
- **Automatic fallback** to mock data when backend is offline
- **Request timeout** handling (10-second default)
- **In-memory caching** with TTL (1-minute default)
- Environment-based backend URL configuration
- Console logging for debugging

#### generateResponse
Async response generator that:
- Matches user queries to appropriate handlers via keywords
- Fetches data from backend API endpoints
- Constructs visual responses with charts and stat cards
- Falls back to mock data on API failure
- Returns default help message for unmatched queries

### Backend Architecture

The FastAPI backend provides 5 RESTful endpoints:

- `GET /health` - Health check endpoint
- `GET /api/study/hours?period=7d` - Study hours data with totals and averages
- `GET /api/study/subjects` - Subject-wise study progress
- `GET /api/fitness/attendance?period=7d` - Gym attendance with rates
- `GET /api/goals?status=active` - Goals list with completion rates
- `GET /api/weekly` - Combined weekly summary

All responses use Pydantic models for validation and match the frontend TypeScript types.

## Design Decisions

1. **Graceful Degradation**: The app works perfectly with or without the backend. If the backend is offline, the API client automatically falls back to mock data with console warnings. This ensures the app is always functional during development.

2. **Modular Components**: Each component is self-contained and reusable. Visual components (StatCard, ProgressChart, GoalCard) are designed to be used across different response types.

3. **Type Safety**: Full TypeScript coverage on the frontend with Pydantic models on the backend ensures type consistency across the entire stack. API response types match exactly between frontend and backend.

4. **Async-First Architecture**: The response generation system is fully async to support API calls without blocking the UI. Loading states provide visual feedback during data fetching.

5. **Keyword-Based Routing**: User queries are matched to appropriate handlers via keyword detection. This approach is simple, fast, and easy to extend with new query types.

6. **Caching Strategy**: API responses are cached for 1 minute to reduce redundant requests and improve perceived performance. The cache is automatically invalidated after the TTL expires.

7. **Client Components**: Using `"use client"` directive for interactive components. This is necessary for Recharts which requires browser APIs.

8. **CORS Configuration**: Backend explicitly allows localhost:3000 and :3001 for development flexibility.

## Customization

### Changing Colors
Modify the gradient colors in:
- [components/chat/Sidebar.tsx](components/chat/Sidebar.tsx) - Profile avatar
- [components/chat/ChatMessage.tsx](components/chat/ChatMessage.tsx) - Message avatars
- [components/chat/ChatInput.tsx](components/chat/ChatInput.tsx) - Send button
- [components/ui/StatCard.tsx](components/ui/StatCard.tsx) - Icon backgrounds and colors

### Adding New Query Types
To add a new query type:
1. Add mock data in [data/mockData.ts](data/mockData.ts)
2. Create backend endpoint in [../backend/app/main.py](../backend/app/main.py)
3. Add response interface in [lib/responseGenerator.tsx](lib/responseGenerator.tsx)
4. Add new entry to `responseMap` with keywords and async generator

### Configuring Backend URL
Change the backend URL in [.env.local](.env.local):
```
NEXT_PUBLIC_BACKEND_URL=http://your-backend-url:port
```

### Adjusting Cache TTL
Modify cache duration in [lib/apiClient.ts](lib/apiClient.ts):
```typescript
private defaultCacheTTL: number = 60000; // Change to desired milliseconds
```

## Troubleshooting

### Port Already in Use
If port 3000 is occupied, Next.js will automatically try port 3001, 3002, etc. Make sure to update CORS settings in the backend if using a different port.

### Backend Connection Issues
1. **Check backend is running**: Visit http://127.0.0.1:8000/docs
2. **Check console logs**: Look for `[APIClient]` messages in browser console
3. **Verify CORS**: Ensure your frontend port is allowed in backend's CORS configuration
4. **Check .env.local**: Ensure `NEXT_PUBLIC_BACKEND_URL` is correctly set

### TypeScript Errors
Run `npm run build` to check for type errors across the entire project.

### Styling Not Applied
Ensure Tailwind is properly configured and `globals.css` is imported in `layout.tsx`.

### Charts Not Rendering
If Recharts components don't display:
1. Check that the component file has `"use client"` directive
2. Verify data format matches expected interface
3. Open browser console for errors

### Mock Data vs API Data
To check if you're using API data or mock data:
1. Open browser console (F12)
2. Look for `[APIClient]` logs showing fetch attempts
3. If backend is working: "Successfully fetched from /api/..."
4. If using fallback: "Failed to fetch... using fallback data"

## API Endpoints Reference

All endpoints return JSON and support CORS for local development.

### Health Check
```
GET /health
Response: { "status": "healthy", "timestamp": "...", "version": "1.0.0" }
```

### Study Hours
```
GET /api/study/hours?period=7d
Response: { "data": [...], "total": 40.7, "average": 5.8 }
```

### Gym Attendance
```
GET /api/fitness/attendance?period=7d
Response: { "data": [...], "attendanceRate": 71, "daysAttended": 5 }
```

### Goals
```
GET /api/goals?status=active
Response: { "goals": [...], "completionRate": 64 }
```

### Weekly Summary
```
GET /api/weekly
Response: Combined study, fitness, and goals data
```

Full API documentation available at http://127.0.0.1:8000/docs when backend is running.

## Contributing

Modules 1-3 are complete. Future contributions will focus on:
- Database integration (replacing mock data with persistent storage)
- User authentication and multi-user support
- AI agent implementation for smart insights
- External API integrations (calendar, task managers)
- Real-time data updates via WebSocket

## License

MIT

## Contact

For questions or feedback, please refer to the PRD and buildable-modules documents.

---

**Built with ❤️ for college students**
