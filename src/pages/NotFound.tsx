import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Página não encontrada:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! Página não encontrada</p>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <a href="/">
            <Home className="h-4 w-4 mr-2" />
            Voltar ao Início
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
