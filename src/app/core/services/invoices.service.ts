import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Invoice } from '../models/invoice.model';


@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private mockInvoices: Invoice[] = [
    {
      id: 1,
      name: 'Factura 001',
      issueDate: '2025-01-01',
      amount: 100.5,
      supplyAddress: 'Calle Frederic 123',
    },
    {
      id: 2,
      name: 'Factura 002',
      issueDate: '2025-01-15',
      amount: 200.75,
      supplyAddress: 'Avenida Illa 456',
    },
  ];

  /**
   * Retorna una lista de facturas simuladas.
   */
  getInvoices(): Observable<Invoice[]> {
    return of(this.mockInvoices);
  }
}
