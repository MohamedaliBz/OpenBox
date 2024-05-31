import { useMutation} from 'react-query';
import supabase from '../../Utils/supabase';
import { toast } from 'react-toastify';
import { SignupData } from '../Interfaces/Authentication';


const useSignupWithProfile = () => {

    return useMutation(async ({ name, email, password, phone_number, role,profile_photo } : SignupData) => {
        // Step 1: Sign up user with Supabase Auth
        const { data : {user} , error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: name
                }
            }
        });
        if (authError) {
            toast.error(`error while creating user ${authError.message}` , 
                {   autoClose:1500, 
                    position:'top-center',
                });
            throw new Error(authError.message);
        }
        console.log({user});
        
        // Step 2: Insert additional details into user_profiles
        const {error: profileError } = await supabase.from('userProfiles').insert([{
            user_id: user?.id,
            email:email,
            name: name,
            phone_number: phone_number,
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

        return user; // return the user object if needed
    }, 
    {
        onSuccess: () => {
            // Optional: Handle any actions on success, like navigation or showing a success message
            toast.success('User created successfully with extended informations!',
            {   autoClose:1500, 
                position:'top-center',
            }
            );

        }
    });
};
export default useSignupWithProfile;
