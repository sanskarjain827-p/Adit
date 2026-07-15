# Insyd / Adit Site

This repository contains the frontend code for the Insyd site.

## Directory Structure

- `frontend/`: The Vite + React frontend application.
  - `src/`: React source code (components, hooks, styles).
  - `public/`: Static assets (images, icons).
  - `vercel.json`: Routing configurations for Vercel deployment.

## Deployment on Vercel

When importing this repository into Vercel, make sure to configure the project settings with:

1. **Root Directory**: Set this to `frontend`.
2. **Build Command**: `npm run build` (auto-detected).
3. **Output Directory**: `dist` (auto-detected).
4. **Install Command**: `npm install` (auto-detected).

This ensures Vercel correctly builds the site from the `frontend/` subdirectory.
