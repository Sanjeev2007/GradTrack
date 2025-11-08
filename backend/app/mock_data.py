"""Mock data for GradTrack API - matches frontend TypeScript structure"""

# Last 7 days of study data
study_hours_data = [
    {"day": "Mon", "hours": 6.5},
    {"day": "Tue", "hours": 4.2},
    {"day": "Wed", "hours": 7.8},
    {"day": "Thu", "hours": 5.5},
    {"day": "Fri", "hours": 3.0},
    {"day": "Sat", "hours": 8.5},
    {"day": "Sun", "hours": 5.2},
]

# Subject-wise breakdown
subject_progress_data = [
    {"subject": "DSA", "hoursCompleted": 6, "hoursTarget": 8, "color": "#3b82f6"},
    {"subject": "OS", "hoursCompleted": 5, "hoursTarget": 6, "color": "#8b5cf6"},
    {"subject": "DBMS", "hoursCompleted": 7, "hoursTarget": 10, "color": "#ec4899"},
    {"subject": "Networks", "hoursCompleted": 4, "hoursTarget": 5, "color": "#10b981"},
]

# Gym attendance last 7 days
gym_attendance_data = [
    {"day": "Mon", "attended": True, "duration": 60},
    {"day": "Tue", "attended": False, "duration": None},
    {"day": "Wed", "attended": True, "duration": 45},
    {"day": "Thu", "attended": False, "duration": None},
    {"day": "Fri", "attended": True, "duration": 75},
    {"day": "Sat", "attended": True, "duration": 90},
    {"day": "Sun", "attended": False, "duration": None},
]

# Active goals
goals_data = [
    {
        "id": "1",
        "title": "Complete DSA Problem Set",
        "category": "study",
        "progress": 75,
        "target": 100,
        "unit": "problems",
        "deadline": "2025-12-15",
    },
    {
        "id": "2",
        "title": "Study 40 hours this week",
        "category": "study",
        "progress": 36.5,
        "target": 40,
        "unit": "hours",
        "deadline": "2025-11-14",
    },
    {
        "id": "3",
        "title": "Gym 5 days a week",
        "category": "fitness",
        "progress": 4,
        "target": 5,
        "unit": "days",
        "deadline": "2025-11-14",
    },
    {
        "id": "4",
        "title": "Complete OS assignments",
        "category": "study",
        "progress": 2,
        "target": 3,
        "unit": "assignments",
        "deadline": "2025-11-20",
    },
]

# Utility functions
def get_average_study_hours():
    total = sum(day["hours"] for day in study_hours_data)
    return round(total / len(study_hours_data), 1)


def get_total_study_hours():
    return round(sum(day["hours"] for day in study_hours_data), 1)


def get_gym_attendance_rate():
    attended = sum(1 for day in gym_attendance_data if day["attended"])
    return round((attended / len(gym_attendance_data)) * 100)


def get_goal_completion_rate():
    total_progress = sum(goal["progress"] / goal["target"] for goal in goals_data)
    return round((total_progress / len(goals_data)) * 100)
