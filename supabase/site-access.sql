create extension if not exists pgcrypto;

create table if not exists public.site_access (
  id boolean primary key default true check (id),
  password_hash text not null,
  updated_at timestamptz not null default now()
);

alter table public.site_access enable row level security;
revoke all on table public.site_access from anon, authenticated;

insert into public.site_access (id, password_hash)
values (true, crypt('151515', gen_salt('bf', 12)))
on conflict (id) do update set password_hash = excluded.password_hash, updated_at = now();

create or replace function public.verify_site_access(input_password text)
returns boolean
language sql
security definer
set search_path = public, extensions
as $$
  select exists (
    select 1 from public.site_access
    where id = true and password_hash = crypt(input_password, password_hash)
  );
$$;

revoke all on function public.verify_site_access(text) from public;
grant execute on function public.verify_site_access(text) to anon, authenticated;
