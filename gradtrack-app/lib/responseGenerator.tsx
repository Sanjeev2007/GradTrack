"use client";

import { MessageContent } from './types';
import { StatCard } from '@/components/ui/StatCard';
import { ProgressChart } from '@/components/ui/ProgressChart';
import { GoalCard } from '@/components/ui/GoalCard';
import { apiClient } from './apiClient';
import {
  studyHoursData,
  gymAttendanceData,
  goalsData,
  getAverageStudyHours,
  getGymAttendanceRate,
  getTotalStudyHours,
  getGoalCompletionRate,
} from '@/data/mockData';
import { BookOpen, Dumbbell, Target, TrendingUp } from 'lucide-react';

// API Response Types (matching backend Pydantic models)
interface StudyHoursResponse {
  data: Array<{ day: string; hours: number; subject: string | null }>;
  total: number;
  average: number;
}

interface GymAttendanceResponse {
  data: Array<{ day: string; attended: boolean }>;
  attendanceRate: number;
  daysAttended: number;
}

interface GoalsResponse {
  goals: Array<{
    id: string;
    title: string;
    category: 'study' | 'fitness' | 'personal';
    progress: number;
    target: number;
    unit: string;
    deadline: string | null;
  }>;
  completionRate: number;
}

interface KeywordMatch {
  keywords: string[];
  generator: () => Promise<MessageContent[]>;
}

