export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
  price?: number;
  checked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingList {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppData {
  lists: ShoppingList[];
  activeListId: string | null;
  items: Record<string, ShoppingItem[]>;
}

export interface CreateItemDTO {
  name: string;
  quantity: number;
  unit?: string;
  price?: number;
}

export interface UpdateItemDTO {
  name?: string;
  quantity?: number;
  unit?: string;
  price?: number;
  checked?: boolean;
}

export interface CreateListDTO {
  name: string;
}

export interface UpdateListDTO {
  name?: string;
}
