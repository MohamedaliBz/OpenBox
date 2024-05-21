import { toast } from 'react-toastify';
import supabase from '../Utils/supabase'; // Import Supabase client
import { UserProfile, UserProfileToAdd, UserProfileToUpdate } from '../Interfaces/UserProfiles';


// Function to fetch user profiles from Supabase
export const fetchUserProfiles = async () => {
  const { data: userProfiles, error } = await supabase.from('user_profiles').select('*');
  if (error) {
    toast.error(`Error while fetching user profiles: ${error.message}`, {
      autoClose: 1000, 
      position: 'top-center',
    });
    throw new Error('Failed to fetch user profiles');
  }
  return userProfiles;
};

// Function to create a new user profile in Supabase
// export const createUserProfile = async (newUserProfileData: UserProfileToAdd) => {
//   const { data, error } = await supabase.from('user_profiles').insert([newUserProfileData]);
//   if (error) {
//     toast.error(`Error while creating user profile: ${error.message}`, {
//       autoClose: 1000, 
//       position: 'top-center',
//     });
//     console.log({ error });
//     throw new Error('Failed to create user profile');
//   } else {
//     toast.success('User profile created successfully', {
//       autoClose: 1000, 
//       position: 'top-center',
//     });
//     console.log({ data });
//   }
//   return data;
// };

// Function to update an existing user profile in Supabase
export const updateUserProfile = async (updatedUserProfileData: UserProfile) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updatedUserProfileData)
    .eq('user_id', updatedUserProfileData.user_id);
  if (error) {
    toast.error(`Error while updating user profile: ${error.message}`, {
      autoClose: 2000, 
      position: 'top-center',
    });
    throw new Error('Failed to update user profile');
  } else {
    toast.success('User profile updated successfully', {
      autoClose: 2000, 
      position: 'top-center',
    });
  }
  return data;
};

// Function to delete a user profile from Supabase
export const deleteUserProfile = async (userId: number) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .delete()
    .eq('user_id', userId);
  if (error) {
    toast.error(`Error while deleting user profile: ${error.message}`, {
      autoClose: 1000, 
      position: 'top-center',
    });
    throw new Error('Failed to delete user profile');
  } else {
    toast.success('User profile successfully deleted', {
      autoClose: 1000, 
      position: 'top-center',
    });
    console.log({ data });
  }
};
