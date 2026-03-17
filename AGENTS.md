# Lista Mercado - Shopping List App

## Overview
A mobile-first shopping list application built with React, TypeScript, and Tailwind CSS. Designed with neutral colors and optimized for mobile usability.

## Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Persistence**: localStorage

## Project Structure

```
src/
├── components/
│   └── ShoppingList.tsx    # Main shopping list component
├── services/
│   └── shoppingListService.ts  # API service layer (for future backend integration)
├── types/
│   └── index.ts           # TypeScript interfaces
├── App.tsx                # Main application component
├── index.css              # Global styles with Tailwind
└── main.tsx               # Entry point
```

## Features
- ✅ Add/remove shopping items
- ✅ Mark items as completed
- ✅ Price field per item (value per unit)
- ✅ Total estimate calculation (fixed footer)
- ✅ Mobile-first responsive design
- ✅ localStorage persistence
- ✅ Service layer prepared for future API integration

## Types

```typescript
interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
  price?: number;
  checked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateItemDTO {
  name: string;
  quantity: number;
  unit?: string;
  price?: number;
}
```

## API Service
The `shoppingListService.ts` is prepared for future backend integration with endpoints:
- `GET /lists` - Get all lists
- `GET /lists/:id` - Get list by ID
- `POST /lists` - Create new list
- `DELETE /lists/:id` - Delete list
- `POST /lists/:id/items` - Add item to list
- `PATCH /lists/:id/items/:itemId` - Update item
- `DELETE /lists/:id/items/:itemId` - Delete item

To enable, set `VITE_API_URL` environment variable.

## Design Decisions
- **Colors**: Neutral slate tones for a clean look
- **Mobile-first**: Optimized for touch interactions, large tap targets
- **Viewport**: Uses `100dvh` for proper mobile viewport handling
- **Max width**: 448px centered container for tablet/desktop

## Next Steps (Developer Branch)
- [ ] Add multiple shopping lists support
- [ ] Implement backend API integration
- [ ] Add user authentication
- [ ] Add item categories
- [ ] Share list functionality
- [ ] Offline support with Service Worker
