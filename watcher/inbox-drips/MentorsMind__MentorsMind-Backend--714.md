# Implement query parameter SQL injection defense in DynamicPricingService and AnalyticsService

- Repo: MentorsMind/MentorsMind-Backend
- GitHub: https://github.com/MentorsMind/MentorsMind-Backend/issues/714
- APPLY HERE: https://www.drips.network/wave/stellar/issues/3670cc8a-616e-45b0-b32b-a71b77631c4a
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 1
- Created: 2026-07-24T14:45:17.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

Category: Security / Bug Fix

Difficulty: High

Detailed Description: DynamicPricingService.getMarketDemand constructs a SQL query by directly appending WHERE period = $1 and then conditionally AND skill = $2 or AND category = $2 — but the period value from the request query string is passed directly as $1 without validation. Similarly, analytics services query by startDate/endDate from request parameters without validating they are valid ISO date strings, allowing injection via malformed timestamp strings.

Problem Statement: While parameterized queries prevent classic SQL injection, passing unvalidated strings as parameter values can cause: (1) PostgreSQL errors from malformed date strings leaking schema information in error responses, (2) pg_sleep(10) injection via date fields causing 10-second query delays (time-based blind injection), (3) unrestricted data export by manipulating date ranges to cover all historical data.

Technical Requirements:

Add Zod schema validation for all analytics and pricing query parameters before they reach service functions
Validate period against an allowlist: ['daily', 'weekly', 'monthly', 'yearly']
Validate startDate/endDate as valid ISO 8601 dates using luxon.DateTime.fromISO(value).isValid
Add maximum date range validation: prevent queries spanning more than 1 year without admin role
Add category and skill validation: max 100 chars, alphanumeric + spaces only (no SQL special chars)
Ensure all error responses from validation failures return HTTP 422 (not 500 from DB errors)
Add query execution time logging for all analytics queries exceeding 2 seconds
Acceptance Criteria:

Invalid period value returns HTTP 422 immediately without hitting the database
Malformed date strings return HTTP 422, not a PostgreSQL error message
Date ranges > 1 year return HTTP 403 for non-admin users
Special characters in category/skill are rejected with HTTP 422
No database error messages leak to API responses
Deliverables:

Zod schemas for all analytics/pricing query parameters
Updated dynamic-pricing.service.ts and analytics.service.ts with validation
Updated route files with validation middleware
Security test cases for all injection scenarios
Query performance logging implementation


## Drafted application (paste into the Drips form after reviewing)

I'd like to take this issue if it's available.

Plan:
1. Add Zod schemas for the analytics and pricing query parameters, and wire them in as validation middleware on the routes that feed `DynamicPricingService.getMarketDemand` and the analytics services.
2. Validate `period` against the allowlist (daily, weekly, monthly, yearly), and check `startDate`/`endDate` with `luxon.DateTime.fromISO(value).isValid` so malformed dates are caught before any query runs.
3. Restrict `category` and `skill` to max 100 chars, alphanumeric plus spaces, and reject date ranges over 1 year for non-admin users (HTTP 403).
4. Make validation failures return 422 so no PostgreSQL errors reach responses, and add execution-time logging for analytics queries over 2 seconds.
5. Add security tests covering each injection case (period allowlist, bad dates, pg_sleep attempts, oversized ranges, special characters).

Happy to confirm the exact route files and admin-role check before starting. I'll wait for assignment before opening a PR.
