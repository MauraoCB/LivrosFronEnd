# Frontend - Sistema de Gerenciamento de Livros

Este é o frontend do sistema de gerenciamento de livros, construído com React, TypeScript, Tailwind CSS e Shadcn/ui.

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
- Backend .NET rodando na porta 7001 (HTTPS)

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
   VITE_API_BASE_URL=https://localhost:7001/api/v1
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
   http://localhost:5173
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
```

## 🏗️ Arquitetura

### Estrutura de Pastas
```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/            # Componentes base do Shadcn/ui
│   ├── Layout.tsx     # Layout principal da aplicação
│   └── Sidebar.tsx    # Barra lateral de navegação
├── hooks/              # Hooks personalizados
│   └── use-api.ts     # Hooks para gerenciar chamadas da API
├── pages/              # Páginas da aplicação
│   ├── Books.tsx      # Listagem e gerenciamento de livros
│   ├── Authors.tsx    # Listagem e gerenciamento de autores
│   ├── Genres.tsx     # Listagem e gerenciamento de gêneros
│   └── Home.tsx       # Página inicial
├── services/           # Serviços
│   └── api.ts         # Serviço principal da API
├── types/              # Definições de tipos TypeScript
│   └── index.ts       # Tipos principais da aplicação
└── lib/                # Utilitários e configurações
```

### Gerenciamento de Estado

A aplicação utiliza **React Query (TanStack Query)** para:
- Cache de dados da API
- Gerenciamento de estado de loading e erro
- Invalidação automática de cache
- Sincronização de dados entre componentes

### Tratamento de Erros

- Validação de respostas HTTP
- Mensagens de erro amigáveis
- Toast notifications para feedback do usuário
- Estados de loading e erro em todas as operações

## 🚀 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run build:dev` - Gera build de desenvolvimento
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## 🔒 Configuração de Segurança

- CORS configurado no backend
- Validação de dados com Zod
- Sanitização de inputs
- Tratamento seguro de erros

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🧪 Testes

Para executar os testes:
```bash
npm run test
```

## 📦 Build de Produção

```bash
npm run build
```

O build será gerado na pasta `dist/` e pode ser servido por qualquer servidor web estático.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique se o backend está rodando
2. Confirme se a URL da API está correta no `.env.local`
3. Verifique o console do navegador para erros
4. Abra uma issue no repositório

## 🔄 Atualizações

Para manter o projeto atualizado:

```bash
npm update
# ou
yarn upgrade
# ou
bun update
```
