alter table public.tools
  add column if not exists pricing_plans jsonb not null default '[]'::jsonb,
  add column if not exists discount_code text,
  add column if not exists discount_note text;

update public.tools
set
  pricing = '$49 one-time',
  pricing_plans = '[{"name":"One-Time Access","price":"$49","original_price":"","billing_period":"one-time","description":"No monthly fee. Check the current offer page for included usage and terms.","features":["AI video creation suite","Commercial rights","No monthly subscription","30-day money-back offer"],"popular":true}]'::jsonb,
  discount_code = 'SECRET10',
  discount_note = 'Use this code for 10% off the current offer.'
where slug = 'videoexpress-ai';
