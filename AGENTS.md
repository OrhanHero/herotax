# Project Rules & Workspace Conventions

## Build & Sync Folder
- The sync folder for HERO Tax is **`D:\Documents\HEROTax`**.
- It only receives the production build (`dist/`); the user uploads it to the webspace personally.
- Whenever the user asks to "in den sync ordner rebuilden", "in den sync ordner syncen", or build for sync:
  1. Run the build: `npm run build`
  2. Copy/sync all contents of `dist/` into `D:\Documents\HEROTax` (e.g. `Copy-Item -Path "dist\*" -Destination "D:\Documents\HEROTax" -Recurse -Force`).

## Content Updates
- Workflow for "Inhaltsupdate" is documented in `DEPLOYMENT.md` → section *Inhaltsupdate (Redaktions-Workflow)*.

## Naming & Spelling Conventions
- Always write **`HERO Tax`** (HERO in uppercase, Tax in titlecase with capital T).
- NEVER write `HERO TAX` (all uppercase) or other variations.
