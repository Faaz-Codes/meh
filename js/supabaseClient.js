import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://nuY8yd7X-s9KuQL3OQ0FHQ.supabase.co";
const supabaseAnonKey = "sb_publishable_nuY8yd7X-s9KuQL3OQ0FHQ_kqDPXYJu";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
