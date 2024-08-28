import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { JobName, Status } from '../constants';
import { InvoiceSender } from '../service/sender.status';
import { saveCloudStorageDoc } from '../libs/cloudinary';
import { generateExcel } from '../utils/generate.invoice';

@Processor('Invoice')
export class InvoiceGenerate {
  private readonly logger = new Logger(InvoiceGenerate.name);
  constructor(private readonly invoiceSenderStatus: InvoiceSender) {}
  @Process(JobName.GenerateAndSendInvoice)
  async handleTranscode(job: Job) {
    const { clientId, invoiceId, clientEmail } = job.data.objectForExcel;

    await this.invoiceSenderStatus.sendInvoiceStatus(
      clientId,
      invoiceId,
      Status.processing,
      null,
    );
    this.logger.debug('In process....');

    const dataBuffer = await generateExcel(job.data.objectForExcel);
    const saveData = await saveCloudStorageDoc(dataBuffer, clientEmail);
    await this.invoiceSenderStatus.sendInvoiceStatus(
      clientId,
      invoiceId,
      Status.complite,
      saveData.url,
    );
    this.logger.debug('complite');

    await job.remove();
    return;
  }
}
