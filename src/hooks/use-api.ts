import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { toast } from 'sonner';
import { Book, Author, Genre, BookViewModel, CreateBookDto, CreateAuthorDto, CreateGenreDto, UpdateBookDto, UpdateAuthorDto, UpdateGenreDto } from '../types';

// Hooks para Books
export const useBooks = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: () => apiService.getBooks(),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

export const useBook = (id: number) => {
  return useQuery({
    queryKey: ['books', id],
    queryFn: () => apiService.getBook(id),
    enabled: !!id,
  });
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (book: CreateBookDto) => apiService.createBook(book),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Livro criado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao criar livro: ${error.message}`);
    },
  });
};

export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, book }: { id: number; book: UpdateBookDto }) => 
      apiService.updateBook(id, book),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['books', id] });
      toast.success('Livro atualizado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar livro: ${error.message}`);
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiService.deleteBook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      toast.success('Livro excluído com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao excluir livro: ${error.message}`);
    },
  });
};

// Hooks para Authors
export const useAuthors = () => {
  return useQuery({
    queryKey: ['authors'],
    queryFn: () => apiService.getAuthors(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useAuthor = (id: number) => {
  return useQuery({
    queryKey: ['authors', id],
    queryFn: () => apiService.getAuthor(id),
    enabled: !!id,
  });
};

export const useCreateAuthor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (author: CreateAuthorDto) => apiService.createAuthor(author),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
      toast.success('Autor criado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao criar autor: ${error.message}`);
    },
  });
};

export const useUpdateAuthor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, author }: { id: number; author: UpdateAuthorDto }) => 
      apiService.updateAuthor(id, author),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
      queryClient.invalidateQueries({ queryKey: ['authors', id] });
      toast.success('Autor atualizado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar autor: ${error.message}`);
    },
  });
};

export const useDeleteAuthor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiService.deleteAuthor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authors'] });
      toast.success('Autor excluído com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao excluir autor: ${error.message}`);
    },
  });
};

// Hooks para Genres
export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => apiService.getGenres(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGenre = (id: number) => {
  return useQuery({
    queryKey: ['genres', id],
    queryFn: () => apiService.getGenre(id),
    enabled: !!id,
  });
};

export const useCreateGenre = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (genre: CreateGenreDto) => apiService.createGenre(genre),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });
      toast.success('Gênero criado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao criar gênero: ${error.message}`);
    },
  });
};

export const useUpdateGenre = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, genre }: { id: number; genre: UpdateGenreDto }) => 
      apiService.updateGenre(id, genre),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });
      queryClient.invalidateQueries({ queryKey: ['genres', id] });
      toast.success('Gênero atualizado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar gênero: ${error.message}`);
    },
  });
};

export const useDeleteGenre = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiService.deleteGenre(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });
      toast.success('Gênero excluído com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(`Erro ao excluir gênero: ${error.message}`);
    },
  });
};
