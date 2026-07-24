# Fix invoice pdf_url empty string — implement real PDF generation and S3 storage

- Repo: MentorsMind/MentorsMind-Backend
- GitHub: https://github.com/MentorsMind/MentorsMind-Backend/issues/711
- APPLY HERE: https://www.drips.network/wave/stellar/issues/0961200e-e732-4aec-baea-830eba44d813
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-24T14:43:40.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

Category: Feature Completion / Infrastructure

Difficulty: High

Detailed Description: InvoiceService.createInvoice sets pdf_url = '' in the INSERT query. The attachPdf method exists to update it after generation, but there is no code that calls PDF generation when an invoice is created or when its status changes to sent. The pdfkit package is installed but the invoice service never uses it.

Problem Statement: Users who request their invoice PDF receive an empty string URL. Invoices exist in the database but are purely data records with no human-readable document. For tax purposes and accounting, users need actual PDF invoices. The bulkExport method returns invoice records with empty pdf_url, making export useless.

Technical Requirements:

Implement InvoiceService.generatePdf(invoiceId: string) using pdfkit to create a properly formatted invoice PDF with: invoice number, date, due date, itemized line items, subtotal, tax, total, company branding, and QR code linking to the invoice verification endpoint
Upload the generated PDF to S3 under invoices/{userId}/{year}/{invoiceId}.pdf
Call InvoiceService.attachPdf with the S3 URL after successful upload
Automatically generate PDF when invoice status changes to sent
Expose GET /api/v1/invoices/:id/download that returns a presigned S3 URL valid for 1 hour
Implement POST /api/v1/invoices/:id/send that generates the PDF, emails it to the user, and updates status to sent
Add invoice PDF generation to the session completion flow
Acceptance Criteria:

Invoice PDF is a properly formatted document with all required fields
PDF is accessible via a presigned S3 URL
Presigned URL expires after 1 hour
Invoice email includes the PDF as an attachment
pdf_url is never empty for sent invoices
Deliverables:

Updated invoice.service.ts with PDF generation
invoice-pdf.utils.ts
 with pdfkit template
Updated invoice routes
S3 upload integration
Invoice PDF template design specification


## Drafted application (paste into the Drips form after reviewing)

I'll take this one.

Plan:
1. Root cause: `InvoiceService.createInvoice` inserts `pdf_url = ''` and nothing ever calls the existing `attachPdf`, so PDFs are never generated. Implement `generatePdf(invoiceId)` in `invoice.service.ts` using the already-installed pdfkit, building the template (invoice number, date, due date, line items, subtotal, tax, total, branding, verification QR code) in a new `invoice-pdf.utils.ts`.
2. Upload the PDF to S3 at `invoices/{userId}/{year}/{invoiceId}.pdf`, then call `attachPdf` with the resulting URL.
3. Trigger generation when status changes to `sent`, and add it to the session completion flow.
4. Add routes: `GET /api/v1/invoices/:id/download` returning a 1-hour presigned URL, and `POST /api/v1/invoices/:id/send` to generate the PDF, email it as an attachment, and set status to `sent`.

One thing to confirm: which S3 client and email service the codebase already uses, so I match existing patterns rather than adding new ones.

I'll wait for assignment before opening a PR.
