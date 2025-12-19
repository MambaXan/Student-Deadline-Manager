"use client";

import * as React from "react";
import '../Styles/globals.scss';

interface SidebarProps {
  children: React.ReactNode;
  collapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  collapsed = false,
  onToggle
}) => {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  // Определяем мобильное устройство
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggle = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      onToggle?.();
    }
  };

  // Закрытие по клику вне сайдбара (на мобилке)
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobile && isMobileOpen) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && !sidebar.contains(e.target as Node)) {
          setIsMobileOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isMobileOpen]);

  if (isMobile) {
    return (
      <>
        <button className="sidebar-mobile-trigger" onClick={() => setIsMobileOpen(true)}>
          ☰
        </button>
        
        {isMobileOpen && (
          <div className="sidebar-overlay" onClick={() => setIsMobileOpen(false)} />
        )}
        
        <div className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
          {children}
        </div>
      </>
    );
  }

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      {children}
    </div>
  );
};

export const SidebarTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return (
    <button 
      className={`sidebar-trigger ${className}`.trim()}
      {...props}
    >
      ☰
    </button>
  );
};

export const SidebarHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return <div className={`sidebar-header ${className}`.trim()} {...props} />;
};

export const SidebarContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return <div className={`sidebar-content ${className}`.trim()} {...props} />;
};

export const SidebarFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return <div className={`sidebar-footer ${className}`.trim()} {...props} />;
};

export const SidebarMenu: React.FC<React.HTMLAttributes<HTMLUListElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return <ul className={`sidebar-menu ${className}`.trim()} {...props} />;
};

interface SidebarMenuItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  active?: boolean;
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ 
  className = "", 
  active,
  ...props 
}) => {
  return <li className={`sidebar-menu-item ${className}`.trim()} data-active={active} {...props} />;
};

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: React.ReactNode;
}

export const SidebarMenuButton: React.FC<SidebarMenuButtonProps> = ({ 
  className = "", 
  active,
  icon,
  children,
  ...props 
}) => {
  return (
    <button 
      className={`sidebar-menu-button ${active ? 'active' : ''} ${className}`.trim()}
      {...props}
    >
      {icon && <span className="sidebar-icon">{icon}</span>}
      <span className="sidebar-menu-text">{children}</span>
    </button>
  );
};

export const SidebarGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return <div className={`sidebar-group ${className}`.trim()} {...props} />;
};

export const SidebarGroupLabel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return <div className={`sidebar-group-label ${className}`.trim()} {...props} />;
};

export const SidebarInset: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  className = "", 
  ...props 
}) => {
  return <div className={`sidebar-inset ${className}`.trim()} {...props} />;
};