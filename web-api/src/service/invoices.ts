import { Client } from "../models/client";
import { v4 as uuidv4 } from "uuid";
import { JobName, ObjectForExcel, Status, Task } from "../types";
import { invoiceQueue } from "../queue/invoiceQueue";
import { Invoice } from "../models/invoice";

class InvoiceService {
  getSumm(completedTasks: Task[]) {
    return completedTasks.reduce((accum: number, element: { cost: number }) => {
      accum = element.cost + accum;
      return accum;
    }, 0);
  }
  getFormatedDate() {
    const dateNow: Date = new Date();
    return (
      dateNow.getDate() +
      "." +
      ("0" + (dateNow.getMonth() + 1)) +
      "." +
      dateNow.getFullYear()
    );
  }
  async generate(clientEmail: string, completedTasks: Task[]) {
    const status = "loading";
    const invoiceId: string = uuidv4();
    const client: Client = await Client.findOne({
      where: { email: clientEmail },
    });
    if (!client) {
      throw { message: "Invalid email", statusCode: 400 };
    }
    const { firstName, lastName, id }: Client = client;
    const summCost = this.getSumm(completedTasks);
    const dateFormatDDMMYYYY = this.getFormatedDate();
    const objectForExcel: ObjectForExcel = {
      clientId: id,
      clientEmail,
      firstName,
      lastName,
      summCost,
      completedTasks,
      dateFormatDDMMYYYY,
      invoiceId,
    };
    await Invoice.create({ id: invoiceId, status, clientId: id });
    invoiceQueue.add(JobName.GenerateAndSendInvoice, {
      objectForExcel,
    });
    return {
      message: { status, userId: id, invoiceId },
      statusCode: 202,
    };
  }
  async saveInvoiceStatus(
    clientId: number,
    invoiceId: string,
    status: Status,
    document: string
  ) {
    await Invoice.update(
      { clientId, status, document },
      {
        where: {
          id: invoiceId,
        },
      }
    );
    return {
      message: status,
      statusCode: 200,
    };
  }
  async getOneInvoice(userId: number, invoiceId: string) {
    const invoice = await Invoice.findOne({
      where: { id: invoiceId, clientId: userId },
    });
    if (!invoice) {
      throw { message: "Invoice does not exist", statusCode: 400 };
    }
    return {
      message: {
        status: invoice.status,
        link: invoice.document,
      },
      statusCode: 200,
    };
  }
}
export default new InvoiceService();
