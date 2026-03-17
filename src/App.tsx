import { useState, useEffect } from 'react';
import { ShoppingList } from './components/ShoppingList';
import type { ShoppingItem, CreateItemDTO } from './types';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

function App() {
  const [items, setItems] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem('shopping-list');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('shopping-list', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (dto: CreateItemDTO) => {
    const newItem: ShoppingItem = {
      id: generateId(),
      name: dto.name,
      quantity: dto.quantity,
      unit: dto.unit,
      price: dto.price,
      checked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setItems(prev => [...prev, newItem]);
  };

  const handleToggleItem = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, checked: !item.checked, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const uncheckedCount = items.filter(item => !item.checked).length;
  const totalEstimate = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  return (
    <div className="h-dvh bg-slate-50 flex flex-col w-full max-w-[448px] mx-auto relative">
      <header className="bg-white border-b border-slate-200 px-4 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-800">Lista de Compras</h1>
          <span className="text-sm text-slate-500">
            {uncheckedCount} {uncheckedCount === 1 ? 'item' : 'itens'}
          </span>
        </div>
      </header>

      <main className="flex-1 overflow-hidden pb-20">
        <ShoppingList
          items={items}
          onAddItem={handleAddItem}
          onToggleItem={handleToggleItem}
          onDeleteItem={handleDeleteItem}
        />
      </main>

      {totalEstimate > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-lg">
          <div className="max-w-[448px] mx-auto flex justify-between items-center">
            <span className="text-slate-600 font-medium">Total estimado</span>
            <span className="text-xl font-bold text-slate-800">{formatCurrency(totalEstimate)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
