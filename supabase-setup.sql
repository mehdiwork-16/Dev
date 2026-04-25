-- 1. Créer la table contacts
create table if not exists contacts (
  id         uuid default gen_random_uuid() primary key,
  name       text not null,
  email      text not null,
  phone      text,
  service    text,
  budget     text,
  message    text not null,
  created_at timestamptz default now()
);

-- 2. Activer Row Level Security
alter table contacts enable row level security;

-- 3. Autoriser les inserts publics (formulaire de contact)
create policy "insert_public"
  on contacts for insert
  to anon
  with check (true);

-- 4. Autoriser la lecture (dashboard admin)
create policy "select_public"
  on contacts for select
  to anon
  using (true);
