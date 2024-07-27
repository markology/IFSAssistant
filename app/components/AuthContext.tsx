import {
    Dispatch,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from 'react';
import supabase, { SupabaseClientType } from '../lib/supabase';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Session, Subscription } from '@supabase/auth-js/dist/module/lib/types';

type AuthListener = {
    subscription: Subscription;
};

type User = boolean | null;
type AuthSession = Session | null | undefined;
type SetAuthSession = Dispatch<SetStateAction<AuthSession>> | null;
type SetUser = Dispatch<SetStateAction<User>> | null;

export type AuthContextValues = {
    user: User;
    setUser: SetUser;
    session: AuthSession;
    setSession: SetAuthSession;
    supabase: SupabaseClientType | null;
    loading: Boolean;
};
const image = { uri: 'app/assets/images/homescreen.jpg' };

export const AuthContext = createContext<AuthContextValues>({
    user: null,
    setUser: null,
    session: null,
    setSession: null,
    supabase: null,
    loading: false,
});

let listener: AuthListener | null = null;

export default ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState<Boolean>(false);
    const [session, setSession] = useState<AuthSession>(null);
    async function fetchMyAPI() {
        setLoading(true);
        const x = await supabase.auth.getSession();

        console.log(x);

        // setSession(session);
        // setUser(session?.user.id ? true : false);

        // console.log(!!session?.user.id);

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log(`Supabase auth event: ${event}`);
                setSession(session);
                setUser(session?.user.id ? true : false);
                setLoading(false);
            }
        );

        listener = authListener;
    }

    useEffect(() => {
        console.warn({ user });
        fetchMyAPI();
        return () => {
            listener?.subscription.unsubscribe();
        };
    }, [user]);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                session,
                setSession,
                supabase,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242120',
        paddingHorizontal: 10,
        paddingVertical: 30,
    },
});
