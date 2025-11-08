"use client";

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  subtitle?: string;
  trend?: {
    value: number;
    label: string;
  };
  color?: 'blue' | 'green' | 'purple' | 'pink' | 'orange';
}

const iconBgClasses = {
  blue: 'bg-blue-100',
  green: 'bg-green-100',
  purple: 'bg-purple-100',
  pink: 'bg-pink-100',
  orange: 'bg-orange-100',
};

const iconColorClasses = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  purple: 'text-purple-600',
  pink: 'text-pink-600',
  orange: 'text-orange-600',
};

export function StatCard({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
  color = 'blue',
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={cn(
                  'text-xs font-medium',
                  trend.value >= 0 ? 'text-green-600' : 'text-red-600'
                )}
              >
                {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-slate-500">{trend.label}</span>
            </div>
          )}
        </div>
        <div
          className={cn(
            'w-12 h-12 rounded-lg flex items-center justify-center',
            iconBgClasses[color]
          )}
        >
          <Icon className={cn('w-6 h-6', iconColorClasses[color])} />
        </div>
      </div>
    </div>
  );
}
