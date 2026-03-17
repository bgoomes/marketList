import { useState } from 'react';
import type { ShoppingItem, CreateItemDTO } from '../types';

interface ShoppingListProps {
  items: ShoppingItem[];
  onAddItem: (item: CreateItemDTO) => void;
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function ShoppingList({ items, onAddItem, onToggleItem, onDeleteItem }: ShoppingListProps) {
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('1');
  const [newItemPrice, setNewItemPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    onAddItem({
      name: newItemName.trim(),
      quantity: parseInt(newItemQuantity) || 1,
      price: newItemPrice ? parseFloat(newItemPrice.replace(',', '.')) : undefined,
    });

    setNewItemName('');
    setNewItemQuantity('1');
    setNewItemPrice('');
  };

  const uncheckedItems = items.filter(item => !item.checked);
  const checkedItems = items.filter(item => item.checked);

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-white border-b border-slate-200 flex-shrink-0">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Adicionar item..."
          className="flex-1 min-w-0 px-4 py-3 text-base bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
        />
        <input
          type="number"
          min="1"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(e.target.value)}
          placeholder="Qtd"
          className="w-14 px-2 py-3 text-base text-center bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        <input
          type="text"
          inputMode="decimal"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(e.target.value)}
          placeholder="R$"
          className="w-20 px-2 py-3 text-base text-center bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
        <button
          type="submit"
          className="px-4 py-3 text-white bg-slate-700 rounded-lg font-medium active:bg-slate-800 transition-colors flex-shrink-0"
        >
          +
        </button>
      </form>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6">
        {uncheckedItems.length === 0 && checkedItems.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-lg">Nenhum item na lista</p>
            <p className="text-sm mt-1">Adicione itens acima</p>
          </div>
        )}

        {uncheckedItems.length > 0 && (
          <ul className="space-y-2">
            {uncheckedItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-slate-200 shadow-sm overflow-x-hidden"
              >
                <button
                  onClick={() => onToggleItem(item.id)}
                  className="w-6 h-6 rounded-full border-2 border-slate-300 flex-shrink-0 active:scale-95 transition-transform"
                />
                <span className="flex-1 min-w-0 text-slate-700 text-lg truncate">{item.name}</span>
                {item.quantity > 1 && (
                  <span className="text-slate-400 text-sm">x{item.quantity}</span>
                )}
                {item.price !== undefined && item.price > 0 && (
                  <span className="text-slate-500 text-sm font-medium">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                )}
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="p-2 text-slate-400 active:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}

        {checkedItems.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">
              Concluídos ({checkedItems.length})
            </h3>
            <ul className="space-y-2">
              {checkedItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100 overflow-x-hidden"
                >
                  <button
                    onClick={() => onToggleItem(item.id)}
                    className="w-6 h-6 rounded-full bg-slate-400 flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <span className="flex-1 min-w-0 text-slate-400 text-lg line-through truncate">{item.name}</span>
                  {item.price !== undefined && item.price > 0 && (
                    <span className="text-slate-400 text-sm line-through">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  )}
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-2 text-slate-300 active:text-red-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
