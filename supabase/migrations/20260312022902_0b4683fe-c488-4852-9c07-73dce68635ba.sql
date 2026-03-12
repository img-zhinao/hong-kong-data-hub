
-- Allow any authenticated user to insert into openclaw_agents
DROP POLICY IF EXISTS "Admin only insert" ON public.openclaw_agents;

CREATE POLICY "Authenticated users can insert"
  ON public.openclaw_agents
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
