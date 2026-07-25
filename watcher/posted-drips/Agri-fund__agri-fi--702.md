# feat(stellar): On-Chain Event Indexing Service

- Repo: Agri-fund/agri-fi
- GitHub: https://github.com/Agri-fund/agri-fi/issues/702
- APPLY HERE: https://www.drips.network/wave/stellar/issues/eb12ffdb-90b4-4ab5-9903-e8e41b0c8b8d
- Points: 200 (multiplier 1)
- Complexity: large
- Pending applications: 0
- Created: 2026-07-24T14:57:46.000Z
- Labels: none

> Apply through the Drips link above. A GitHub comment does NOT count
> as an application and will not use or fill a slot.

## Issue body

### feat(stellar): On-Chain Event Indexing Service
* **Component:** Backend (Stellar / Indexer)
* **Detailed Description:** Create a backend subscription worker that listens to Soroban contract event topics and updates the local database state in real-time.
* **Implementation Pointers:** Implement an event poller using `Horizon.Server.events` or the RPC `getTransaction` API.
* **Acceptance Criteria:**
  - On-chain updates (like milestone completions) are reflected in the database.
  - Transactions on-chain update corresponding record states in the database.

## Drafted application (paste into the Drips form after reviewing)

Hi, I'd like to take this issue.

Plan:
- Build a subscription worker that polls Soroban contract event topics, using `Horizon.Server.events` for the streaming feed with the RPC `getTransaction` API as a fallback for confirming transaction results.
- Filter incoming events by the contract IDs and topics we care about (for example, milestone completion events).
- Map each event type to the matching database record and update its state, so on-chain changes like milestone completions are reflected locally.
- Track the last processed ledger or cursor so the worker can resume without missing or double-processing events after a restart.
- Add tests covering event parsing and the database state updates.

A couple of things I'd want to confirm first: which contract IDs and event topics to subscribe to, and the exact database records or tables that map to each on-chain event.

I'll wait for assignment before opening a PR.
