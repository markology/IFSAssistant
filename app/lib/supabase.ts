
import { AppState } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Session, SupabaseClient, SupabaseClientOptions, createClient} from "@supabase/supabase-js";

export type SupabaseClientType = SupabaseClient<any, 'public', any>;

const supabaseUrl = 'https://grwbckgwxjwnnocoekfh.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdyd2Jja2d3eGp3bm5vY29la2ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkxODc1MjgsImV4cCI6MjAzNDc2MzUyOH0.4JBGUplD2Uh5exblhB1sYQ7hAe3sHvHlnvAw2QtrFvg";

const supabase =  createClient(supabaseUrl, supabaseKey, {
  //ts
    storage: AsyncStorage,
    // autoRefreshToken: true,
    // persistSession: true,
    detectSessionInUrl: false,
  }
);


// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default supabase;