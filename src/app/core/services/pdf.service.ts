import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Invoice } from '../models/invoice.model';
@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private readonly logoPath = 'assets/images/logo.png';

  constructor() {}

  /**
   * Genera y descarga un PDF de factura.
   */
  async generateInvoicePdf(invoice: Invoice): Promise<void> {
    const doc = new jsPDF();

    await this.addHeader(doc);

    this.addInvoiceDetails(doc, invoice);

    this.addInvoiceTable(doc);

    doc.save(`${invoice.name}.pdf`);
  }

  /**
   * Genera y previsualiza un PDF de factura.
   */
  async previewInvoicePdf(invoice: Invoice): Promise<void> {
    const doc = new jsPDF();

    await this.addHeader(doc);

    this.addInvoiceDetails(doc, invoice);

    this.addInvoiceTable(doc);

    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl, '_blank');
  }

  /**
   * Configura el encabezado del PDF con logotipo y título.
   */
  private async addHeader(doc: jsPDF): Promise<void> {
    const logo = await this.loadLogo();
    if (logo) {
      doc.addImage(logo, 'PNG', 10, 10, 50, 15);
    }

    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text('Factura', 105, 30, { align: 'center' });
    doc.setDrawColor(200, 200, 200);
    doc.line(10, 40, 200, 40);
  }

  /**
   * Agrega los detalles principales de la factura.
   */
  private addInvoiceDetails(doc: jsPDF, invoice: Invoice): void {
    doc.setFontSize(12);
    doc.setTextColor(80);
    doc.text('Información de la Factura:', 20, 50);
    doc.text(`Nombre: ${invoice.name}`, 20, 60);
    doc.text(`Fecha de emisión: ${invoice.issueDate}`, 20, 70);
    doc.text(`Importe Total: ${invoice.amount} €`, 20, 80);
    doc.text(`Dirección: ${invoice.supplyAddress}`, 20, 90);
  }

  /**
   * Agrega una tabla con los detalles de la factura.
   */
  private addInvoiceTable(doc: jsPDF): void {
    autoTable(doc, {
      startY: 110,
      headStyles: { fillColor: [41, 128, 185] },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      head: [['Concepto', 'Cantidad', 'Precio']],
      body: [
        ['Producto 1', '2', '50 €'],
        ['Producto 2', '1', '50.5 €'],
      ],
    });
  }

  /**
   * Carga el logotipo desde los assets y lo convierte a Base64.
   */
  private loadLogo(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = this.logoPath;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        } else {
          reject('Canvas context not available');
        }
      };
      img.onerror = () => reject('Failed to load logo');
    });
  }
}
