
import React from 'react';

interface StickyCTAProps {
  visible: boolean;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({ visible }) => {
  return (
    <div className={`fixed bottom-8 left-0 right-0 z-50 transition-all duration-500 transform ${
      visible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
    }`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-surface py-4 px-8 rounded-full shadow-2xl shadow-primary/20 flex items-center justify-between border border-borderSubtle">
          <div className="hidden md:block">
            <span className="text-primary font-bold tracking-tight">Ready to scale beyond usual?</span>
            <p className="text-xs text-secondary">Join 12,000+ businesses growing with us.</p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none text-primary text-sm font-bold px-6 py-3 rounded-full border-2 border-primary hover:bg-primary hover:text-background transition-colors cursor-pointer">
              SPEAK TO SALES
            </button>
            <button className="flex-1 md:flex-none bg-accent text-white text-sm font-bold px-8 py-3 rounded-full shadow-lg shadow-accent/30 transition-all hover:scale-105 active:scale-95 cursor-pointer">
              GET STARTED
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
