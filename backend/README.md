# GradTrack Backend API

FastAPI backend for the GradTrack productivity assistant.

## Features

- RESTful API endpoints for study tracking, fitness, and goals
- Mock data matching frontend structure
- CORS enabled for local development
- Auto-generated API documentation (Swagger UI)
- Health check endpoint

## Setup

### Prerequisites

- Python 3.9 or higher
- pip (Python package manager)

### Installation

1. **Create a virtual environment** (recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment** (optional):
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## Running the Server

### Development Mode (with auto-reload)

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at:
- **API**: http://127.0.0.1:8000
- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc

### Production Mode

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Endpoints

### Health Check

```http
GET /health
```

Returns server status and timestamp.

### Study Data

```http
GET /api/study/hours?period=7d&userId=user123
```

Returns study hours data for the specified period.

**Response:**
```json
{
  "data": [
    {"day": "Mon", "hours": 6.5},
    {"day": "Tue", "hours": 4.2},
    ...
  ],
  "total": 40.7,
  "average": 5.8
}
```

```http
GET /api/study/subjects?userId=user123
```

Returns subject-wise progress.

### Fitness Data

```http
GET /api/fitness/attendance?period=7d&userId=user123
```

Returns gym attendance data.

**Response:**
```json
{
  "data": [
    {"day": "Mon", "attended": true, "duration": 60},
    ...
  ],
  "attendanceRate": 57,
  "daysAttended": 4
}
```

### Goals

```http
GET /api/goals?userId=user123&status=active
```

Returns user goals with progress tracking.

**Response:**
```json
{
  "goals": [
    {
      "id": "1",
      "title": "Complete DSA Problem Set",
      "category": "study",
      "progress": 75,
      "target": 100,
      "unit": "problems",
      "deadline": "2025-12-15"
    },
    ...
  ],
  "completionRate": 64
}
```

### Weekly Summary

```http
GET /api/weekly?userId=user123
```

Returns comprehensive weekly summary combining study, fitness, and goals data.

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI app and routes
│   ├── models.py        # Pydantic models
│   └── mock_data.py     # Mock data (will be replaced with DB)
├── requirements.txt
├── .env.example
└── README.md
```

## Development

### Adding New Endpoints

1. Add Pydantic models in `app/models.py`
2. Add route handlers in `app/main.py`
3. Test via Swagger UI at `/docs`

### Running Tests

```bash
pytest tests/
```

## CORS Configuration

The backend is configured to allow requests from:
- http://localhost:3000
- http://127.0.0.1:3000
- http://localhost:3001

Update `origins` list in `app/main.py` to add more allowed origins.

## Future Enhancements

- [ ] Database integration (PostgreSQL/Supabase)
- [ ] User authentication (JWT tokens)
- [ ] AI agent integration (LangChain + OpenAI)
- [ ] External API integrations (Google Calendar, Toggl)
- [ ] Rate limiting and caching
- [ ] Logging and monitoring
- [ ] Docker support

## Troubleshooting

### Port Already in Use

If port 8000 is already in use, change the port:
```bash
uvicorn app.main:app --reload --port 8001
```

### Module Not Found Errors

Make sure you're in the backend directory and have activated the virtual environment:
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### CORS Errors

If you get CORS errors from the frontend, verify:
1. Backend is running on port 8000
2. Frontend URL is listed in `origins` in `app/main.py`
3. Both servers are running

## Documentation

- **API Docs**: http://127.0.0.1:8000/docs (Swagger UI)
- **Alternative Docs**: http://127.0.0.1:8000/redoc (ReDoc)
- **OpenAPI JSON**: http://127.0.0.1:8000/openapi.json

## License

MIT
