import { Session, User } from '@supabase/supabase-js';
import { useContext, useState, useEffect, createContext, useRef } from 'react';
import supabase from '../Utils/supabase';
import { message } from 'antd';
import { Role } from '../Utils/userRoles';
import { UserProfile } from '../Model/Interfaces/UserProfiles';



const AuthContext = createContext<{
  session: Session | null | undefined;
  user: User | null | undefined;
  userProfile : UserProfile | null | undefined;
  signOut: () => void;
  userRole: React.MutableRefObject<Role | null>
}>({ session: null, user: null,userProfile : null ,signOut: () => {}, userRole: { current: null } });

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const userRole = useRef<Role | null>(null);
  const userprofile = useRef<UserProfile | null>(null)

  useEffect(() => {
    const fetchUserProfile = async (userId: string) => {
      try {
        const { data: profile, error } = await supabase
          .from('userProfiles')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (error) {
          message.error('Error while fetching user Profile');
          console.error('Error fetching user profile:', error);
        } else {
          const role = profile?.role as Role; // Cast the role to Role
          const userprof = profile as UserProfile
          userRole.current = role; // Update user role state
          userprofile.current = userprof
          console.log('Fetched user role:', role);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error); // Handle errors
      }
    };

    const fetchData = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (session){
            setSession(session);
            setUser(session?.user);
            console.log('Session:', session);
            console.log('User:', session?.user);
        }
        if (session && session.user) {
          await fetchUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error fetching user data:', error); // Handle errors
      } finally {
        setLoading(false);
      }
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user?? null);
      console.log('Auth state changed:', session);
      if (session && session.user) fetchUserProfile(session.user.id);
    });

    fetchData();
    return () => listener?.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    console.log('Updated userRole:', userRole);
  }, [userRole]);

  useEffect(() => {
    console.log('Updated userProfile:', userprofile);
  }, [userprofile]);

  const value = {
    session,
    user,
    userProfile : userprofile.current,
    signOut: () => supabase.auth.signOut(),
    userRole : userRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
