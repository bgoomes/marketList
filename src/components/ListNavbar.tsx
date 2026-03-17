import type { ShoppingList } from '../types';

interface ListNavbarProps {
  lists: ShoppingList[];
  activeListId: string | null;
  onSelectList: (id: string) => void;
  onCreateList: () => void;
  canCreate: boolean;
}

export function ListNavbar({ lists, activeListId, onSelectList, onCreateList, canCreate }: ListNavbarProps) {
  if (lists.length === 0) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200">
        <div className="max-w-[448px] mx-auto">
          <button
            onClick={onCreateList}
            className="w-full py-3 px-4 text-slate-600 font-medium flex items-center justify-center gap-2 active:bg-slate-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Criar primeira lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="max-w-[448px] mx-auto flex">
        {lists.map((list) => (
          <button
            key={list.id}
            onClick={() => onSelectList(list.id)}
            className={`flex-1 py-3 px-2 text-sm font-medium truncate transition-colors ${
              activeListId === list.id
                ? 'text-slate-800 bg-slate-50 border-t-2 border-slate-800'
                : 'text-slate-500 hover:text-slate-700 active:bg-slate-50'
            }`}
          >
            {list.name || 'Sem nome'}
          </button>
        ))}
        
        {canCreate && (
          <button
            onClick={onCreateList}
            className="flex-shrink-0 px-4 py-3 text-slate-400 active:text-slate-600 active:bg-slate-50 transition-colors"
            title="Nova lista"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
