"""
GradTrack FastAPI Backend
AI-powered productivity assistant API
"""

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os

from .models import (
    StudyHoursResponse,
    SubjectProgressResponse,
    FitnessResponse,
    GoalsResponse,
    WeeklySummary,
    HealthResponse,
)
from .mock_data import (
    study_hours_data,
    subject_progress_data,
    gym_attendance_data,
    goals_data,
    get_average_study_hours,
    get_total_study_hours,
    get_gym_attendance_rate,
    get_goal_completion_rate,
)

# Initialize FastAPI app
app = FastAPI(
    title="GradTrack API",
    description="AI-powered productivity assistant for college students",
    version="1.0.0",
)

# CORS configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",  # Alternative dev port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=600,  # Cache preflight requests for 10 minutes
)


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint"""
    return {
        "message": "GradTrack API",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "running",
    }


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow().isoformat(),
        version="1.0.0",
    )


@app.get("/api/study/hours", response_model=StudyHoursResponse, tags=["Study"])
async def get_study_hours(
    period: str = Query("7d", description="Time period (e.g., 7d, 30d)"),
    userId: str = Query("", description="User ID"),
):
    """
    Get study hours data for the specified period

    Returns study hours per day, total hours, and daily average
    """
    return StudyHoursResponse(
        data=study_hours_data,
        total=get_total_study_hours(),
        average=get_average_study_hours(),
    )


@app.get("/api/study/subjects", response_model=SubjectProgressResponse, tags=["Study"])
async def get_subject_progress(
    userId: str = Query("", description="User ID"),
):
    """Get subject-wise study progress"""
    return SubjectProgressResponse(subjects=subject_progress_data)


@app.get("/api/fitness/attendance", response_model=FitnessResponse, tags=["Fitness"])
async def get_fitness_attendance(
    period: str = Query("7d", description="Time period (e.g., 7d, 30d)"),
    userId: str = Query("", description="User ID"),
):
    """
    Get gym attendance data for the specified period

    Returns attendance data, attendance rate, and days attended
    """
    days_attended = sum(1 for day in gym_attendance_data if day["attended"])

    return FitnessResponse(
        data=gym_attendance_data,
        attendanceRate=get_gym_attendance_rate(),
        daysAttended=days_attended,
    )


@app.get("/api/goals", response_model=GoalsResponse, tags=["Goals"])
async def get_goals(
    userId: str = Query("", description="User ID"),
    status: str = Query("active", description="Goal status (active, completed, all)"),
):
    """
    Get user goals

    Returns list of goals with progress tracking and overall completion rate
    """
    return GoalsResponse(
        goals=goals_data,
        completionRate=get_goal_completion_rate(),
    )


@app.get("/api/weekly", response_model=WeeklySummary, tags=["Summary"])
async def get_weekly_summary(
    userId: str = Query("", description="User ID"),
):
    """
    Get comprehensive weekly summary

    Returns combined study, fitness, and goals data
    """
    days_attended = sum(1 for day in gym_attendance_data if day["attended"])

    return WeeklySummary(
        studyHours=StudyHoursResponse(
            data=study_hours_data,
            total=get_total_study_hours(),
            average=get_average_study_hours(),
        ),
        fitness=FitnessResponse(
            data=gym_attendance_data,
            attendanceRate=get_gym_attendance_rate(),
            daysAttended=days_attended,
        ),
        goals=GoalsResponse(
            goals=goals_data,
            completionRate=get_goal_completion_rate(),
        ),
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info",
    )
