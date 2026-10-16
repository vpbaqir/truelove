# SplitFair — Shared Expense Splitter

A local group-expense calculator for trips, meals, and shared purchases. Add people, record who paid, choose who shares each cost, and calculate suggested transfers.

## Run
Open `index.html` in a modern browser. No server, account, or network connection is required.

## Features
- Add and remove group members.
- Record expenses with payer and selected participants.
- Compute net balances and a simplified settlement list.
- INR formatting and CSV export.
- Local persistence, mobile-first layout, and empty states.

## Privacy
Data stays in this browser's `localStorage` and is not uploaded. Exported CSV files are saved to your device.

## Limitations
It assumes equal splits among selected participants. It does not handle multiple currencies or payment confirmation. Verify settlements with your group.