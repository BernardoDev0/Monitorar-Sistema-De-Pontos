# Plano de Implementação: Modo Claro/Escuro com Ícones

## Objetivo
- Adicionar suporte a tema claro e escuro.
- Escuro como padrão, mantendo o visual atual do dashboard.
- Implementar um botão moderno com ícones para alternar entre os modos.
- Persistir preferência do usuário e suportar “system”.

## Abordagem Técnica
- Biblioteca: next-themes (já presente em dependencies).
- Mecanismo: alternar classe `dark` no HTML para ativar variáveis CSS do Tailwind (`darkMode: "class"`).
- Tokens: usar variáveis HSL existentes em [index.css](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/index.css) para ambos os temas.

## Mudanças Planejadas (Arquivos)
- Envolvimento da aplicação com ThemeProvider:
  - [App.tsx](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/App.tsx): envolver conteúdo com `<ThemeProvider attribute="class" defaultTheme="dark">`.
  - Biblioteca: `import { ThemeProvider } from "next-themes"`.
- Toggle de tema com ícones:
  - Local: [AppSidebar.tsx](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/components/AppSidebar.tsx), dentro do SidebarFooter (parte inferior da barra lateral).
  - Interação: usar `useTheme()` do next-themes; estados: `light`, `dark`, `system`.
  - Ícones: lucide-react (Sun, Moon, SunMoon). Import: `import { Sun, Moon, SunMoon } from "lucide-react"`.
  - Componente base: [Toggle](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/components/ui/toggle.tsx) ou botão custom `Button` com variantes existentes.
- Styling e tokens:
  - Confirmar e, se necessário, ajustar variáveis do tema claro em [index.css](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/index.css) (bloco `:root`) para refletir um visual “clean” (similar ao exemplo).
  - Manter tema escuro no bloco `.dark` (já definido).
  - Tailwind já está configurado: [tailwind.config.ts](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/tailwind.config.ts).
- Integração com toasts:
  - [sonner.tsx](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/components/ui/sonner.tsx) já usa `useTheme`; funcionará melhor sob ThemeProvider.

## Detalhes do Botão Moderno
- Posição: canto inferior da barra lateral (SidebarFooter), em um “pill” arredondado.
- Ícones:
  - Dark: Moon
  - Light: Sun
  - System: SunMoon (opcional via menu ou ciclo de estados)
- Estados:
  - Clique simples alterna entre `dark` e `light`.
  - Menu contextual (opcional) com `system`.
- Acessibilidade:
  - `aria-label` dinâmico: “Alternar para tema claro/escuro”.
  - Focus ring: usar tokens de `ring`.

## Paleta (Ajuste do Claro)
- Base claro (indicativo; HSL):
  - background: 0 0% 100%
  - foreground: 220 13% 18%
  - card: 0 0% 100%, card-foreground: 220 13% 18%
  - border: 220 14% 90%
  - muted: 220 14% 97%, muted-foreground: 220 10% 40%
  - primary: 217 91% 60% (mantém o azul), primary-foreground: 0 0% 100%
  - dashboard-* mantém mesma família, com leves ajustes de saturação para contraste.
- Aplicação: substituir apenas se necessário; manter a consistência com design atual.

## Persistência
- next-themes salva a preferência em `localStorage`.
- Respeitar `system` se o usuário selecionar essa opção.

## Impacto em Componentes de UI
- Gráficos:
  - Mantêm cores por tokens; `ChartContainer` já reconhece temas via classe `.dark`.
  - Tooltip/labels: usar `text-foreground` e `text-muted-foreground`.
- Cards, Sidebar, Toasters:
  - Já baseados em tokens; apenas validar contraste no claro.

## Testes
- Verificar:
  - Alternância entre `dark` e `light`.
  - Persistência após refresh.
  - Comportamento “system” mudando o tema do SO.
  - Contraste AA/AAA nas principais superfícies.
  - Gráficos legíveis nos dois modos (linhas, eixos, grid).

## Reversão (Rollback)
- Remover ThemeProvider em [App.tsx](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/App.tsx).
- Remover o toggle em [AppSidebar.tsx](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/components/AppSidebar.tsx).
- Restaurar variáveis em [index.css](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/index.css) ao conjunto anterior, caso ajustado.
- `sonner.tsx` continua funcional; não depende criticamente do ThemeProvider (apenas perde sincronização de “system”).

## Ícones a Pesquisar/Incluir
- lucide-react:
  - Sun (modo claro)
  - Moon (modo escuro)
  - SunMoon (modo sistema)
  - Gear (configurações rápidas, opcional)

## Passos de Implementação (Resumo)
- Adicionar ThemeProvider (defaultTheme="dark", attribute="class").
- Criar Toggle no SidebarFooter com ícones e `useTheme`.
- Validar index.css para tema claro e escuro.
- Testar e ajustar contraste.
- Rodar `npm run lint` e `npx tsc --noEmit`.

## Observações
- Não serão removidos estilos atuais; apenas adicionada opção claro.
- Mantemos consistência com tokens e variáveis para manutenção simples.
