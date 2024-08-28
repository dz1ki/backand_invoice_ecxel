export type Task = {
  taskName: string;
  cost: number;
};
export type ObjectForExcel = {
  clientEmail: string;
  firstName: string;
  lastName: string;
  summCost: number;
  completedTasks: Task[];
  dateFormatDDMMYYYY: string;
  invoiceId: string;
};

export enum Status {
  processing = 'processing',
  complite = 'complite',
}

export type Document = {
  link: string | null;
};
