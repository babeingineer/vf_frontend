import React, { useState } from 'react';

interface ICategoryContext {
  isCategoryBar: boolean;
  toggleCategoryBar: () => void;
}

export const CategoryContext = React.createContext<ICategoryContext>({
  isCategoryBar: true,
  toggleCategoryBar: () => {},
});

interface ICategoryContextProps {
  children: React.ReactNode;
}

export function CategoryProvider({ children }: ICategoryContextProps) {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <CategoryContext.Provider
      value={{
        isCategoryBar: isEnabled,
        toggleCategoryBar: () => setIsEnabled(!isEnabled),
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
