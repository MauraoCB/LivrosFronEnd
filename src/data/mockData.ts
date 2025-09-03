import { Genre, Author, Book } from "@/types";

export const mockGenres: Genre[] = [
  {
    id: 1,
    name: "Ficção Científica",
    description: "Livros que exploram conceitos futuristas e tecnológicos"
  },
  {
    id: 2, 
    name: "Romance",
    description: "Histórias focadas em relacionamentos e emoções"
  },
  {
    id: 3,
    name: "Fantasia",
    description: "Mundos mágicos e criaturas extraordinárias"
  },
  {
    id: 4,
    name: "Biografia",
    description: "Histórias reais de pessoas marcantes"
  }
];

export const mockAuthors: Author[] = [
  {
    id: 1,
    name: "Isaac Asimov",
    nationality: "Americano"
  },
  {
    id: 2,
    name: "Jane Austen", 
    nationality: "Inglesa"
  },
  {
    id: 3,
    name: "J.R.R. Tolkien",
    nationality: "Britânico"
  },
  {
    id: 4,
    name: "Walter Isaacson",
    nationality: "Americano"
  }
];

export const mockBooks: Book[] = [
  {
    id: 1,
    title: "Fundação",
    isbn: "978-85-359-0277-4",
    publicationYear: 1951,
    synopsis: "Primeira obra da famosa série Fundação de Isaac Asimov",
    idGenre: 1,
    idAuthor: 1
  },
  {
    id: 2,
    title: "Orgulho e Preconceito",
    isbn: "978-85-250-4623-1", 
    publicationYear: 1813,
    synopsis: "Romance clássico sobre Elizabeth Bennet e Sr. Darcy",
    idGenre: 2,
    idAuthor: 2
  },
  {
    id: 3,
    title: "O Senhor dos Anéis",
    isbn: "978-85-8057-937-2",
    publicationYear: 1954,
    synopsis: "Épica aventura na Terra Média com hobbits, elfos e magos",
    idGenre: 3, 
    idAuthor: 3
  },
  {
    id: 4,
    title: "Steve Jobs",
    isbn: "978-85-359-1970-3",
    publicationYear: 2011,
    synopsis: "Biografia autorizada do co-fundador da Apple",
    idGenre: 4,
    idAuthor: 4
  }
];