-- Criar usuários de demonstração no sistema de auth
-- Nota: Estes comandos criam usuários com senhas temporárias para demo

-- Inserir usuários no auth.users (sistema de autenticação)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'authenticated',
  'authenticated',
  'admin@vitatech.com',
  '$2a$10$zlxCMTlGAOEfWFLWTHrJnOjxQT7bSLPKH5KKyqWByOFnqSDYPKKPa', -- password: demo123
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
), (
  '00000000-0000-0000-0000-000000000000',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'authenticated',
  'authenticated',
  'carlos@empresa.com',
  '$2a$10$zlxCMTlGAOEfWFLWTHrJnOjxQT7bSLPKH5KKyqWByOFnqSDYPKKPa', -- password: demo123
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
), (
  '00000000-0000-0000-0000-000000000000',
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'authenticated',
  'authenticated',
  'maria@startup.com',
  '$2a$10$zlxCMTlGAOEfWFLWTHrJnOjxQT7bSLPKH5KKyqWByOFnqSDYPKKPa', -- password: demo123
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Inserir identidades correspondentes na auth.identities
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  '{"sub":"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa","email":"admin@vitatech.com"}',
  'email',
  NOW(),
  NOW(),
  NOW()
), (
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
  '{"sub":"bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb","email":"carlos@empresa.com"}',
  'email',
  NOW(),
  NOW(),
  NOW()
), (
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  'cccccccc-cccc-cccc-cccc-cccccccccccc',
  '{"sub":"cccccccc-cccc-cccc-cccc-cccccccccccc","email":"maria@startup.com"}',
  'email',
  NOW(),
  NOW(),
  NOW()
);