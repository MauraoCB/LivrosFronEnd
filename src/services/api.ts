import { Book, Author, Genre, BookViewModel, CreateBookDto, CreateAuthorDto, CreateGenreDto, UpdateBookDto, UpdateAuthorDto, UpdateGenreDto } from '../types';
import { mockAuthors, mockBooks, mockGenres } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5070/api/v1';

class ApiService {
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Recurso não encontrado');
        }
        if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Dados inválidos');
        }
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      // Para operações que não retornam conteúdo (DELETE, PUT)
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      console.error('Erro na requisição para:', url, error);
      
      // Se for erro de rede (Failed to fetch), fornecer mensagem mais clara
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(`Não foi possível conectar com a API em ${this.baseUrl}. Verifique se o servidor está rodando.`);
      }
      
      throw error;
    }
  }

  // Books API
  async getBooks(): Promise<BookViewModel[]> {
    try {
      return await this.request<BookViewModel[]>('/books');
    } catch (error) {
      console.log('API não disponível, usando dados mockados para livros');
      // Converter mock data para BookViewModel
      return mockBooks.map(book => ({
        id: book.id,
        idGenre: book.idGenre,
        idAuthor: book.idAuthor,
        title: book.title,
        synopsis: book.synopsis,
        isbn: book.isbn,
        edition: book.edition,
        publicationYear: book.publicationYear,
        authorName: mockAuthors.find(a => a.id === book.idAuthor)?.name || 'Autor desconhecido',
        genreName: mockGenres.find(g => g.id === book.idGenre)?.name || 'Gênero desconhecido'
      }));
    }
  }

  async getBook(id: number): Promise<BookViewModel> {
    try {
      return await this.request<BookViewModel>(`/books/${id}`);
    } catch (error) {
      console.log('API não disponível, usando dados mockados para livro');
      const book = mockBooks.find(b => b.id === id);
      if (!book) throw new Error('Livro não encontrado');
      
      return {
        id: book.id,
        idGenre: book.idGenre,
        idAuthor: book.idAuthor,
        title: book.title,
        synopsis: book.synopsis,
        isbn: book.isbn,
        edition: book.edition,
        publicationYear: book.publicationYear,
        authorName: mockAuthors.find(a => a.id === book.idAuthor)?.name || 'Autor desconhecido',
        genreName: mockGenres.find(g => g.id === book.idGenre)?.name || 'Gênero desconhecido'
      };
    }
  }

  async createBook(book: CreateBookDto): Promise<Book> {
    return this.request<Book>('/books', {
      method: 'POST',
      body: JSON.stringify(book),
    });
  }

  async updateBook(id: number, book: UpdateBookDto): Promise<void> {
    return this.request<void>(`/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(book),
    });
  }

  async deleteBook(id: number): Promise<void> {
    return this.request<void>(`/books/${id}`, {
      method: 'DELETE',
    });
  }

  // Authors API
  async getAuthors(): Promise<Author[]> {
    try {
      return await this.request<Author[]>('/authors');
    } catch (error) {
      console.log('API não disponível, usando dados mockados para autores');
      return mockAuthors;
    }
  }

  async getAuthor(id: number): Promise<Author> {
    try {
      return await this.request<Author>(`/authors/${id}`);
    } catch (error) {
      console.log('API não disponível, usando dados mockados para autor');
      const author = mockAuthors.find(a => a.id === id);
      if (!author) throw new Error('Autor não encontrado');
      return author;
    }
  }

  async createAuthor(author: CreateAuthorDto): Promise<Author> {
    return this.request<Author>('/authors', {
      method: 'POST',
      body: JSON.stringify(author),
    });
  }

  async updateAuthor(id: number, author: UpdateAuthorDto): Promise<void> {
    return this.request<void>(`/authors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(author),
    });
  }

  async deleteAuthor(id: number): Promise<void> {
    return this.request<void>(`/authors/${id}`, {
      method: 'DELETE',
    });
  }

  // Genres API
  async getGenres(): Promise<Genre[]> {
    try {
      return await this.request<Genre[]>('/genres');
    } catch (error) {
      console.log('API não disponível, usando dados mockados para gêneros');
      return mockGenres;
    }
  }

  async getGenre(id: number): Promise<Genre> {
    try {
      return await this.request<Genre>(`/genres/${id}`);
    } catch (error) {
      console.log('API não disponível, usando dados mockados para gênero');
      const genre = mockGenres.find(g => g.id === id);
      if (!genre) throw new Error('Gênero não encontrado');
      return genre;
    }
  }

  async createGenre(genre: CreateGenreDto): Promise<Genre> {
    return this.request<Genre>('/genres', {
      method: 'POST',
      body: JSON.stringify(genre),
    });
  }

  async updateGenre(id: number, genre: UpdateGenreDto): Promise<void> {
    return this.request<void>(`/genres/${id}`, {
      method: 'PUT',
      body: JSON.stringify(genre),
    });
  }

  async deleteGenre(id: number): Promise<void> {
    return this.request<void>(`/genres/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
