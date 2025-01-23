import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { InvoicesService } from '../../core/services/invoices.service';
import { PdfService } from '../../core/services/pdf.service';
import { Invoice } from '../../core/models/invoice.model';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, TranslateModule],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'issueDate', 'amount', 'supplyAddress', 'actions'];
  invoices: Invoice[] = [];

  constructor (
    private invoicesService: InvoicesService,
    private pdfService: PdfService,
  ) { }

  ngOnInit (): void {
    this.invoicesService.getInvoices().subscribe((data) => {
      this.invoices = data;
    });
  }

  onDownload (invoice: Invoice): void {
    this.pdfService.generateInvoicePdf(invoice);
  }

  onView (invoice: Invoice): void {
    this.pdfService.previewInvoicePdf(invoice);
  }
}
