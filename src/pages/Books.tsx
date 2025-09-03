import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Loader2 } from "lucide-react";
import { BookViewModel } from "@/types";
import { useBooks, useDeleteBook, useCreateBook, useUpdateBook, useAuthors, useGenres } from "@/hooks/use-api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Books() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewBookDialogOpen, setIsNewBookDialogOpen] = useState(false);
  const [isEditBookDialogOpen, setIsEditBookDialogOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    synopsis: "",
    isbn: "",
    publicationYear: "",
    edition: "",
    idAuthor: 0,
    idGenre: 0
  });
  const [editingBook, setEditingBook] = useState<BookViewModel | null>(null);
  
  const { data: books = [], isLoading, error } = useBooks();
  const { data: authors = [] } = useAuthors();
  const { data: genres = [] } = useGenres();
  const deleteBookMutation = useDeleteBook();
  const createBookMutation = useCreateBook();
  const updateBookMutation = useUpdateBook();

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genreName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (book.isbn && book.isbn.includes(searchTerm))
  );

  const handleDelete = (id: number) => {
    deleteBookMutation.mutate(id);
  };

  const handleCreateBook = async () => {
    if (!newBook.title.trim()) {
      alert('O título do livro é obrigatório');
      return;
    }

    if (!newBook.synopsis.trim()) {
      alert('A sinopse do livro é obrigatória');
      return;
    }

    if (!newBook.isbn.trim()) {
      alert('O ISBN do livro é obrigatório');
      return;
    }

    if (!newBook.idAuthor) {
      alert('Selecione um autor');
      return;
    }

    if (!newBook.idGenre) {
      alert('Selecione um gênero');
      return;
    }

    try {
      await createBookMutation.mutateAsync({
        title: newBook.title.trim(),
        synopsis: newBook.synopsis.trim(),
        isbn: newBook.isbn.trim(),
        publicationYear: newBook.publicationYear ? parseInt(newBook.publicationYear) : undefined,
        edition: newBook.edition.trim() || undefined,
        idAuthor: newBook.idAuthor,
        idGenre: newBook.idGenre
      });
      
      // Limpar formulário e fechar modal
      setNewBook({
        title: "",
        synopsis: "",
        isbn: "",
        publicationYear: "",
        edition: "",
        idAuthor: 0,
        idGenre: 0
      });
      setIsNewBookDialogOpen(false);
    } catch (error) {
      console.error('Erro ao criar livro:', error);
    }
  };

  const handleCancel = () => {
    setNewBook({
      title: "",
      synopsis: "",
      isbn: "",
      publicationYear: "",
      edition: "",
      idAuthor: 0,
      idGenre: 0
    });
    setIsNewBookDialogOpen(false);
  };

  const handleEditBook = (book: BookViewModel) => {
    setEditingBook(book);
    setIsEditBookDialogOpen(true);
  };

  const handleUpdateBook = async () => {
    if (!editingBook || !editingBook.title.trim()) {
      alert('O título do livro é obrigatório');
      return;
    }

    if (!editingBook.synopsis?.trim()) {
      alert('A sinopse do livro é obrigatória');
      return;
    }

    if (!editingBook.isbn?.trim()) {
      alert('O ISBN do livro é obrigatório');
      return;
    }

    if (!editingBook.idAuthor) {
      alert('Selecione um autor');
      return;
    }

    if (!editingBook.idGenre) {
      alert('Selecione um gênero');
      return;
    }

    try {
      await updateBookMutation.mutateAsync({
        id: editingBook.id,
        book: {
          id: editingBook.id,
          title: editingBook.title.trim(),
          synopsis: editingBook.synopsis.trim(),
          isbn: editingBook.isbn.trim(),
          publicationYear: editingBook.publicationYear,
          edition: editingBook.edition?.trim() || undefined,
          idAuthor: editingBook.idAuthor,
          idGenre: editingBook.idGenre
        }
      });
      
      // Fechar modal de edição
      setEditingBook(null);
      setIsEditBookDialogOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
    setIsEditBookDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Carregando livros...</span>
        </div>
      </div>
    );
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro inesperado';
    const isNetworkError = errorMessage.includes('Não foi possível conectar') || errorMessage.includes('Failed to fetch');
    
    return (
      <div className="p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-destructive">
            {isNetworkError ? 'Erro de conexão' : 'Erro ao carregar livros'}
          </h2>
          <p className="text-muted-foreground mt-2">
            {errorMessage}
          </p>
          {isNetworkError && (
            <p className="text-sm text-muted-foreground mt-2">
              Verifique se a API está rodando em {import.meta.env.VITE_API_BASE_URL || 'http://localhost:5070/api/v1'}
            </p>
          )}
          <Button 
            onClick={() => window.location.reload()} 
            className="mt-4"
            variant="outline"
          >
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Livros</h1>
          <p className="text-muted-foreground mt-2">
           Cadastro de Livros
          </p>
        </div>
        
        {/* Modal para Novo Livro */}
        <Dialog open={isNewBookDialogOpen} onOpenChange={setIsNewBookDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Novo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Novo Livro</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Título <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  className="col-span-3"
                  placeholder="Digite o título do livro"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="synopsis" className="text-right">
                  Sinopse <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="synopsis"
                  value={newBook.synopsis}
                  onChange={(e) => setNewBook({ ...newBook, synopsis: e.target.value })}
                  className="col-span-3"
                  placeholder="Digite a sinopse do livro"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isbn" className="text-right">
                  ISBN <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="isbn"
                  value={newBook.isbn}
                  onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                  className="col-span-3"
                  placeholder="Digite o ISBN do livro"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="publicationYear" className="text-right">
                  Ano
                </Label>
                <Input
                  id="publicationYear"
                  type="number"
                  min="1000"
                  max="2100"
                  value={newBook.publicationYear}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || (/^\d{4}$/.test(value) && parseInt(value) >= 1000 && parseInt(value) <= 2100)) {
                      setNewBook({ ...newBook, publicationYear: value });
                    }
                  }}
                  className="col-span-3"
                  placeholder="Digite o ano de publicação (ex: 2024)"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edition" className="text-right">
                  Edição
                </Label>
                <Input
                  id="edition"
                  value={newBook.edition}
                  onChange={(e) => setNewBook({ ...newBook, edition: e.target.value })}
                  className="col-span-3"
                  placeholder="Digite a edição do livro"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">
                  Autor <span className="text-red-500">*</span>
                </Label>
                <Select value={newBook.idAuthor.toString()} onValueChange={(value) => setNewBook({ ...newBook, idAuthor: parseInt(value) })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um autor" />
                  </SelectTrigger>
                  <SelectContent>
                    {authors.map((author) => (
                      <SelectItem key={author.id} value={author.id.toString()}>
                        {author.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="genre" className="text-right">
                  Gênero <span className="text-red-500">*</span>
                </Label>
                <Select value={newBook.idGenre.toString()} onValueChange={(value) => setNewBook({ ...newBook, idGenre: parseInt(value) })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione um gênero" />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre.id} value={genre.id.toString()}>
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button 
                onClick={handleCreateBook}
                disabled={createBookMutation.isPending}
              >
                {createBookMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar livros..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Books Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Gênero</TableHead>
                <TableHead>ISBN</TableHead>
                <TableHead>Ano</TableHead>
                <TableHead>Edição</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-16 text-muted-foreground">
                    {searchTerm ? 'Nenhum livro encontrado.' : 'Nenhum livro cadastrado.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.authorName}</TableCell>
                    <TableCell>{book.genreName}</TableCell>
                    <TableCell className="font-mono text-sm">{book.isbn || '-'}</TableCell>
                    <TableCell>{book.publicationYear || '-'}</TableCell>
                    <TableCell>{book.edition || '-'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditBook(book)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              disabled={deleteBookMutation.isPending}
                            >
                              {deleteBookMutation.isPending ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o livro "{book.title}"? 
                                Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(book.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
                      </TableBody>
        </Table>
      </CardContent>
    </Card>

    {/* Modal para Editar Livro */}
    <Dialog open={isEditBookDialogOpen} onOpenChange={setIsEditBookDialogOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Editar Livro</DialogTitle>
        </DialogHeader>
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            <span className="text-red-500">*</span> Campos obrigatórios
          </p>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-title" className="text-right">
              Título <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-title"
              value={editingBook?.title || ""}
              onChange={(e) => setEditingBook(editingBook ? { ...editingBook, title: e.target.value } : null)}
              className="col-span-3"
              placeholder="Digite o título do livro"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-synopsis" className="text-right">
              Sinopse <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-synopsis"
              value={editingBook?.synopsis || ""}
              onChange={(e) => setEditingBook(editingBook ? { ...editingBook, synopsis: e.target.value } : null)}
              className="col-span-3"
              placeholder="Digite a sinopse do livro"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-isbn" className="text-right">
              ISBN <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-isbn"
              value={editingBook?.isbn || ""}
              onChange={(e) => setEditingBook(editingBook ? { ...editingBook, isbn: e.target.value } : null)}
              className="col-span-3"
              placeholder="Digite o ISBN do livro"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-publicationYear" className="text-right">
              Ano
            </Label>
            <Input
              id="edit-publicationYear"
              type="number"
              min="1000"
              max="2100"
              value={editingBook?.publicationYear || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || (/^\d{4}$/.test(value) && parseInt(value) >= 1000 && parseInt(value) <= 2100)) {
                  setEditingBook(editingBook ? { ...editingBook, publicationYear: parseInt(value) || undefined } : null);
                }
              }}
              className="col-span-3"
              placeholder="Digite o ano de publicação (ex: 2024)"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-edition" className="text-right">
              Edição
            </Label>
            <Input
              id="edit-edition"
              value={editingBook?.edition || ""}
              onChange={(e) => setEditingBook(editingBook ? { ...editingBook, edition: e.target.value } : null)}
              className="col-span-3"
              placeholder="Digite a edição do livro"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-author" className="text-right">
              Autor <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={editingBook?.idAuthor.toString() || ""} 
              onValueChange={(value) => setEditingBook(editingBook ? { ...editingBook, idAuthor: parseInt(value) } : null)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um autor" />
              </SelectTrigger>
              <SelectContent>
                {authors.map((author) => (
                  <SelectItem key={author.id} value={author.id.toString()}>
                    {author.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-genre" className="text-right">
              Gênero <span className="text-red-500">*</span>
            </Label>
            <Select 
              value={editingBook?.idGenre.toString() || ""} 
              onValueChange={(value) => setEditingBook(editingBook ? { ...editingBook, idGenre: parseInt(value) } : null)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um gênero" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((genre) => (
                  <SelectItem key={genre.id} value={genre.id.toString()}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancelEdit}>
            Cancelar
          </Button>
          <Button
            onClick={handleUpdateBook}
            disabled={updateBookMutation.isPending}
          >
            {updateBookMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              'Salvar'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
);
}