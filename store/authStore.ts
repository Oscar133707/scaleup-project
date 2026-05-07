import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  userName: string | null;
  sessionLoading: boolean;
  setUser: (user: User | null, name?: string | null) => void;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  loadSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      userName: null,
      sessionLoading: true,

      setUser: (user, name) => set({ user, userName: name ?? get().userName }),

      signUp: async (email, password, name) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (error) return { error };
        set({
          user: data.user,
          userName: name ?? (data.user?.user_metadata?.full_name as string) ?? null,
        });
        return { error: null };
      },

      signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error };
        set({
          user: data.user,
          userName: (data.user?.user_metadata?.full_name as string) ?? get().userName,
        });
        return { error: null };
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, userName: null });
      },

      loadSession: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        set({
          user: user ?? null,
          userName: user ? ((user.user_metadata?.full_name as string) ?? get().userName) : null,
          sessionLoading: false,
        });
      },
    }),
    { name: 'scaleup-auth', partialize: (s) => ({ userName: s.userName }) }
  )
);
