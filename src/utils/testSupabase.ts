import { supabase } from '../lib/supabaseClient';

export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);

    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }

    console.log('Supabase connection successful!');
    return true;
  } catch (err) {
    console.error('Supabase test failed:', err);
    return false;
  }
}; 