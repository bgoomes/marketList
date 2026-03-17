import { useState, useEffect } from 'react';
import { ShoppingList } from './components/ShoppingList';
import { ListNavbar } from './components/ListNavbar';
import type { ShoppingItem, CreateItemDTO, AppData, ShoppingList as ShoppingListType } from './types';

const MAX_LISTS = 4;

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
  const [appData, setAppData] = useState<AppData>(() => {
    const saved = localStorage.getItem('lista-mercado-data');
    return saved ? JSON.parse(saved) : { lists: [], activeListId: null, items: {} };
  });

  useEffect(() => {
    localStorage.setItem('lista-mercado-data', JSON.stringify(appData));
  }, [appData]);

  const { lists, activeListId, items } = appData;
  const activeItems = activeListId ? items[activeListId] || [] : [];
  const activeList = lists.find(l => l.id === activeListId);

  const handleCreateList = () => {
    if (lists.length >= MAX_LISTS) return;

    const newList: ShoppingListType = {
      id: generateId(),
      name: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setAppData(prev => ({
      ...prev,
      lists: [newList, ...prev.lists],
      activeListId: newList.id,
      items: { ...prev.items, [newList.id]: [] },
    }));
  };

  const handleSelectList = (id: string) => {
    setAppData(prev => ({ ...prev, activeListId: id }));
  };

  const handleUpdateListName = (id: string, name: string) => {
    setAppData(prev => ({
      ...prev,
      lists: prev.lists.map(list =>
        list.id === id ? { ...list, name, updatedAt: new Date().toISOString() } : list
      ),
    }));
  };

  const handleDeleteList = (id: string) => {
    setAppData(prev => {
      const newItems = { ...prev.items };
      delete newItems[id];
      const newLists = prev.lists.filter(list => list.id !== id);
      const newActiveId = prev.activeListId === id 
        ? (newLists.length > 0 ? newLists[0].id : null)
        : prev.activeListId;
      
      return { lists: newLists, activeListId: newActiveId, items: newItems };
    });
  };

  const handleAddItem = (dto: CreateItemDTO) => {
    if (!activeListId) return;

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

    setAppData(prev => ({
      ...prev,
      items: {
        ...prev.items,
        [activeListId]: [...(prev.items[activeListId] || []), newItem],
      },
    }));
  };

  const handleToggleItem = (id: string) => {
    if (!activeListId) return;

    setAppData(prev => ({
      ...prev,
      items: {
        ...prev.items,
        [activeListId]: (prev.items[activeListId] || []).map(item =>
          item.id === id
            ? { ...item, checked: !item.checked, updatedAt: new Date().toISOString() }
            : item
        ),
      },
    }));
  };

  const handleDeleteItem = (id: string) => {
    if (!activeListId) return;

    setAppData(prev => ({
      ...prev,
      items: {
        ...prev.items,
        [activeListId]: (prev.items[activeListId] || []).filter(item => item.id !== id),
      },
    }));
  };

  const uncheckedCount = activeItems.filter(item => !item.checked).length;
  const totalEstimate = activeItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  const canCreateNewList = lists.length < MAX_LISTS;

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

      <main className="flex-1 overflow-hidden pb-36">
        {activeListId && activeList ? (
          <ShoppingList
            items={activeItems}
            onAddItem={handleAddItem}
            onToggleItem={handleToggleItem}
            onDeleteItem={handleDeleteItem}
            listName={activeList.name}
            listId={activeListId}
            onUpdateListName={handleUpdateListName}
            onDeleteList={() => handleDeleteList(activeListId)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-slate-500 text-lg mb-2">Nenhuma lista criada</p>
            <p className="text-slate-400 text-sm">Crie sua primeira lista de compras</p>
          </div>
        )}
      </main>

      {totalEstimate > 0 && (
        <div className="fixed bottom-14 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-lg">
          <div className="max-w-[448px] mx-auto flex justify-between items-center">
            <span className="text-slate-600 font-medium">Total estimado</span>
            <span className="text-xl font-bold text-slate-800">{formatCurrency(totalEstimate)}</span>
          </div>
        </div>
      )}

      <ListNavbar
        lists={lists}
        activeListId={activeListId}
        onSelectList={handleSelectList}
        onCreateList={handleCreateList}
        canCreate={canCreateNewList}
      />
    </div>
  );
}

export default App;
