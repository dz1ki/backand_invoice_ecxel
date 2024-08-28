import * as express from "express";
import InvoiceController from "../controllers/invoices";

export const invoices: express.IRouter = express.Router();
invoices.post("/generateInvoice", InvoiceController.generate);
invoices.patch("/addInfoInvoice", InvoiceController.addInvoiceSatatus);
invoices.get("/invoice/:userId/:invoiceId", InvoiceController.getInvoice);
