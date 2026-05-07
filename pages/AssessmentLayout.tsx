import React from 'react';
import { Outlet } from 'react-router-dom';

export function AssessmentLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <Outlet />
      </main>
    </div>
  );
}
