import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Loader2 } from "lucide-react";
import { Genre } from "@/types";
import { useGenres, useDeleteGenre, useCreateGenre, useUpdateGenre } from "@/hooks/use-api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Genres() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewGenreDialogOpen, setIsNewGenreDialogOpen] = useState(false);
  const [isEditGenreDialogOpen, setIsEditGenreDialogOpen] = useState(false);
  const [newGenre, setNewGenre] = useState({ name: "", description: "" });
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null);
  
  const { data: genres = [], isLoading, error } = useGenres();
  const deleteGenreMutation = useDeleteGenre();
  const createGenreMutation = useCreateGenre();
  const updateGenreMutation = useUpdateGenre();

  const filteredGenres = genres.filter(genre => 
    genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    genre.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    deleteGenreMutation.mutate(id);
  };

  const handleCreateGenre = async () => {
    if (!newGenre.name.trim()) {
      alert('O nome do gênero é obrigatório');
      return;
    }

    try {
      await createGenreMutation.mutateAsync({
        name: newGenre.name.trim(),
        description: newGenre.description.trim()
      });
      
      // Limpar formulário e fechar modal
      setNewGenre({ name: "", description: "" });
      setIsNewGenreDialogOpen(false);
    } catch (error) {
      console.error('Erro ao criar gênero:', error);
    }
  };

  const handleCancel = () => {
    setNewGenre({ name: "", description: "" });
    setIsNewGenreDialogOpen(false);
  };

  const handleEditGenre = (genre: Genre) => {
    setEditingGenre(genre);
    setIsEditGenreDialogOpen(true);
  };

  const handleUpdateGenre = async () => {
    if (!editingGenre || !editingGenre.name.trim()) {
      alert('O nome do gênero é obrigatório');
      return;
    }

    try {
      await updateGenreMutation.mutateAsync({
        id: editingGenre.id,
        genre: {
          id: editingGenre.id,
          name: editingGenre.name.trim(),
          description: editingGenre.description.trim()
        }
      });
      
      // Fechar modal de edição
      setEditingGenre(null);
      setIsEditGenreDialogOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar gênero:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingGenre(null);
    setIsEditGenreDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Carregando gêneros...</span>
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
            {isNetworkError ? 'Erro de conexão' : 'Erro ao carregar gêneros'}
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
          <h1 className="text-3xl font-bold text-foreground">Gêneros</h1>
          <p className="text-muted-foreground mt-2">
            Cadastro de Gêneros
          </p>
        </div>
        
        {/* Modal para Novo Gênero */}
        <Dialog open={isNewGenreDialogOpen} onOpenChange={setIsNewGenreDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Novo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Novo Gênero</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  value={newGenre.name}
                  onChange={(e) => setNewGenre({ ...newGenre, name: e.target.value })}
                  className="col-span-3"
                  placeholder="Digite o nome do gênero"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Descrição
                </Label>
                <Input
                  id="description"
                  value={newGenre.description}
                  onChange={(e) => setNewGenre({ ...newGenre, description: e.target.value })}
                  className="col-span-3"
                  placeholder="Digite a descrição do gênero"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button 
                onClick={handleCreateGenre}
                disabled={createGenreMutation.isPending}
              >
                {createGenreMutation.isPending ? (
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
              placeholder="Buscar gêneros..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Genres Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGenres.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-16 text-muted-foreground">
                    {searchTerm ? 'Nenhum gênero encontrado.' : 'Nenhum gênero cadastrado.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredGenres.map((genre) => (
                  <TableRow key={genre.id}>
                    <TableCell className="font-medium">{genre.name}</TableCell>
                    <TableCell>{genre.description}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditGenre(genre)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              disabled={deleteGenreMutation.isPending}
                            >
                              {deleteGenreMutation.isPending ? (
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
                                Tem certeza que deseja excluir o gênero "{genre.name}"? 
                                Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(genre.id)}
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

    {/* Modal para Editar Gênero */}
    <Dialog open={isEditGenreDialogOpen} onOpenChange={setIsEditGenreDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Gênero</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-name" className="text-right">
              Nome <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-name"
              value={editingGenre?.name || ""}
              onChange={(e) => setEditingGenre(editingGenre ? { ...editingGenre, name: e.target.value } : null)}
              className="col-span-3"
              placeholder="Digite o nome do gênero"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-description" className="text-right">
              Descrição
            </Label>
            <Input
              id="edit-description"
              value={editingGenre?.description || ""}
              onChange={(e) => setEditingGenre(editingGenre ? { ...editingGenre, description: e.target.value } : null)}
              className="col-span-3"
              placeholder="Digite a descrição do gênero"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancelEdit}>
            Cancelar
          </Button>
          <Button
            onClick={handleUpdateGenre}
            disabled={updateGenreMutation.isPending}
          >
            {updateGenreMutation.isPending ? (
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