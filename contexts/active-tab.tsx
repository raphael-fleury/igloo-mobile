import React, { createContext, ReactNode, useContext } from 'react';

type ActiveTabContextType = {
  activeTab: string;
};

const ActiveTabContext = createContext<ActiveTabContextType | undefined>(undefined);

export function ActiveTabProvider({
  children,
  activeTab,
}: Readonly<{
  children: ReactNode;
  activeTab: string;
}>) {
  return (
    <ActiveTabContext.Provider value={{ activeTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
}

export function useActiveTab() {
  const context = useContext(ActiveTabContext);
  if (context === undefined) {
    throw new Error('useActiveTab must be used within an ActiveTabProvider');
  }
  return context.activeTab;
}
