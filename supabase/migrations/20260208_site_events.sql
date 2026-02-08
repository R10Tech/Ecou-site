-- Add role column to profiles (if not exists)
alter table profiles add column if not exists role text default 'user';

-- Site analytics events table
create table if not exists site_events (
  id bigint generated always as identity primary key,
  event text not null,           -- 'page_view', 'tier_click', 'download_click', 'section_time'
  page text,                     -- '/download', '/', '/pricing', etc.
  meta jsonb default '{}',       -- { tier: 'pro', seconds: 42, section: 'pricing' }
  session_id text,               -- anonymous session id (no PII)
  created_at timestamptz default now()
);

-- Index for quick admin queries
create index idx_site_events_event on site_events(event);
create index idx_site_events_created on site_events(created_at desc);

-- Allow anonymous inserts (public site, no auth required for tracking)
alter table site_events enable row level security;

create policy "Anyone can insert events"
  on site_events for insert
  with check (true);

-- Only authenticated admins can read (we'll check in the edge function)
create policy "Only service role can read"
  on site_events for select
  using (false);
