import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/integrations/supabase/client';

export function useAdminAuth() {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdminRole() {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('admin_profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      setIsAdmin(!error && data?.role != null && ['admin', 'editor'].includes(data.role));
      setLoading(false);
    }

    if (!authLoading) {
      checkAdminRole();
    }
  }, [user, authLoading]);

  return { user, isAdmin, loading: loading || authLoading };
}