const responseMap: KeywordMatch[] = [
  // Study progress
  {
    keywords: ['study', 'progress', 'hours', 'studying', 'academic'],
    generator: async () => {
      // Fetch from API with fallback to mock data
      const studyData = await apiClient.fetchWithFallback<StudyHoursResponse>(
        '/api/study/hours?period=7d',
        {
          data: studyHoursData.map(d => ({ ...d, subject: d.subject || null })),
          total: getTotalStudyHours(),
          average: getAverageStudyHours(),
        }
      );

      return [
        {
          type: 'text',
          text: `Great question! Let me show you your study progress for this week. You've been doing fantastic! 📚`,
        },
        {
          type: 'stats',
          component: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
              <StatCard
                title="Total Study Hours"
                value={studyData.total}
                icon={BookOpen}
                subtitle="This week"
                color="blue"
              />
              <StatCard
                title="Daily Average"
                value={`${studyData.average}h`}
                icon={TrendingUp}
                subtitle="Per day"
                trend={{ value: 12, label: 'vs last week' }}
                color="purple"
              />
            </div>
          ),
        },
        {
          type: 'chart',
          component: (
            <div className="my-4">
              <ProgressChart
                data={studyData.data}
                dataKey="hours"
                xAxisKey="day"
                title="Study Hours - Last 7 Days"
                type="bar"
                color="#3b82f6"
              />
            </div>
          ),
        },
        {
          type: 'text',
          text: `You're averaging ${studyData.average} hours per day. Keep up the excellent work! Your consistency is impressive. 💪`,
        },
      ];
    },
  },

  // Gym/fitness
  {
    keywords: ['gym', 'fitness', 'workout', 'exercise', 'training'],
    generator: async () => {
      // Fetch from API with fallback to mock data
      const gymData = await apiClient.fetchWithFallback<GymAttendanceResponse>(
        '/api/fitness/attendance?period=7d',
        {
          data: gymAttendanceData,
          attendanceRate: getGymAttendanceRate(),
          daysAttended: gymAttendanceData.filter(d => d.attended).length,
        }
      );

      return [
        {
          type: 'text',
          text: `Let's check your gym consistency! 💪`,
        },
        {
          type: 'stats',
          component: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
              <StatCard
                title="Gym Attendance"
                value={`${gymData.attendanceRate}%`}
                icon={Dumbbell}
                subtitle="This week"
                color="green"
              />
              <StatCard
                title="Days Attended"
                value={`${gymData.daysAttended}/7`}
                icon={Target}
                subtitle="Great effort!"
                color="orange"
              />
            </div>
          ),
        },
        {
          type: 'text',
          text: `You attended the gym ${gymData.daysAttended} out of 7 days this week (${gymData.attendanceRate}% attendance). ${
            gymData.attendanceRate >= 70
              ? "That's fantastic! You're building a strong habit. 🔥"
              : "Let's aim for at least 5 days next week. You got this! 💪"
          }`,
        },
      ];
    },
  },

  // Goals
  {
    keywords: ['goal', 'goals', 'target', 'objectives', 'achievement'],
    generator: async () => {
      // Fetch from API with fallback to mock data
      const goalsResponse = await apiClient.fetchWithFallback<GoalsResponse>(
        '/api/goals?status=active',
        {
          goals: goalsData.map(g => ({ ...g, deadline: g.deadline || null })),
          completionRate: getGoalCompletionRate(),
        }
      );

      return [
        {
          type: 'text',
          text: `Here's an overview of your current goals and how you're tracking! 🎯`,
        },
        {
          type: 'stats',
          component: (
            <div className="my-4">
              <StatCard
                title="Overall Goal Progress"
                value={`${goalsResponse.completionRate}%`}
                icon={Target}
                subtitle={`${goalsResponse.goals.length} active goals`}
                color="purple"
                trend={{ value: 8, label: 'vs last week' }}
              />
            </div>
          ),
        },
        {
          type: 'goals',
          component: (
            <div className="grid grid-cols-1 gap-3 my-4">
              {goalsResponse.goals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          ),
        },
        {
          type: 'text',
          text: `You're making solid progress across all your goals! Your DSA problem set is almost complete at 75%. Keep pushing! 🚀`,
        },
      ];
    },
  },

  // Weekly overview/plan
  {
    keywords: ['week', 'plan', 'schedule', 'overview', 'summary'],
    generator: async () => {
      // Fetch all data for weekly overview (could also use /api/weekly endpoint)
      const [studyData, gymData, goalsResponse] = await Promise.all([
        apiClient.fetchWithFallback<StudyHoursResponse>(
          '/api/study/hours?period=7d',
          {
            data: studyHoursData.map(d => ({ ...d, subject: d.subject || null })),
            total: getTotalStudyHours(),
            average: getAverageStudyHours(),
          }
        ),
        apiClient.fetchWithFallback<GymAttendanceResponse>(
          '/api/fitness/attendance?period=7d',
          {
            data: gymAttendanceData,
            attendanceRate: getGymAttendanceRate(),
            daysAttended: gymAttendanceData.filter(d => d.attended).length,
          }
        ),
        apiClient.fetchWithFallback<GoalsResponse>('/api/goals?status=active', {
          goals: goalsData.map(g => ({ ...g, deadline: g.deadline || null })),
          completionRate: getGoalCompletionRate(),
        }),
      ]);

      return [
        {
          type: 'text',
          text: `Let me give you a comprehensive overview of your week! 📅`,
        },
        {
          type: 'stats',
          component: (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
              <StatCard
                title="Study Hours"
                value={studyData.total}
                icon={BookOpen}
                subtitle="This week"
                color="blue"
              />
              <StatCard
                title="Gym Days"
                value={`${gymData.daysAttended}/7`}
                icon={Dumbbell}
                subtitle={`${gymData.attendanceRate}% attendance`}
                color="green"
              />
              <StatCard
                title="Goal Progress"
                value={`${goalsResponse.completionRate}%`}
                icon={Target}
                subtitle={`${goalsResponse.goals.length} active goals`}
                color="purple"
              />
            </div>
          ),
        },
        {
          type: 'chart',
          component: (
            <div className="my-4">
              <ProgressChart
                data={studyData.data}
                dataKey="hours"
                xAxisKey="day"
                title="Study Hours Trend"
                type="line"
                color="#8b5cf6"
              />
            </div>
          ),
        },
        {
          type: 'text',
          text: `You're doing great this week! Your study consistency is solid, and you're maintaining a good fitness routine. Focus on completing that DSA problem set before the deadline! 🎯`,
        },
      ];
    },
  },
];

export async function generateResponse(
  userMessage: string
): Promise<MessageContent[]> {
  const lowerMessage = userMessage.toLowerCase();

  // Find matching response generator
  for (const match of responseMap) {
    if (match.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return await match.generator();
    }
  }

  // Default response for unmatched queries
  return [
    {
      type: 'text',
      text: `I'm here to help you track your productivity! Ask me about:

📚 Your **study progress** and hours
💪 Your **gym** consistency and fitness
🎯 Your **goals** and achievements
📅 Your weekly **plan** and overview

Try asking something like "Show my study progress" or "How's my gym consistency?"`,
    },
  ];
}
