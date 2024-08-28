export type Task = {
  taskName: string;
  cost: number;
};

export type InvoiceRequest = {
  email: string;
  completedTasks: Task[];
};

export type ObjectForExcel = {
  clientId: number;
  clientEmail: string;
  firstName: string;
  lastName: string;
  summCost: number;
  completedTasks: Task[];
  dateFormatDDMMYYYY: string;
  invoiceId: string;
};

export enum JobName {
  GenerateAndSendInvoice = "generateAndSendInvoice",
}

export enum Status {
  processing = "processing",
  complite = "complite",
}

export type ReqInvoiceStatus = {
  clientId: number;
  invoiceId: string;
  status: Status;
  document: string;
};

export type ResGetInvoice = { userId: string; invoiceId: string };
