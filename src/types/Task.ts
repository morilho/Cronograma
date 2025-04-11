export interface Task {
  id: string | number;
  text: string;
  start_date: Date;
  end_date: Date;
  duration?: number;
  progress?: number;
  responsible?: string;
  completed?: boolean;
  open?: boolean;
}