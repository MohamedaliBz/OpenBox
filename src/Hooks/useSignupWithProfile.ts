import { useMutation} from 'react-query';
import supabase from '../Utils/supabase';
import { toast } from 'react-toastify';


interface SignupData {
    name: string;
    email: string;
    password: string;
    phone_number: number;
    status: string;
    role: string;
    profile_photo : string
  }

const useSignupWithProfile = () => {

    return useMutation(async ({ name, email, password, phone_number, status, role,profile_photo } : SignupData) => {
        // Step 1: Sign up user with Supabase Auth
        const { data , error: authError } = await supabase.auth.signUp({
            email,
            password
        });

        if (authError) {
            toast.error(`error while creating user ${authError.message}` , 
                {   autoClose:1500, 
                    position:'top-center',
                });
            throw new Error(authError.message);
        }

        // Step 2: Insert additional details into user_profiles
        const {error: profileError } = await supabase.from('user_profiles').insert([{
            user_id: data.user?.id,
            email:email,
            name: name,
            phone_number: phone_number,
            status: status,
            role: role,
            profile_photo: profile_photo
        }]);

        if (profileError) {
            toast.error(`error while creating userProfile ${profileError.message}` , 
                {   autoClose:1500, 
                    position:'top-center',
                });
            throw new Error(profileError.message);
        }

        return data.user; // return the user object if needed
    }, 
    {
        onSuccess: () => {
            // Optional: Handle any actions on success, like navigation or showing a success message
            toast.success('User created successfully with extended informations!');
        }
    });
};

export default useSignupWithProfile;
