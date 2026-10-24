# HeroTax Sync Directory Rule

- **Sync Directory Location**: `D:\Documents\HEROTax`
- Contains only the production build; the user uploads it to the webspace manually.
- Whenever the user requests to rebuild into or update the sync folder:
  1. Execute `npm run build`
  2. Copy/mirror all contents from `dist/` directly into `D:\Documents\HEROTax`.
