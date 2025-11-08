"""Pydantic models for GradTrack API"""

from pydantic import BaseModel
from typing import List, Literal, Optional
from datetime import date


class StudyData(BaseModel):
    day: str
    hours: float
    subject: Optional[str] = None


class SubjectProgress(BaseModel):
    subject: str
    hoursCompleted: int
    hoursTarget: int
    color: str


class GymData(BaseModel):
    day: str
    attended: bool
    duration: Optional[int] = None


class Goal(BaseModel):
    id: str
    title: str
    category: Literal["study", "fitness", "personal"]
    progress: float
    target: float
    unit: str
    deadline: Optional[str] = None


class StudyHoursResponse(BaseModel):
    data: List[StudyData]
    total: float
    average: float


class SubjectProgressResponse(BaseModel):
    subjects: List[SubjectProgress]


class FitnessResponse(BaseModel):
    data: List[GymData]
    attendanceRate: int
    daysAttended: int


class GoalsResponse(BaseModel):
    goals: List[Goal]
    completionRate: int


class WeeklySummary(BaseModel):
    studyHours: StudyHoursResponse
    fitness: FitnessResponse
    goals: GoalsResponse


class HealthResponse(BaseModel):
    status: str
    timestamp: str
    version: str
