import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Tag, ArrowRight, Library, Heart } from "lucide-react";
import { mockBooks, mockAuthors, mockGenres } from "@/data/mockData";
import { Link } from "react-router-dom";
import bookshelfImage from "@/assets/bookshelf.jpg";

export default function Home() {
  const stats = [
    {
      title: "Livros",
      value: mockBooks.length,
      icon: BookOpen,
      color: "text-primary",
      href: "/books"
    },
    {
      title: "Autores", 
      value: mockAuthors.length,
      icon: Users,
      color: "text-success",
      href: "/authors"
    },
    {
      title: "Gêneros",
      value: mockGenres.length, 
      icon: Tag,
      color: "text-accent",
      href: "/genres"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-background to-accent/5">
        <div className="relative px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Welcome Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-primary">
                    <Library className="h-6 w-6" />
                    <span className="font-semibold">Biblioteca</span>
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                    Bem-vindo(a)
                    <span className="text-primary block">Biblioteca Digital</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Cadastro rápido e fácil de livros, autores e gêneros</p>
                </div>

    
              </div>

              {/* Bookshelf Image */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-card border border-border">
                  <img 
                    src={bookshelfImage} 
                    alt="Estante de livros acolhedora" 
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                
                {/* Floating stats */}
                <div className="absolute -bottom-6 left-6 right-6">
                  <Card className="backdrop-blur-sm bg-card/95 border border-border shadow-lg">
                  
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="px-8 py-12">
        <div className="max-w-6xl mx-auto">
      
          
        </div>
      </div>
  
      
    </div>
  );
}