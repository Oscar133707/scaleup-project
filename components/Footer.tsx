
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background pt-24 pb-12 border-t border-borderSubtle" id="create">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center rotate-12">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-heading font-bold tracking-tight text-primary">
                SCALEUP<span className="text-secondary">STUDIO</span>
              </span>
            </div>
            <p className="text-secondary text-sm leading-relaxed max-w-xs mb-8">
              Empowering the next generation of global businesses through modular scaling, innovative strategy, and world-class product creation.
            </p>
            <div className="flex gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} role="button" tabIndex={0} className="w-10 h-10 rounded-full bg-surface border border-borderSubtle flex items-center justify-center hover:bg-accent hover:border-accent transition-colors duration-200 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2" onKeyDown={(e) => e.key === 'Enter' && (e.currentTarget as HTMLElement).click()}>
                  <div className="w-4 h-4 bg-secondary group-hover:bg-white rounded-sm transition-colors" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-primary font-bold mb-6 tracking-wide text-sm uppercase">Product</h4>
            <ul className="space-y-4 text-sm text-secondary">
              <li className="hover:text-accent transition-colors duration-200 cursor-pointer">Market Analysis</li>
              <li className="hover:text-accent transition-colors duration-200 cursor-pointer">Growth Engine</li>
              <li className="hover:text-accent transition-colors duration-200 cursor-pointer">Design Systems</li>
              <li className="hover:text-accent transition-colors duration-200 cursor-pointer">Integrations</li>
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-bold mb-6 tracking-wide text-sm uppercase">Resources</h4>
            <ul className="space-y-4 text-sm text-secondary">
              <li className="hover:text-accent transition-colors duration-200 cursor-pointer">2026 Vision</li>
              <li className="hover:text-accent transition-colors duration-200 cursor-pointer">Scaling Guide</li>
              <li className="hover:text-accent transition-colors duration-200 cursor-pointer">Success Stories</li>
              <li className="hover:text-accent transition-colors duration-200 cursor-pointer">API Docs</li>
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-bold mb-6 tracking-wide text-sm uppercase">Company</h4>
            <ul className="space-y-4 text-sm text-secondary">
              <li className="hover:text-accent transition-colors duration-200 cursor-pointer">About Us</li>
              <li className="hover:text-accent transition-colors duration-200 cursor-pointer">Careers</li>
              <li className="hover:text-accent transition-colors duration-200 cursor-pointer">Newsroom</li>
              <li className="hover:text-accent transition-colors duration-200 cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="text-primary font-bold mb-6 tracking-wide text-sm uppercase">Legal</h4>
            <ul className="space-y-4 text-sm text-secondary">
              <li className="hover:text-accent transition-colors duration-200 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-accent transition-colors duration-200 cursor-pointer">Terms of Service</li>
              <li className="hover:text-accent transition-colors duration-200 cursor-pointer">Cookie Settings</li>
              <li className="hover:text-accent transition-colors duration-200 cursor-pointer">Accessibility</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-borderSubtle flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-secondary">
            © 2026 ScaleUp Studio. All rights reserved.
          </div>
          <div className="flex gap-8">
            <div className="flex items-center gap-2 text-xs font-bold text-secondary tracking-widest uppercase">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              All Systems Operational
            </div>
            <div className="text-xs font-bold text-secondary tracking-widest uppercase cursor-pointer hover:text-accent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded">
              ENG (US)
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
