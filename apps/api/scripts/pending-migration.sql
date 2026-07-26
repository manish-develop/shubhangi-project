-- Paste this whole file into Supabase Dashboard -> SQL Editor -> New Query -> Run
-- Safe to re-run (all statements are idempotent).

alter table prescriptions add column if not exists weight_kg numeric;
alter table prescriptions add column if not exists height_cm numeric;
alter table prescriptions add column if not exists chief_complaints text;
alter table prescriptions add column if not exists clinical_findings jsonb default '[]'::jsonb;
alter table prescriptions add column if not exists diagnosis_points jsonb default '[]'::jsonb;
alter table prescriptions add column if not exists advice jsonb default '[]'::jsonb;
alter table prescriptions add column if not exists follow_up_date date;
alter table prescriptions add column if not exists with_letterhead boolean default true;

alter table testimonials add column if not exists youtube_url text;

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  start_time timestamptz not null,
  end_time timestamptz not null,
  color text default 'blue',
  category text,
  tags jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);
alter table events enable row level security;
