export interface UserProfile{
    user_id : number;
    name : string;
    phone_number : number;
    status : string;
    email : string;
    role : string;
    profile_photo : string
}
export interface UserProfileToAdd{
    // we need the name , email and password to perform the signup function
    name : string;
    email : string;
    password : string;
    phone_number : number;
    role : string;
    profile_photo : string
}
export interface UserProfileToUpdate{
    name : string;
    phone_number : number;
    role : string
}