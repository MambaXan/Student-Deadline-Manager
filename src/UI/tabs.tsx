"use client";

import * as React from "react";
import '../Styles/globals.scss';

interface TabsSimpleProps {
  tabs: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
  }>;
  defaultTab?: string;
}

export const TabsSimple: React.FC<TabsSimpleProps> = ({
  tabs,
  defaultTab
}) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id || '');

  return (
    <div className="tabs">
      <div className="tabs-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tabs-trigger ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="tabs-content">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};