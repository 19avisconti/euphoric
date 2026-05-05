-- Enable UUID extension
create extension if not exists "pgcrypto";

-- Users (mirrors auth.users with extra fields)
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  phone text,
  created_at timestamptz default now()
);

-- Businesses
create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  trade_type text,
  service_area text,
  google_review_url text,
  created_at timestamptz default now()
);

-- Subscriptions
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  stripe_subscription_id text unique,
  plan text check (plan in ('standard', 'growth')) not null,
  status text not null default 'inactive',
  created_at timestamptz default now()
);

-- Customers
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name text,
  phone text not null,
  opted_out boolean not null default false,
  created_at timestamptz default now()
);

-- SMS Messages
create table if not exists public.sms_messages (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  status text not null default 'sent',
  sent_at timestamptz default now()
);

-- RLS
alter table public.users enable row level security;
alter table public.businesses enable row level security;
alter table public.subscriptions enable row level security;
alter table public.customers enable row level security;
alter table public.sms_messages enable row level security;

-- users: own row only
create policy "users: own row" on public.users
  for all using (auth.uid() = id);

-- businesses: own rows only
create policy "businesses: own rows" on public.businesses
  for all using (auth.uid() = user_id);

-- subscriptions: read own, write service role only
create policy "subscriptions: read own" on public.subscriptions
  for select using (auth.uid() = user_id);

-- customers: own business rows only
create policy "customers: own business" on public.customers
  for all using (
    exists (
      select 1 from public.businesses b
      where b.id = customers.business_id and b.user_id = auth.uid()
    )
  );

-- sms_messages: own business rows only
create policy "sms_messages: own business" on public.sms_messages
  for all using (
    exists (
      select 1 from public.businesses b
      where b.id = sms_messages.business_id and b.user_id = auth.uid()
    )
  );
