export interface Genre {
  id: number;
  name: string;
  description: string;
}

export interface Author {
  id: number;
  name: string;
  nationality?: string;
}

export interface Book {
  id: number;
  idGenre: number;
  idAuthor: number;
  title: string;
  synopsis?: string;
  isbn?: string;
  edition?: string;
  publicationYear?: number;
}

export interface BookViewModel {
  id: number;
  idGenre: number;
  idAuthor: number;
  title: string;
  synopsis?: string;
  isbn?: string;
  edition?: string;
  publicationYear?: number;
  creationDate?: string;
  updateDate?: string;
  updateUser?: string;
  authorName: string;
  genreName: string;
}

// Tipos para formulários
export interface CreateBookDto {
  idGenre: number;
  idAuthor: number;
  title: string;
  synopsis?: string;
  isbn?: string;
  edition?: string;
  publicationYear?: number;
}

export interface CreateAuthorDto {
  name: string;
  nationality?: string;
}

export interface CreateGenreDto {
  name: string;
  description: string;
}

// Tipos para atualização
export interface UpdateBookDto extends CreateBookDto {
  id: number;
}

export interface UpdateAuthorDto extends CreateAuthorDto {
  id: number;
}

export interface UpdateGenreDto extends CreateGenreDto {
  id: number;
}