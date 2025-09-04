# Frontend - Sistema de Gerenciamento de Livros

Este é o frontend do sistema de gerenciamento de livros, construído com React, TypeScript e CSS.

### Criado em 03/09/2025
### Por José Mauro da Silva


## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/ui** - Componentes de UI reutilizáveis
- **React Query (TanStack Query)** - Gerenciamento de estado e cache de dados
- **React Router** - Roteamento da aplicação
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas

## 📋 Pré-requisitos

- Node.js 18+ 
- npm, yarn ou bun
- Backend .NET rodando na porta 5070 (HTTPS)

## 🛠️ Instalação

1. **Clone o repositório e navegue para a pasta:**
   ```bash
   cd LivrosFronEnd
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   bun install
   ```

3. **Configure as variáveis de ambiente:**
   
   Crie um arquivo `.env.local` na raiz do projeto:
   ```env
   VITE_API_BASE_URL=https://localhost:5070/api/v1
   ```

   **Importante:** Certifique-se de que o backend esteja rodando na porta 7001 com HTTPS.

4. **Execute o projeto:**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   bun dev
   ```

5. **Acesse a aplicação:**
   ```
   http://localhost:8080
   ```

## 🔧 Configuração da API

### Endpoints Disponíveis

#### Books API (`/api/v1/books`)
- `GET /books` - Listar todos os livros
- `GET /books/{id}` - Buscar livro por ID
- `POST /books` - Criar novo livro
- `PUT /books/{id}` - Atualizar livro
- `DELETE /books/{id}` - Deletar livro

#### Authors API (`/api/v1/authors`)
- `GET /authors` - Listar todos os autores
- `GET /authors/{id}` - Buscar autor por ID
- `POST /authors` - Criar novo autor
- `PUT /authors/{id}` - Atualizar autor
- `DELETE /authors/{id}` - Deletar autor

#### Genres API (`/api/v1/genres`)
- `GET /genres` - Listar todos os gêneros
- `GET /genres/{id}` - Buscar gênero por ID
- `POST /genres` - Criar novo gênero
- `PUT /genres/{id}` - Atualizar gênero
- `DELETE /genres/{id}` - Deletar gênero

### Estrutura de Dados

#### Book
```typescript
interface Book {
  id: number;
  idGenre: number;
  idAuthor: number;
  title: string;
  synopsis?: string;
  isbn?: string;
  edition?: string;
  publicationYear?: number;
}
```

#### Author
```typescript
interface Author {
  id: number;
  name: string;
  nationality?: string;
}
```

#### Genre
```typescript
interface Genre {
  id: number;
  name: string;
  description: string;
}

## 🚀 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run build:dev` - Gera build de desenvolvimento
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter


Para executar os testes:
```bash
npm run test
```

## 📦 Build de Produção

```bash
npm run build
```

O build será gerado na pasta `dist/` e pode ser servido por qualquer servidor web estático.
