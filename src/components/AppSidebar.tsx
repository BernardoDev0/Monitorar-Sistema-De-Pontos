import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CleanIcon } from "@/components/ui/clean-icon";

const items = [
  { title: "Equipe", url: "/admin", icon: "users" as const },
  { title: "Gráficos", url: "/admin/graficos", icon: "charts" as const },
  { title: "Registros", url: "/admin/registros", icon: "table" as const },
  
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { toast } = useToast();
  const { setTheme } = useTheme();
  const [themeChoice, setThemeChoice] = useState<'light' | 'dark-blue' | 'dark-gray'>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme-choice') as any : null;
    return saved === 'dark-gray' || saved === 'light' ? saved : 'dark-blue';
  });
  useEffect(() => {
    const root = document.documentElement;
    if (themeChoice === 'light') {
      setTheme('light');
      root.classList.remove('theme-blue', 'theme-gray');
    } else {
      setTheme('dark');
      root.classList.remove('theme-blue', 'theme-gray');
      root.classList.add(themeChoice === 'dark-blue' ? 'theme-blue' : 'theme-gray');
    }
    localStorage.setItem('theme-choice', themeChoice);
  }, [themeChoice, setTheme]);

  const isActive = (path: string) => currentPath === path;

  const handleLogout = () => {
    try {
      localStorage.removeItem("currentUser");
      toast({ title: "Logout realizado", description: "Você saiu da conta." });
    } catch (error) {
      console.warn('Erro ao realizar logout', error);
    }
    navigate("/login");
  };

  return (
    <Sidebar
      className="bg-card border-border overflow-hidden sidebar-60fps"
      collapsible="icon"
    >
      <SidebarHeader className="p-2 border-b border-border">
        <div className="h-12 flex items-center gap-2 px-2 sidebar-menu-optimized">
          <span className="text-foreground relative top-[2px]">
            <CleanIcon name="dashboard" size={22} />
          </span>
          <span className="text-lg font-semibold text-foreground group-data-[collapsible=icon]:hidden">
            Dashboard
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.url);
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.url)}
                      className={`
                        ${active 
                          ? 'bg-gradient-primary text-primary-foreground shadow-glow' 
                          : 'hover:bg-secondary/50 text-foreground hover:text-dashboard-primary'
                        }
                        smooth-transition h-12 sidebar-menu-optimized
                      `}
                    >
                      <span className="text-foreground">
                        <CleanIcon name={item.icon} size={18} />
                      </span>
                      <span className="font-medium">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-3 group-data-[collapsible=icon]:px-1">
        <div className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center sidebar-menu-optimized">
          {/* Theme Toggle */}
          <div className="group-data-[collapsible=icon]:hidden">
            <ToggleGroup type="single" value={themeChoice} onValueChange={(v) => v && setThemeChoice(v as any)} size="sm">
              <ToggleGroupItem value="dark-blue" aria-label="Azul Escuro" title="Azul Escuro" className="text-foreground data-[state=on]:bg-transparent data-[state=on]:text-foreground">
                <CleanIcon name="moon" size={16} />
              </ToggleGroupItem>
              <ToggleGroupItem value="dark-gray" aria-label="Cinza Escuro" title="Cinza Escuro" className="text-foreground data-[state=on]:bg-transparent data-[state=on]:text-foreground">
                <CleanIcon name="system" size={16} />
              </ToggleGroupItem>
              <ToggleGroupItem value="light" aria-label="Tema Claro" title="Tema Claro" className="text-foreground data-[state=on]:bg-transparent data-[state=on]:text-foreground">
                <CleanIcon name="sun" size={16} />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="group-data-[collapsible=icon]:hidden text-muted-foreground hover:text-red-500"
            title="Sair"
          >
            <span className="mr-1"><CleanIcon name="logout" size={16} /></span>
            Sair
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
