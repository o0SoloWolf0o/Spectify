import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/components/main/build/productPopup';

interface SelectedProductsContextType {
  selectedProducts: { [key: string]: Product | null };
  setSelectedProducts: React.Dispatch<React.SetStateAction<{ [key: string]: Product | null }>>;
}

const SelectedProductsContext = createContext<SelectedProductsContextType | undefined>(undefined);

export const SelectedProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState<{ [key: string]: Product | null }>({});

  return (
    <SelectedProductsContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </SelectedProductsContext.Provider>
  );
};

export const useSelectedProducts = (): SelectedProductsContextType => {
  const context = useContext(SelectedProductsContext);
  if (context === undefined) {
    throw new Error('useSelectedProducts must be used within a SelectedProductsProvider');
  }
  return context;
};
