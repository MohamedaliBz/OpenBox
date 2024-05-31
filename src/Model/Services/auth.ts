import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import supabase from '../../Utils/supabase';
import { message } from 'antd';
import { FormValues, MyFormValues } from '../Interfaces/Authentication';


export const useSignupMutation = () => {
    const navigate = useNavigate();
    return useMutation(async ({ name, email, password } : FormValues) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: name
                }
            }
        });
        if (error) {
            throw new Error(error.message);
        }

        return data;
    }, {
        onSuccess: (data) => {
            console.log('User signed up:', data);
            toast.success('Sign up successful! Please verify your account from the email sent to you before logging in.', {
                autoClose: 3000,
                position: 'top-center',
                onClose: () => navigate('/login')
            });
        },
        onError: (error) => {
            console.log('Error signing up:', error);
            toast.error('Sign up failed. Please check your details and try again.', {
                autoClose: 3000,
                position: 'top-center',
                onClose: () => window.location.reload()
            });
        }
    });
}


export const useLoginMutation =() => {
    const navigate = useNavigate();
    return useMutation(async ({email,password}:MyFormValues)=>{
        try {
            const { data,error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
    
            if (error) {
                toast.error(`Sign in failed. ${error?.message}.`,
            {
                autoClose:3000 , 
                position:'top-center' ,
                // onClose: () => {window.location.reload();}         
            });
                throw error;
            }
                console.log('User signed in:', data.user); 
                console.log('User signed in:', data); 
                message.success('Sign in successful !',);
                navigate("/inventory")
        } catch (error) { 
            console.log({error}); 
        }
    })
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};
