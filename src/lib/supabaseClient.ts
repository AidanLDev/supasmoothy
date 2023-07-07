import { createClient } from '@supabase/supabase-js';



const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL!; //  process.env.REACT_APP_SUPABASE_URL!;
const supabaseKey: string = import.meta.env.VITE_ANON_KEY!; //  process.env.REACT_APP_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
