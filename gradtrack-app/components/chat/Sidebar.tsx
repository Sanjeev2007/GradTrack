"use client";

import { User, Settings, BarChart3, Target } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen border-r border-slate-700">
      {/* Profile Section */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-semibold">Student</h2>
            <p className="text-sm text-slate-400">Free Plan</p>
          </div>
        </div>
      </div>

      {/* Stats Placeholder */}
      <div className="p-6 border-b border-slate-700 flex-1">
        <h3 className="text-sm font-semibold text-slate-400 uppercase mb-4">Quick Stats</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <span className="text-slate-300">Study Hours: Coming soon</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Target className="w-5 h-5 text-green-400" />
            <span className="text-slate-300">Goals: Coming soon</span>
          </div>
        </div>
      </div>

      {/* Settings Placeholder */}
      <div className="p-6 border-t border-slate-700">
        <button className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors w-full">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
