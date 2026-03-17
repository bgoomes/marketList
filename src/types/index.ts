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
  items: ShoppingItem[];
  createdAt: string;
  updatedAt: string;
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
