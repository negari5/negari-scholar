import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  user_type: 'student' | 'parent' | 'mentor' | 'school' | 'admin' | 'super_admin';
  city: string | null;
  preparatory_school_type: string | null;
  education_level: string | null;
  phone: string | null;
  date_of_birth: string | null;
  gender: string | null;
  current_grade_level: string | null;
  school_name: string | null;
  gpa: number | null;
  career_interests: string[] | null;
  preferred_countries: string[] | null;
  preferred_fields: string[] | null;
  language_proficiency: any | null;
  has_completed_profile: boolean;
  subscription_tier: string;
  subscription_expires_at: string | null;
  is_admin: boolean;
  is_super_admin: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // If no row found, create a default profile for this user (avoids relying on auth triggers)
        if (status === 406 || (error as any)?.code === 'PGRST116') {
          const { data: userRes } = await supabase.auth.getUser();
          const currentUser = userRes?.user;

          const { data: inserted, error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: userId,
              email: currentUser?.email ?? '',
              first_name: (currentUser?.user_metadata as any)?.first_name ?? null,
              last_name: (currentUser?.user_metadata as any)?.last_name ?? null,
            is_admin: currentUser?.email === 'negari@gmail.com',
            is_super_admin: currentUser?.email === 'negari@gmail.com'
            })
            .select('*')
            .single();

          if (insertError) {
            console.error('Error creating default profile:', insertError);
            return;
          }
          // Determine user type based on email
          let userType: Profile['user_type'] = 'student';
          if (currentUser?.email === 'negari@gmail.com') {
            userType = 'super_admin';
          } else {
            userType = (currentUser?.user_metadata as any)?.user_type || 'student';
          }

          // Map the inserted data to our Profile interface
          const mappedProfile: Profile = {
            id: inserted.id,
            email: inserted.email,
            first_name: inserted.first_name,
            last_name: inserted.last_name,
            full_name: `${inserted.first_name || ''} ${inserted.last_name || ''}`.trim() || inserted.email,
            user_type: userType,
            city: null,
            preparatory_school_type: null,
            education_level: inserted.education_level,
            phone: null,
            date_of_birth: null,
            gender: null,
            current_grade_level: null,
            school_name: null,
            gpa: null,
            career_interests: null,
            preferred_countries: null,
            preferred_fields: null,
            language_proficiency: null,
            has_completed_profile: false,
            subscription_tier: 'free',
            subscription_expires_at: null,
            is_admin: inserted.is_admin || false,
            is_super_admin: (inserted as any).is_super_admin || false
          };
          setProfile(mappedProfile);
          return;
        }
        console.error('Error fetching profile:', error);
        return;
      }
      // Determine user type based on email and data
      let userType: Profile['user_type'] = 'student';
      if (data.email === 'negari@gmail.com') {
        userType = 'super_admin';
      } else {
        userType = (data as any).user_type || 'student';
      }

      // Map the data to our Profile interface
      const mappedProfile: Profile = {
        id: data.id,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        full_name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || data.email,
        user_type: userType,
        city: (data as any).area_of_living,
        preparatory_school_type: (data as any).school_type,
        education_level: data.education_level,
        phone: null,
        date_of_birth: null,
        gender: null,
        current_grade_level: null,
        school_name: null,
        gpa: null,
        career_interests: null,
        preferred_countries: null,
        preferred_fields: null,
        language_proficiency: null,
        has_completed_profile: false,
        subscription_tier: 'free',
        subscription_expires_at: null,
        is_admin: data.is_admin || false,
        is_super_admin: (data as any).is_super_admin || false
      };
      setProfile(mappedProfile);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);

      // Always store session and user (prevents deadlocks)
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // Defer any Supabase calls
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 0);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData: any) => {
    // Get the current domain for redirect URL
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: userData
      }
    });
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;

      // Handle role-based authentication and redirect
      if (data.user) {
        let userType: Profile['user_type'] = 'student';
        let isAdmin = false;
        let isSuperAdmin = false;

        // Role assignment based on email
        if (email === "negari@gmail.com") {
          userType = 'super_admin';
          isSuperAdmin = true;
          isAdmin = true;
        } else {
          // Regular users get 'student' by default
          userType = 'student';
        }

        // Try to set role flags; if the columns don't exist yet, fall back gracefully
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            email: data.user.email,
            user_type: userType,
            is_super_admin: isSuperAdmin,
            is_admin: isAdmin,
            updated_at: new Date().toISOString(),
          });

        if (profileError) {
          if ((profileError as any)?.code === 'PGRST204') {
            // Fallback: upsert only safe columns when role columns are missing
            const { error: fallbackError } = await supabase
              .from('profiles')
              .upsert({
                id: data.user.id,
                email: data.user.email,
                user_type: userType,
                updated_at: new Date().toISOString(),
              });
            if (fallbackError) {
              console.error("Profile fallback upsert failed:", fallbackError);
            }
          } else {
            console.error("Error updating user profile:", profileError);
          }
        }
      }
      
      return { error: null };
    } catch (error: any) {
      console.error("Sign in error:", error);
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'No user logged in' };
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      
      if (!error && profile) {
        setProfile({ ...profile, ...updates });
      }
      
      return { error };
    } catch (error) {
      console.error('Profile update error:', error);
      return { error };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signUp,
      signIn,
      signOut,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
