import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import google from '../../Assets/images/google.png';
import supabase from '../../Utils/supabase';
import { toast } from 'react-toastify';

interface MyFormProps {
    nameButton?: string;
}
interface MyFormValues {
    email: string;
}

export const  ForgotPassForm: React.FC<MyFormProps> =  ({ nameButton }: MyFormProps) => {

    const initialValues: MyFormValues = {
        email: '',
    };
    
    const handleSubmit = async (values: MyFormValues) => {
        
        const {email} = values;
        console.log({email});
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(
            email,
            { redirectTo: 'http://localhost:3000/resetPassword' } // Adjust the redirect URL as needed
        );
        if (error) {
            toast.error(`Error resetting password:', ${error.message}`,
            {   autoClose:3000 , 
                position:'top-center',
                });
            // Handle error appropriately, such as displaying an error message to the user
        } else {
            toast.success(`Password reset email sent successfully `, 
            {   autoClose:3000 , 
                position:'top-center',
                });
            // Optionally, you can display a success message or redirect the user to a success page
        }
    } catch (error) {
        toast.error(`Error resetting password: ${error}` );
        // Handle error appropriately, such as displaying an error message to the user
    }
            };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('please write a valid email').required()
                })}
                onSubmit={handleSubmit}
            >
                {({ errors, touched , isValid}) => (
                    <Form className='inputForm'>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" className='put' placeholder="Enter your email" />
                            <ErrorMessage name="email" component="p" className="erreurMsg" />
                        </div>

                        <div className='button'>
                            <button className='start' type="submit" disabled={!isValid}>{nameButton}</button>
                            <button className='emailButton' type='button'><img src={google} className='google' />Sign in with Google</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
