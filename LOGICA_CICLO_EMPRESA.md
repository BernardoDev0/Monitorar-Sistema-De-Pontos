# Lógica do Ciclo Mensal da Empresa (01 → 30/31)

Definição: cada mês é o período que começa no dia 01 e termina no dia 30 ou 31 do mesmo mês, conforme o número de dias desse mês. O "nome" do mês corresponde ao próprio mês calendário.

Regras principais:
- Dias 1 a 30 pertencem ao mês corrente.
- O dia 31, quando existir, também pertence ao mês corrente.
- Fevereiro termina em 28; em anos bissextos termina em 29.
- A virada de ano é natural: cada mês encerra em seu último dia (30 ou 31; 28/29 em fevereiro).

Mapeamento completo (independente do ano):

1 mês é igual a isso

janeiro = 01/01 - 31/01
fevereiro = 01/02 - 28/02 (29/02 em anos bissextos)
março = 01/03 - 31/03
abril = 01/04 - 30/04
maio = 01/05 - 31/05
junho = 01/06 - 30/06
julho = 01/07 - 31/07
agosto = 01/08 - 31/08
setembro = 01/09 - 30/09
outubro = 01/10 - 31/10
novembro = 01/11 - 30/11
dezembro = 01/12 - 31/12

Observações:
- O dia 31 só se aplica aos meses que possuem 31 dias.
- Em anos bissextos, fevereiro inclui 29 dias.
- Os gráficos mensais devem sempre exibir os valores agregados com base nessa convenção (01→30/31).

## Arquivos TS/TSX que usam lógica de dias
- Núcleo de cálculo:
  - [CalculationsService.ts](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/services/CalculationsService.ts) — funções de ciclo mensal e semanal
    - [getCompanyMonthKeyFromDate](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/services/CalculationsService.ts#L23-L39)
    - [getCurrentCycleStart](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/services/CalculationsService.ts#L49-L69)
    - [getWeekDates](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/services/CalculationsService.ts#L71-L220)
    - [getCurrentWeek](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/services/CalculationsService.ts#L222-L309)
    - [getMonthCycleDates](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/services/CalculationsService.ts#L311-L346)
    - [getWeekFromDate](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/services/CalculationsService.ts#L348-L399)
- Utilitários de datas:
  - [date-utils.ts](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/lib/date-utils.ts)
    - [getFirstDayOfMonth](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/lib/date-utils.ts#L189-L191)
    - [getLastDayOfMonth](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/lib/date-utils.ts#L193-L198)
  - [constants.ts](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/lib/constants.ts) — configuração de ciclo
    - [CYCLE_DAYS](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/lib/constants.ts#L101-L106)
- Serviços que consomem o ciclo:
  - [DataService.ts](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/services/DataService.ts) — usa semanas e meses do ciclo
  - [EmployeeService.ts](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/services/EmployeeService.ts) — calcula pontos em intervalos de dia/semana/mês
  - [ExcelProcessorService.ts](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/services/ExcelProcessorService.ts) — agrupa por mês da empresa e importa por ciclo
- Páginas que aplicam a lógica:
  - [Dashboard.tsx](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/pages/Dashboard.tsx) — usa semanas e mês do ciclo
  - [Index.tsx](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/pages/Index.tsx) — usa semana atual e período mensal
  - [Registros.tsx](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/pages/Registros.tsx) — filtra por semana do ciclo
- Componentes que aplicam a lógica:
  - [HistoryTab.tsx](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/components/Dashboard/HistoryTab.tsx) — filtro por semanas 1–5
  - [MonthlyEvolutionTab.tsx](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/components/Dashboard/MonthlyEvolutionTab.tsx) — agrega pontos por semanas do ciclo
  - [ExecutivePanel.tsx](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/components/Charts/ExecutivePanel.tsx) — usa datas do ciclo para projeções
  - [ExcelDashboard.tsx](file:///c:/Users/Bernardo/Desktop/monitorar_remaster/src/components/Dashboard/ExcelDashboard.tsx) — detecta meses e usa mês da empresa
