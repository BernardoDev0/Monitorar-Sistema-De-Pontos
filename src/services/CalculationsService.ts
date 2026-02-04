import { formatDateISO, formatDateBR, generateMonthKey, getLastDayOfMonth, parseDate } from '@/lib/date-utils';
import { getFixedWeekFromDate, getFixedWeekDateRangesISO } from '@/lib/week-rules';

export interface WeekDates {
  start: string;
  end: string;
}

export interface MonthCycleDates {
  start: string;
  end: string;
}

export class CalculationsService {
  // Nomes dos meses em PT-BR (0-based)
  static readonly MONTH_NAMES_PT = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Retorna a chave MM/YYYY do mês calendário para uma data específica
  static getCompanyMonthKeyFromDate(date: Date): string {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month.toString().padStart(2, '0')}/${year}`;
  }

  // Retorna o nome do mês PT-BR dado o índice 1..12
  static getMonthNamePT(month1to12: number): string {
    return this.MONTH_NAMES_PT[(month1to12 - 1 + 12) % 12];
  }
  
  static getCurrentCycleStart(): Date {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  }

  static getWeekDates(weekStr: string): WeekDates {
    const weekNum = parseInt(weekStr);
    if (weekNum < 1 || weekNum > 5) {
      throw new Error('Semana deve estar entre 1 e 5');
    }

    const today = new Date();
    const saoPauloDate = new Date(today.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
    const ranges = getFixedWeekDateRangesISO(weekNum, saoPauloDate);
    if (!ranges || ranges.length === 0) throw new Error('Semana inválida');

    const primary = ranges[0];
    return { start: primary.start, end: primary.end };
  }

  static getCurrentWeek(): number | null {
    const today = new Date();
    const saoPauloDate = new Date(today.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
    return getFixedWeekFromDate(saoPauloDate);
  }

  static getMonthCycleDates(month?: number, year?: number): MonthCycleDates {
    const today = new Date();
    const saoPauloDate = new Date(today.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));

    const targetMonth = month && year ? month : (saoPauloDate.getMonth() + 1);
    const targetYear = month && year ? year : saoPauloDate.getFullYear();

    const startDate = new Date(targetYear, targetMonth - 1, 1);
    const endDate = getLastDayOfMonth(startDate);

    return {
      start: formatDateISO(startDate),
      end: formatDateISO(endDate)
    };
  }

  static getWeekFromDate(dateStr: string): number | null {
    const date = parseDate(dateStr);
    if (!date) return null;
    return getFixedWeekFromDate(date);
  }

  // Semanas disponíveis
  static getAvailableWeeks(): string[] {
    return ['1', '2', '3', '4', '5'];
  }

  static getWeekDateRanges(weekStr: string): { start: string; end: string }[] {
    const weekNum = parseInt(weekStr);
    if (weekNum < 1 || weekNum > 5) {
      throw new Error('Semana deve estar entre 1 e 5');
    }
    const today = new Date();
    const saoPauloDate = new Date(today.toLocaleString("en-US", {timeZone: "America/Sao_Paulo"}));
    const ranges = getFixedWeekDateRangesISO(weekNum, saoPauloDate);
    return ranges;
  }

  // Calcular meta diária baseada no funcionário
  static getDailyGoal(employee: { username: string; weekly_goal?: number }): number {
    // Lógica original: Matheus (E89P) tem meta especial
    if (employee.username === 'E89P') {
      return 535; // 2675 / 5 dias
    }
    return 475; // 2375 / 5 dias (meta padrão)
  }

  static getWeeklyGoal(employee: { username: string; weekly_goal?: number }): number {
    if (employee.username === 'E89P') {
      return 2675; // 5 * 535
    }
    return 2375; // 5 * 475
  }

  // Calcular meta mensal baseada no funcionário
  static getMonthlyGoal(employee: { username: string }): number {
    // Lógica original do employee.py
    if (employee.username === 'E89P') {
      return 10500;
    }
    return 9500;
  }

  // Calcular porcentagem de progresso
  static calculateProgressPercentage(current: number, goal: number): number {
    if (goal === 0) return 0;
    return Math.round((current / goal) * 100 * 10) / 10; // Rounded to 1 decimal
  }

  static getEmployeeStatus(progressPercentage: number): 'at-risk' | 'on-track' | 'top-performer' {
    if (progressPercentage < 50) return 'at-risk';
    if (progressPercentage < 100) return 'on-track';
    return 'top-performer';
  }

  // Formatação utilitária
  static formatDateBR(dateStr: string): string {
    return formatDateBR(dateStr);
  }

  static formatDateForKey(date: Date): string {
    return generateMonthKey(date);
  }

  // Método interno para formatação - usando date-utils
  private static formatDateInternal(date: Date): string {
    return formatDateBR(date.toISOString());
  }

  static formatTimestampBR(dateStr: string): { date: string; time: string } {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return { date: `${day}/${month}/${year}`, time: `${hours}:${minutes}` };
  }
}
