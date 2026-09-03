# Project Rules & Workspace Conventions

## Build & Sync Folder
- The sync folder for HeroTax is **`C:\Users\Hero\Documents\HeroTax`**.
- Whenever the user asks to "in den sync ordner rebuilden", "in den sync ordner syncen", or build for sync:
  1. Run the build: `npm run build`
  2. Copy/sync all contents of `dist/` into `C:\Users\Hero\Documents\HeroTax` (e.g. `Copy-Item -Path "dist\*" -Destination "C:\Users\Hero\Documents\HeroTax" -Recurse -Force`).

## Naming & Spelling Conventions
- Always write **`HERO Tax`** (HERO in uppercase, Tax in titlecase with capital T).
- NEVER write `HERO TAX` (all uppercase) or other variations.
