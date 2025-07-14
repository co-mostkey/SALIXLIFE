import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
  position?: 'top' | 'bottom';
  variant?: 'pills' | 'underline';
  className?: string;
}

export default function TabNavigation({ 
  tabs, 
  position = 'top', 
  variant = 'pills',
  className = '' 
}: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* 탭 네비게이션 */}
      <div className={`flex-shrink-0 ${position === 'bottom' ? 'order-2' : 'order-1'}`}>
        <nav className={`flex ${position === 'bottom' ? 'justify-center' : 'justify-start'} gap-2 p-4`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300
                ${variant === 'pills' 
                  ? activeTab === tab.id 
                    ? 'bg-secondary text-white shadow-lg' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  : activeTab === tab.id
                    ? 'text-secondary border-b-2 border-secondary'
                    : 'text-white/70 hover:text-white'
                }
              `}
            >
              {tab.icon}
              <span className="text-sm">{tab.label}</span>
              
              {variant === 'pills' && activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-secondary rounded-lg -z-10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* 탭 컨텐츠 */}
      <div className={`flex-1 overflow-hidden ${position === 'bottom' ? 'order-1' : 'order-2'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full overflow-y-auto"
          >
            {activeTabContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 