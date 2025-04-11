// Lista de feriados nacionais fixos
const BRAZILIAN_HOLIDAYS = [
  { month: 1, day: 1 },   // Ano Novo
  { month: 4, day: 21 },  // Tiradentes
  { month: 5, day: 1 },   // Dia do Trabalho
  { month: 9, day: 7 },   // Independência
  { month: 10, day: 12 }, // Nossa Senhora
  { month: 11, day: 2 },  // Finados
  { month: 11, day: 15 }, // Proclamação da República
  { month: 12, day: 25 }, // Natal
];

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function isHoliday(date: Date): boolean {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return BRAZILIAN_HOLIDAYS.some(holiday => holiday.month === month && holiday.day === day);
}

export function calculateWorkingDays(startDate: Date, endDate: Date): number {
  let workingDays = 0;
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (!isWeekend(currentDate) && !isHoliday(currentDate)) {
      workingDays++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return workingDays;
}

export function addWorkingDays(startDate: Date, days: number): Date {
  const endDate = new Date(startDate);
  let addedDays = 0;

  while (addedDays < days) {
    endDate.setDate(endDate.getDate() + 1);
    if (!isWeekend(endDate) && !isHoliday(endDate)) {
      addedDays++;
    }
  }

  return endDate;
}