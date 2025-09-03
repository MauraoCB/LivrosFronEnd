import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Loader2 } from "lucide-react";
import { Author } from "@/types";
import { useAuthors, useDeleteAuthor, useCreateAuthor, useUpdateAuthor } from "@/hooks/use-api";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Authors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNewAuthorDialogOpen, setIsNewAuthorDialogOpen] = useState(false);
  const [isEditAuthorDialogOpen, setIsEditAuthorDialogOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState({ name: "", nationality: "" });
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  
  const { data: authors = [], isLoading, error } = useAuthors();
  const deleteAuthorMutation = useDeleteAuthor();
  const createAuthorMutation = useCreateAuthor();
  const updateAuthorMutation = useUpdateAuthor();

  const filteredAuthors = authors.filter(author => 
    author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (author.nationality && author.nationality.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = (id: number) => {
    deleteAuthorMutation.mutate(id);
  };

  const handleCreateAuthor = async () => {
    if (!newAuthor.name.trim()) {
      alert('O nome do autor é obrigatório');
      return;
    }

    try {
      await createAuthorMutation.mutateAsync({
        name: newAuthor.name.trim(),
        nationality: newAuthor.nationality.trim() || undefined
      });
      
      // Limpar formulário e fechar modal
      setNewAuthor({ name: "", nationality: "" });
      setIsNewAuthorDialogOpen(false);
    } catch (error) {
      console.error('Erro ao criar autor:', error);
    }
  };

  const handleCancel = () => {
    setNewAuthor({ name: "", nationality: "" });
    setIsNewAuthorDialogOpen(false);
  };

  const handleEditAuthor = (author: Author) => {
    setEditingAuthor(author);
    setIsEditAuthorDialogOpen(true);
  };

  const handleUpdateAuthor = async () => {
    if (!editingAuthor || !editingAuthor.name.trim()) {
      alert('O nome do autor é obrigatório');
      return;
    }

    try {
      await updateAuthorMutation.mutateAsync({
        id: editingAuthor.id,
        author: {
          id: editingAuthor.id,
          name: editingAuthor.name.trim(),
          nationality: editingAuthor.nationality?.trim() || undefined
        }
      });
      
      // Fechar modal de edição
      setEditingAuthor(null);
      setIsEditAuthorDialogOpen(false);
    } catch (error) {
      console.error('Erro ao atualizar autor:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingAuthor(null);
    setIsEditAuthorDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Carregando autores...</span>
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
            {isNetworkError ? 'Erro de conexão' : 'Erro ao carregar autores'}
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
          <h1 className="text-3xl font-bold text-foreground">Autores</h1>
          <p className="text-muted-foreground mt-2">
            Cadastro de Autores
          </p>
        </div>
        
        {/* Modal para Novo Autor */}
        <Dialog open={isNewAuthorDialogOpen} onOpenChange={setIsNewAuthorDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Novo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Novo Autor</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  value={newAuthor.name}
                  onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                  className="col-span-3"
                  placeholder="Digite o nome do autor"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nationality" className="text-right">
                  Nacionalidade
                </Label>
                <Input
                  id="nationality"
                  value={newAuthor.nationality}
                  onChange={(e) => setNewAuthor({ ...newAuthor, nationality: e.target.value })}
                  className="col-span-3"
                  placeholder="Digite a nacionalidade"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button 
                onClick={handleCreateAuthor}
                disabled={createAuthorMutation.isPending}
              >
                {createAuthorMutation.isPending ? (
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
              placeholder="Buscar autores..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Authors Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Nacionalidade</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAuthors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-16 text-muted-foreground">
                    {searchTerm ? 'Nenhum autor encontrado.' : 'Nenhum autor cadastrado.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredAuthors.map((author) => (
                  <TableRow key={author.id}>
                    <TableCell className="font-medium">{author.name}</TableCell>
                    <TableCell>{author.nationality || '-'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditAuthor(author)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-destructive hover:text-destructive"
                              disabled={deleteAuthorMutation.isPending}
                            >
                              {deleteAuthorMutation.isPending ? (
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
                                Tem certeza que deseja excluir o autor "{author.name}"? 
                                Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(author.id)}
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

    {/* Modal para Editar Autor */}
    <Dialog open={isEditAuthorDialogOpen} onOpenChange={setIsEditAuthorDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Autor</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-name" className="text-right">
              Nome <span className="text-red-500">*</span>
            </Label>
            <Input
              id="edit-name"
              value={editingAuthor?.name || ""}
              onChange={(e) => setEditingAuthor(editingAuthor ? { ...editingAuthor, name: e.target.value } : null)}
              className="col-span-3"
              placeholder="Digite o nome do autor"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="edit-nationality" className="text-right">
              Nacionalidade
            </Label>
            <Input
              id="edit-nationality"
              value={editingAuthor?.nationality || ""}
              onChange={(e) => setEditingAuthor(editingAuthor ? { ...editingAuthor, nationality: e.target.value } : null)}
              className="col-span-3"
              placeholder="Digite a nacionalidade"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancelEdit}>
            Cancelar
          </Button>
          <Button
            onClick={handleUpdateAuthor}
            disabled={updateAuthorMutation.isPending}
          >
            {updateAuthorMutation.isPending ? (
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