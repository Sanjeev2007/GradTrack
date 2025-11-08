"use client";

import { BookOpen, Dumbbell, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Goal {
  id: string;
  title: string;
  category: 'study' | 'fitness' | 'personal';
  progress: number;
  target: number;
  unit: string;
  deadline?: string | null;
}

interface GoalCardProps {
  goal: Goal;
}

const categoryIcons = {
  study: BookOpen,
  fitness: Dumbbell,
  personal: Star,
};

const categoryColors = {
  study: 'bg-blue-100 text-blue-600',
  fitness: 'bg-green-100 text-green-600',
  personal: 'bg-purple-100 text-purple-600',
};

const progressColors = {
  low: 'bg-red-500',
  medium: 'bg-yellow-500',
  high: 'bg-green-500',
};

export function GoalCard({ goal }: GoalCardProps) {
  const Icon = categoryIcons[goal.category];
  const progressPercentage = (goal.progress / goal.target) * 100;

  const progressColor =
    progressPercentage >= 75
      ? progressColors.high
      : progressPercentage >= 40
      ? progressColors.medium
      : progressColors.low;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', categoryColors[goal.category])}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-slate-900 text-sm mb-1">
            {goal.title}
          </h4>
          <p className="text-xs text-slate-500 mb-2">
            {goal.progress} / {goal.target} {goal.unit}
            {goal.deadline && ` • Due ${new Date(goal.deadline).toLocaleDateString()}`}
          </p>

          {/* Progress Bar */}
          <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={cn('h-full transition-all duration-500', progressColor)}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>

          <p className="text-xs font-medium text-slate-600 mt-1">
            {Math.round(progressPercentage)}% complete
          </p>
        </div>
      </div>
    </div>
  );
}
