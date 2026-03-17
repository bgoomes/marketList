# Lista Mercado 🛒

Aplicativo de lista de compras mobile-first construído com React, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápida
- **Tailwind CSS** - Estilização utilitária
- **localStorage** - Persistência de dados

## ✨ Funcionalidades

- ✅ Adicionar e remover itens da lista
- ✅ Marcar itens como concluídos
- ✅ Campo de preço por item
- ✅ Cálculo total estimado (rodapé fixo)
- ✅ Design mobile-first com cores neutras
- ✅ Persistência localStorage
- ✅ Estrutura pronta para API futura

## 📱 Design

- Cores neutras (tons de slate)
- Otimizado para touch
- Alvos de toque grandes
- Viewport dinâmico (100dvh)
- Container máximo de 448px

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/lista-mercado.git

# Entre na pasta
cd lista-mercado

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 📦 Build

```bash
# Build para produção
npm run build
```

## 📂 Estrutura do Projeto

```
src/
├── components/
│   └── ShoppingList.tsx    # Componente principal da lista
├── services/
│   └── shoppingListService.ts  # Camada de serviço para API
├── types/
│   └── index.ts           # Interfaces TypeScript
├── App.tsx                # Componente principal
├── index.css              # Estilos globais
└── main.tsx               # Ponto de entrada
```

## 🔌 Integração com API

O projeto já possui uma camada de serviço (`services/shoppingListService.ts`) preparada para integração com backend. Para habilitar:

1. Defina a variável de ambiente `VITE_API_URL`
2. Implemente os endpoints conforme documentação no código

Endpoints esperados:
- `GET /api/lists` - Listar todas as listas
- `POST /api/lists` - Criar lista
- `GET /api/lists/:id` - Obter lista
- `DELETE /api/lists/:id` - Deletar lista
- `POST /api/lists/:id/items` - Adicionar item
- `PATCH /api/lists/:id/items/:itemId` - Atualizar item
- `DELETE /api/lists/:id/items/:itemId` - Deletar item

## 📄 Licença

MIT
