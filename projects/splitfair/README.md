# SplitFair — Shared Expense Calculator

A local group-expense calculator for trips, meals, and shared purchases.

## Run
Open `index.html` in a modern browser. No server or account is required.

## Features
- Add and remove group members.
- Record expenses and identify the person who paid.
- Calculate suggested settlements using an equal split across the current group.
- Export expense records to CSV.
- Save data in browser storage.

## Privacy
Data stays in browser `localStorage` and is not uploaded. CSV exports are saved to your device.

## Limitations
All current group members are included in each equal split. Removing or adding members changes the calculation for earlier expenses. It does not support custom participant lists, multiple currencies, or payment confirmation.