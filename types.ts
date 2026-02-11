
// Add React import to fix "Cannot find namespace 'React'" error for React.ReactNode
import React from 'react';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: React.ReactNode;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Testimonial {
  company: string;
  logo: string;
  quote: string;
  author: string;
  role: string;
}
