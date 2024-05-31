import { toast } from 'react-toastify';
import supabase from '../../Utils/supabase';
import { UserProfile } from '../Interfaces/UserProfiles';


// Function to fetch user profiles from Supabase
export const fetchUserProfiles = async () => {
  const { data: userProfiles, error } = await supabase.from('userProfiles').select('*');
  if (error) {
    toast.error(`Error while fetching user profiles: ${error.message}`, {
      autoClose: 1000, 
      position: 'top-center',
    });
    throw new Error('Failed to fetch user profiles');
  }
  return userProfiles;
};

// Function to update an existing user profile in Supabase
export const updateUserProfile = async (updatedUserProfileData: UserProfile) => {
  const { data, error } = await supabase
    .from('userProfiles')
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
    .from('userProfiles')
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
