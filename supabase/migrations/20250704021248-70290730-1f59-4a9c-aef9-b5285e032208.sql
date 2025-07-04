-- Fix infinite recursion in usuarios RLS policy
DROP POLICY IF EXISTS "Users can view users from their company" ON public.usuarios;

-- Create a new policy that avoids self-reference
CREATE POLICY "Users can view users from their company" 
ON public.usuarios 
FOR SELECT 
USING (
  -- User can see their own record
  auth.uid() = id 
  OR 
  -- Super admin can see all users
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_user_meta_data->>'role' = 'super_admin'
  )
  OR
  -- Users can see others from same company (check via empresa_id directly)
  empresa_id IN (
    SELECT empresa_id FROM public.usuarios 
    WHERE id = auth.uid()
  )
);

-- Also add INSERT and UPDATE policies for usuarios table
CREATE POLICY "Users can insert their own profile" 
ON public.usuarios 
FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.usuarios 
FOR UPDATE 
USING (auth.uid() = id);