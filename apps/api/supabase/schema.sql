-- Run this in Supabase Dashboard -> SQL Editor -> New query -> Run
-- Safe to re-run: uses IF NOT EXISTS / OR REPLACE where possible.

create extension if not exists pgcrypto;

-- ============ ADMIN ============
create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  name text,
  created_at timestamptz default now()
);

-- ============ BLOGS ============
create table if not exists blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  cover_image text,
  category text,
  author text default 'Dr. Shubhangi Maharana',
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============ TESTIMONIALS ============
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  patient_name text,
  category text,
  title text,
  before_image text,
  after_image text,
  description text,
  rating int default 5,
  published boolean default true,
  display_order int default 0,
  created_at timestamptz default now()
);

-- ============ REVIEWS (admin-curated, copied from Google) ============
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  reviewer_name text not null,
  location text,
  rating int default 5,
  review_text text not null,
  published boolean default true,
  display_order int default 0,
  created_at timestamptz default now()
);

-- ============ DISEASES ============
create table if not exists diseases (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  image text,
  short_description text,
  full_description text,
  category text,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============ YOUTUBE VIDEOS ============
create table if not exists youtube_videos (
  id uuid primary key default gen_random_uuid(),
  video_id text not null,
  title text,
  featured boolean default false,
  display_order int default 0,
  created_at timestamptz default now()
);

-- ============ PATIENTS ============
create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age int,
  gender text,
  phone text,
  address text,
  email text,
  medical_history text,
  created_at timestamptz default now()
);

-- ============ PRESCRIPTIONS ============
create table if not exists prescriptions (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id) on delete cascade,
  date date default current_date,
  diagnosis text,
  medicines jsonb default '[]'::jsonb,
  notes text,
  pdf_path text,
  created_at timestamptz default now()
);

-- ============ MIGRATIONS (safe to re-run) ============
alter table youtube_videos add column if not exists description text;

alter table prescriptions add column if not exists weight_kg numeric;
alter table prescriptions add column if not exists height_cm numeric;
alter table prescriptions add column if not exists chief_complaints text;
alter table prescriptions add column if not exists clinical_findings jsonb default '[]'::jsonb;
alter table prescriptions add column if not exists diagnosis_points jsonb default '[]'::jsonb;
alter table prescriptions add column if not exists advice jsonb default '[]'::jsonb;
alter table prescriptions add column if not exists follow_up_date date;
alter table prescriptions add column if not exists with_letterhead boolean default true;

alter table testimonials add column if not exists youtube_url text;

-- ============ EVENTS (doctor's schedule / event manager) ============
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

-- ============ ROW LEVEL SECURITY ============
-- All access happens through our own backend using the Supabase secret key,
-- which bypasses RLS. Enabling RLS with no public policies means these
-- tables are completely inaccessible from the browser/anon key.
alter table admin_users enable row level security;
alter table blogs enable row level security;
alter table testimonials enable row level security;
alter table reviews enable row level security;
alter table diseases enable row level security;
alter table youtube_videos enable row level security;
alter table patients enable row level security;
alter table prescriptions enable row level security;

-- ============ SEED ADMIN USER ============
-- email: shubhangi@admin.com / password set by owner (hashed below)
insert into admin_users (email, password_hash, name)
values ('shubhangi@admin.com', '$2b$10$LQ5.JEUeJIMhO4bf5YDHa.13IQ1PXxZkpSfBT06/qMbYOd16abXtG', 'Dr. Shubhangi Maharana')
on conflict (email) do nothing;

-- ============ STORAGE BUCKETS ============
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('prescriptions', 'prescriptions', false)
on conflict (id) do nothing;

-- media bucket is public (blog/testimonial/disease images need direct public URLs)
drop policy if exists "Public read access for media" on storage.objects;
create policy "Public read access for media"
  on storage.objects for select
  using (bucket_id = 'media');
