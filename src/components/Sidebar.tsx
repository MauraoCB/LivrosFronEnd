import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BookOpen, Users, Tag, Home, Library } from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Livros", href: "/books", icon: BookOpen },
  { name: "Autores", href: "/authors", icon: Users },
  { name: "Gêneros", href: "/genres", icon: Tag },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-border">
        <Library className="h-8 w-8 text-primary" />
        <span className="ml-3 text-xl font-semibold text-foreground">
          Siemens Energy
        </span>
      </div>
      
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5",
                  isActive ? "text-primary-foreground" : "text-muted-foreground"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Sistema de Gerenciamento de Biblioteca
        </div>
      </div>
    </div>
  );
}