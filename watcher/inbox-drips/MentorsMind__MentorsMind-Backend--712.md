# Implement tax form PDF generation and secure download for 1099-NEC documents

- Repo: MentorsMind/MentorsMind-Backend
- GitHub: https://github.com/MentorsMind/MentorsMind-Backend/issues/712
- APPLY HERE: https://www.drips.network/wave/stellar/issues/9a6d770b-d793-4f8c-8966-c54749de7a6e
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 2
- Created: 2026-07-24T14:44:04.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

Category: Compliance / Feature Completion

Difficulty: High

Detailed Description: TaxReportingService.generate1099 creates a document record with fileUrl = /tax-documents/${mentorId}/${taxYear}/${documentType}.pdf — a local filesystem path that doesn't exist. The service comment says "In production this would call a PDF generation service or TaxJar/Avalara." The batchGenerateReports method queries a payments table column mentor_amount that may not exist.

Problem Statement: Mentors who earned above $600 on the platform cannot download their 1099-NEC form. The file path stored is a placeholder that resolves to nothing. This is a US tax compliance violation — the platform is legally required to provide 1099-NEC forms to eligible contractors by January 31st of each year.

Technical Requirements:

Implement TaxReportingService.generate1099Pdf(mentorId, taxYear, reportId) using pdfkit with the official 1099-NEC form layout (boxes 1-7 as specified by IRS Publication 1220)
Include fields: recipient name, address, TIN (last 4 digits masked), NEC box 1 amount, federal income tax withheld
Upload to S3 under tax-documents/{mentorId}/{taxYear}/1099-NEC.pdf with SSE-KMS encryption
Add KMS key configuration for tax document encryption (more sensitive than general documents)
Fix batchGenerateReports SQL: replace mentor_amount with amount * (1 - platform_fee_pct/100) or the correct mentor payout column
Implement GET /api/v1/tax/documents/:id/download with access control (only the document owner)
Add a January 31st annual cron job to generate all outstanding 1099 forms
Acceptance Criteria:

Generated PDF matches IRS 1099-NEC format requirements
PDF is encrypted at rest with KMS
Only the document owner can download their tax form
January 31st cron generates forms for all eligible mentors (≥$600 earnings)
batchGenerateReports executes without SQL errors
Deliverables:

Complete tax-reporting.service.ts with real PDF generation
tax-form-pdf.utils.ts
 with IRS-compliant 1099-NEC template
Migration fixing mentor_amount column reference
January 31st scheduler entry
KMS encryption configuration documentation


## Drafted application (paste into the Drips form after reviewing)

Here's a draft you can review, edit, and post:

I'd be glad to take this one.

Plan:
- Implement `generate1099Pdf(mentorId, taxYear, reportId)` in `tax-reporting.service.ts` using pdfkit, with a `tax-form-pdf.utils.ts` template covering the 1099-NEC boxes 1-7 (recipient name, address, TIN masked to last 4, box 1 NEC amount, federal tax withheld).
- Upload the PDF to S3 at `tax-documents/{mentorId}/{taxYear}/1099-NEC.pdf` with SSE-KMS, and document the dedicated tax KMS key config.
- Add a migration fixing the `batchGenerateReports` query: replace `mentor_amount` with `amount * (1 - platform_fee_pct/100)` (or the correct payout column, which I'll confirm against the schema).
- Add `GET /api/v1/tax/documents/:id/download` with owner-only access control, and a January 31st cron to generate outstanding forms for mentors with ≥$600 earnings.

I'll wait for assignment before opening a PR.
