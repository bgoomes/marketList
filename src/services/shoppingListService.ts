import type { CreateItemDTO, UpdateItemDTO, ShoppingItem, ShoppingList } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export const shoppingListService = {
  getLists: () => fetchApi<ShoppingList[]>('/lists'),
  
  getListById: (id: string) => fetchApi<ShoppingList>(`/lists/${id}`),
  
  createList: (name: string) => 
    fetchApi<ShoppingList>('/lists', {
      method: 'POST',
      body: JSON.stringify({ name }),
    }),
  
  deleteList: (id: string) => 
    fetchApi<void>(`/lists/${id}`, { method: 'DELETE' }),
  
  addItem: (listId: string, item: CreateItemDTO) =>
    fetchApi<ShoppingItem>(`/lists/${listId}/items`, {
      method: 'POST',
      body: JSON.stringify(item),
    }),
  
  updateItem: (listId: string, itemId: string, updates: UpdateItemDTO) =>
    fetchApi<ShoppingItem>(`/lists/${listId}/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),
  
  deleteItem: (listId: string, itemId: string) =>
    fetchApi<void>(`/lists/${listId}/items/${itemId}`, { method: 'DELETE' }),
};
