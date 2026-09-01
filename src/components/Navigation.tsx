import React from 'react';
import { motion } from 'framer-motion';
import { Home, Mail, Smile } from 'lucide-react';
import clsx from 'clsx';

export type Tab = 'home' | 'letters' | 'silly';

interface NavigationProps {
  currentTab: Tab;
  onChange: (tab: Tab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onChange }) => {
  const tabs = [
    { id: 'home' as Tab, label: 'Home', icon: Home },
    { id: 'letters' as Tab, label: 'Letters', icon: Mail },
    { id: 'silly' as Tab, label: 'Silly Things', icon: Smile },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/70 backdrop-blur-md rounded-full shadow-lg border border-rose-100 px-2 py-2 flex gap-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              "relative px-4 py-2 rounded-full flex items-center gap-2 transition-colors duration-300",
              isActive ? "text-rose-700" : "text-gray-500 hover:text-rose-400"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-rose-100 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              <Icon className="w-4 h-4" />
            </span>
            <span className="relative z-10 text-sm font-medium hidden md:block">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
