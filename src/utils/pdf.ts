import html2pdf from 'html2pdf.js';

export interface PdfOptions {
  title?: string;
  author?: string;
  includePageNumbers: boolean;
  theme: 'light' | 'dark';
  pageSize: 'a4' | 'letter';
  margin: number;
}

const defaultOptions: PdfOptions = {
  includePageNumbers: true,
  theme: 'light',
  pageSize: 'a4',
  margin: 15,
};

/**
 * Generate PDF from HTML element and download it
 */
export async function generatePdf(
  element: HTMLElement,
  options: Partial<PdfOptions> = {},
  filename: string = 'document.pdf'
): Promise<void> {
  const opts = { ...defaultOptions, ...options };

  const html2canvasOptions = {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    letterRendering: true,
    logging: false,
  };

  const jsPDFOptions: any = {
    unit: 'mm',
    format: opts.pageSize === 'letter' ? 'letter' : 'a4',
    orientation: 'portrait',
  };

  const workerOptions: any = {
    margin: opts.margin,
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: html2canvasOptions,
    jsPDF: jsPDFOptions,
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'],
      before: '.page-break-before',
      after: '.page-break-after',
      avoid: ['pre', 'code', 'table', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img'],
    },
  };

  const worker = html2pdf().from(element).set(workerOptions);
  await worker.save();
}

/**
 * Generate PDF and return as blob
 */
export async function generatePdfBlob(
  element: HTMLElement,
  options: Partial<PdfOptions> = {}
): Promise<Blob> {
  const opts = { ...defaultOptions, ...options };

  const html2canvasOptions = {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    letterRendering: true,
    logging: false,
  };

  const jsPDFOptions: any = {
    unit: 'mm',
    format: opts.pageSize === 'letter' ? 'letter' : 'a4',
    orientation: 'portrait',
  };

  const workerOptions: any = {
    margin: opts.margin,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: html2canvasOptions,
    jsPDF: jsPDFOptions,
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'],
      before: '.page-break-before',
      after: '.page-break-after',
      avoid: ['pre', 'code', 'table', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img'],
    },
  };

  const worker = html2pdf().from(element).set(workerOptions);
  return worker.output('blob') as Promise<Blob>;
}
