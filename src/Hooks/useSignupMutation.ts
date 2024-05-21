import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import supabase from '../Utils/supabase';

interface FormValues {
    name : string;
    email: string;
    password: string;
}
const useSignupMutation = () => {
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

export default useSignupMutation;
