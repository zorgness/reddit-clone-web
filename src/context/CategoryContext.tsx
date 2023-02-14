import React, { useState, useCallback, createContext, ReactNode } from "react";

type NavigationContextType = {
  currentCategoryId: number;
  setCategory: (_id: number) => void;
};
export const NavigationContext = createContext<NavigationContextType>({
  currentCategoryId: 0,
  setCategory: () => {},
});

type NavigationContextProviderProps = {
  children: ReactNode;
};

export const NavigationContextProvider = ({
  children,
}: NavigationContextProviderProps) => {
  const [currentCategoryId, setCategoryId] = useState<number>(0);

  console.log(currentCategoryId);

  const setCategory = useCallback((_id: number) => {
    setCategoryId(_id);
  }, []);

  const value = { setCategory, currentCategoryId };
  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

// Définition explicite du type du contexte avec NavigationContextType.
// Utilisation de ReactNode pour typer les enfants de <NavigationContextProvider>.
// Utilisation de <NavigationContext.Provider> pour éviter une erreur de type.
// Définition explicite du type des arguments de setCategory.
