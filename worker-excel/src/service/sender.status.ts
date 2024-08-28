import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as config from 'config';
import { Status } from '../constants';
import { Document } from '../types/invoice';

@Injectable()
export class InvoiceSender {
  private readonly logger = new Logger(InvoiceSender.name);
  async sendInvoiceStatus(
    clientId: number,
    invoiceId: number,
    status: Status,
    document: Document,
  ): Promise<void> {
    try {
      const response = await axios.patch(config.get('webApiConfig.path'), {
        clientId,
        invoiceId,
        status,
        document,
      });

      this.logger.debug(`Notified first microservice: ${response.status}`);
    } catch (error) {
      this.logger.error('Error notifying first microservice:', error);
    }
  }
}
