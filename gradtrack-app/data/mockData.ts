// Mock data for GradTrack AI Assistant

export interface StudyData {
  [key: string]: string | number | undefined;
  day: string;
  hours: number;
  subject?: string;
}

export interface GymData {
  day: string;
  attended: boolean;
  duration?: number;
}

export interface Goal {
  id: string;
  title: string;
  category: 'study' | 'fitness' | 'personal';
  progress: number;
  target: number;
  unit: string;
  deadline?: string;
}

export interface SubjectProgress {
  subject: string;
  hoursCompleted: number;
  hoursTarget: number;
  color: string;
}

// Last 7 days of study data
export const studyHoursData: StudyData[] = [
  { day: 'Mon', hours: 6.5 },
  { day: 'Tue', hours: 4.2 },
  { day: 'Wed', hours: 7.8 },
  { day: 'Thu', hours: 5.5 },
  { day: 'Fri', hours: 3.0 },
  { day: 'Sat', hours: 8.5 },
  { day: 'Sun', hours: 5.2 },
];

// Subject-wise breakdown
export const subjectProgressData: SubjectProgress[] = [
  { subject: 'DSA', hoursCompleted: 6, hoursTarget: 8, color: '#3b82f6' },
  { subject: 'OS', hoursCompleted: 5, hoursTarget: 6, color: '#8b5cf6' },
  { subject: 'DBMS', hoursCompleted: 7, hoursTarget: 10, color: '#ec4899' },
  { subject: 'Networks', hoursCompleted: 4, hoursTarget: 5, color: '#10b981' },
];

// Gym attendance last 7 days
export const gymAttendanceData: GymData[] = [
  { day: 'Mon', attended: true, duration: 60 },
  { day: 'Tue', attended: false },
  { day: 'Wed', attended: true, duration: 45 },
  { day: 'Thu', attended: false },
  { day: 'Fri', attended: true, duration: 75 },
  { day: 'Sat', attended: true, duration: 90 },
  { day: 'Sun', attended: false },
];

// Active goals
export const goalsData: Goal[] = [
  {
    id: '1',
    title: 'Complete DSA Problem Set',
    category: 'study',
    progress: 75,
    target: 100,
    unit: 'problems',
    deadline: '2025-12-15',
  },
  {
    id: '2',
    title: 'Study 40 hours this week',
    category: 'study',
    progress: 36.5,
    target: 40,
    unit: 'hours',
    deadline: '2025-11-14',
  },
  {
    id: '3',
    title: 'Gym 5 days a week',
    category: 'fitness',
    progress: 4,
    target: 5,
    unit: 'days',
    deadline: '2025-11-14',
  },
  {
    id: '4',
    title: 'Complete OS assignments',
    category: 'study',
    progress: 2,
    target: 3,
    unit: 'assignments',
    deadline: '2025-11-20',
  },
];

// Weekly schedule
export const weeklySchedule = [
  {
    day: 'Monday',
    tasks: [
      { time: '09:00 AM', task: 'DSA Lecture', duration: '1.5h' },
      { time: '11:00 AM', task: 'OS Lab', duration: '2h' },
      { time: '05:00 PM', task: 'Gym', duration: '1h' },
      { time: '07:00 PM', task: 'DBMS Study', duration: '2h' },
    ],
  },
  {
    day: 'Tuesday',
    tasks: [
      { time: '10:00 AM', task: 'Networks Lecture', duration: '1.5h' },
      { time: '02:00 PM', task: 'DSA Practice', duration: '2h' },
      { time: '06:00 PM', task: 'Free time', duration: '2h' },
    ],
  },
  // Add more days as needed
];

// Utility functions
export const getAverageStudyHours = (): number => {
  const total = studyHoursData.reduce((sum, day) => sum + day.hours, 0);
  return Math.round((total / studyHoursData.length) * 10) / 10;
};

export const getGymAttendanceRate = (): number => {
  const attended = gymAttendanceData.filter(d => d.attended).length;
  return Math.round((attended / gymAttendanceData.length) * 100);
};

export const getTotalStudyHours = (): number => {
  return Math.round(studyHoursData.reduce((sum, day) => sum + day.hours, 0) * 10) / 10;
};

export const getGoalCompletionRate = (): number => {
  const totalProgress = goalsData.reduce((sum, goal) => sum + (goal.progress / goal.target), 0);
  return Math.round((totalProgress / goalsData.length) * 100);
};
