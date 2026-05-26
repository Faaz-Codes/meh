# Supabase Multi-User Dashboard Setup

This project provides a Supabase-authenticated multi-user dashboard website with:

- Email/password login
- Auth-gated dashboard pages
- Per-user folder routing (`Fz`, `Rt`, `Ak`, `Ar`)
- Supabase SQL schema for `profiles`, `habits`, and `journal`
- Row Level Security (RLS) policies limiting data access to each authenticated user

## Run

Serve with any static file server, for example:

```bash
npx serve .
```

Open `http://localhost:3000`.

## Important

Before production use, move Supabase credentials into environment variables and never commit sensitive keys.
