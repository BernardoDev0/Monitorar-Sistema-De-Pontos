import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CleanIcon } from "@/components/ui/clean-icon";
import { EmployeeService, Entry } from "@/services/EmployeeService";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalculationsService } from "@/services/CalculationsService";
import { useLoading, CardLoading } from "@/components/ui/loading-state";

interface HistoryTabProps {
  employeeId: number;
}

export const HistoryTab = ({ employeeId }: HistoryTabProps) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const { loading, withLoading } = useLoading(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  // Substitui filterType anterior por filtro de semanas específico
  const [weekFilter, setWeekFilter] = useState<'all' | '1' | '2' | '3' | '4' | '5'>("all");

  const ITEMS_PER_PAGE = 10;

  const loadEntries = async (reset = false) => {
    await withLoading(async () => {
      const currentPage = reset ? 0 : page;
      
      let newEntries: Entry[] = [];
      if (weekFilter === 'all') {
        newEntries = await EmployeeService.getEmployeeEntries(
          employeeId,
          ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE,
          undefined
        );
      } else {
        const ranges = CalculationsService.getWeekDateRanges(weekFilter);
        const promises = ranges.map(r => 
          EmployeeService.getEmployeeEntries(employeeId, ITEMS_PER_PAGE, 0, { start: r.start, end: r.end })
        );
        const results = await Promise.all(promises);
        newEntries = results.flat().sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, ITEMS_PER_PAGE);
      }
      
      if (reset) {
        setEntries(newEntries);
      } else {
        setEntries(prev => [...prev, ...newEntries]);
      }
      
      setHasMore(newEntries.length === ITEMS_PER_PAGE);
      if (reset) setPage(0);
      else setPage(prev => prev + 1);
    });
  };

  useEffect(() => {
    loadEntries(true);
  }, [employeeId, weekFilter]);

  const filteredEntries = entries.filter(entry =>
    entry.observations.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.refinery.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  const formatTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "HH:mm", { locale: ptBR });
    } catch {
      return "";
    }
  };

  const getPointsBadgeVariant = (points: number) => {
    if (points >= 500) return "default";
    if (points >= 300) return "secondary";
    return "outline";
  };

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-foreground"><CleanIcon name="calendar" size={20} /></span>
          Histórico de Registros
        </CardTitle>
        
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"><CleanIcon name="search" size={16} /></span>
            <Input
              placeholder="Buscar por observações ou refinaria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={weekFilter} onValueChange={(value: 'all' | '1' | '2' | '3' | '4' | '5') => setWeekFilter(value)}>
            <SelectTrigger className="w-full sm:w-40">
              <span className="w-4 h-4 mr-2 text-foreground"><CleanIcon name="filter" size={16} /></span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="1">Semana 1</SelectItem>
              <SelectItem value="2">Semana 2</SelectItem>
              <SelectItem value="3">Semana 3</SelectItem>
              <SelectItem value="4">Semana 4</SelectItem>
              <SelectItem value="5">Semana 5</SelectItem>
              
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        {loading && entries.length === 0 ? (
          <CardLoading />
        ) : filteredEntries.length === 0 ? (
          <div className="text-center py-8">
            <span className="mx-auto mb-4 text-muted-foreground"><CleanIcon name="calendar" size={48} /></span>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Nenhum registro encontrado
            </h3>
            <p className="text-muted-foreground">
              {searchTerm || weekFilter !== "all" 
                ? "Tente ajustar os filtros de busca"
                : "Ainda não há registros para este funcionário"
              }
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Data</TableHead>
                    <TableHead className="font-semibold">Hora</TableHead>
                    <TableHead className="font-semibold">Refinaria</TableHead>
                    <TableHead className="font-semibold">Pontos</TableHead>
                    <TableHead className="font-semibold">Observações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground"><CleanIcon name="calendar" size={16} /></span>
                          {formatDate(entry.date)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          {formatTime(entry.date)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground"><CleanIcon name="mapPin" size={16} /></span>
                          <span className="font-medium">{entry.refinery}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={getPointsBadgeVariant(entry.points)}
                          className="flex items-center gap-1"
                        >
                          <span className="text-dashboard-info"><CleanIcon name="trendUp" size={12} /></span>
                          {entry.points}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="flex items-start gap-2">
                          <span className="text-muted-foreground mt-0.5"><CleanIcon name="message" size={16} /></span>
                          <span className="text-sm break-words">{entry.observations}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {hasMore && (
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => loadEntries(false)}
                  disabled={loading}
                  className="min-w-32"
                >
                  {loading ? 'Carregando...' : 'Carregar mais'}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
