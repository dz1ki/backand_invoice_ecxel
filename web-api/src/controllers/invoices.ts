import InvoiceService from "../service/invoices";
import { InvoiceRequest, ReqInvoiceStatus, ResGetInvoice } from "../types";
import { Request, Response } from "express";

class InvoiceController {
  async generate(request: Request, response: Response) {
    try {
      const { email, completedTasks }: InvoiceRequest = request.body;
      const result = await InvoiceService.generate(email, completedTasks);
      response.status(result.statusCode || 200).json(result.message);
    } catch (error) {
      response
        .status(error.statusCode || 500)
        .json(error.message || "Server error");
    }
  }

  async addInvoiceSatatus(request: Request, response: Response) {
    try {
      const { clientId, invoiceId, status, document }: ReqInvoiceStatus =
        request.body;
      const result = await InvoiceService.saveInvoiceStatus(
        clientId,
        invoiceId,
        status,
        document
      );
      response.status(result.statusCode || 200).json(result.message);
    } catch (error) {
      response
        .status(error.statusCode || 500)
        .json(error.message || "Server error");
    }
  }

  async getInvoice(request: Request, response: Response) {
    try {
      const { userId, invoiceId } = request.params as ResGetInvoice;
      const userIdNumber: number = parseInt(userId, 10);
      const result = await InvoiceService.getOneInvoice(
        userIdNumber,
        invoiceId
      );
      response.status(result.statusCode || 200).json(result.message);
    } catch (error) {
      response
        .status(error.statusCode || 500)
        .json(error.message || "Server error");
    }
  }
}
export default new InvoiceController();
