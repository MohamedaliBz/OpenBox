import React, { ReactNode } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import google from '../../Assets/images/google.png';
import './index.css';
import supabase from '../../Utils/supabase';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


interface MyFormProps {
    children?: ReactNode; 
    nameButton?: string;
}

interface MyFormValues {
    name : string;
    email: string;
    password: string;
}

export const  SignupForm: React.FC<MyFormProps> =  ({ children, nameButton }: MyFormProps) => {
    

    // creating initialValues object to use it in formik
    const initialValues: MyFormValues = {
        name:'',
        email: '',
        password: ''
    };

    // creating handleSubmit function to use as value of 'onSubmit' property in formik
    // this this function handles the submission of a form for user sign-up using Supabase authentication, 
    // providing feedback to the user via toast notifications and logging any errors that occur during the process.
    
    const navigate = useNavigate(); // Initialize useNavigate hook from react-router-dom

    const HandleSubmit = async (values: MyFormValues) => {
        const { name, email, password } = values;
        try {
            // Sign up user with Supabase
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: name,
                    }
                  }
            });
            if (error) {
                throw error;
            }
            console.log('User signed up:', data);
            toast.success('Sign up successful! Please verify your account from the email sent to you before logging in.',
            {   autoClose:3000 , 
                position:'top-center',
                onClose: () => {
                    navigate('/login');}
                
                });

        } catch (error) {
            console.log('Error signing up:', error);
            toast.error('Sign up failed. Please check your details and try again.',
            {
                autoClose:3000 , 
                position:'top-center' ,
                onClose: () => {window.location.reload();}
                            
            });

        }
    };
   
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters').max(50, 'Name must not exceed 50 characters').matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
                    email: Yup.string().email('Please enter a valid email').required('Email is required'),
                    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
                })}
                onSubmit={HandleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className='inputForm'>
                        <div>
                            <label htmlFor="name">Name*</label>
                            <Field type="text" name="name" className='put' placeholder="Enter your name" />
                            <ErrorMessage name="name" component="p" className="erreurMsg" />
                        </div>

                        <div>
                            <label htmlFor="email">Email*</label>
                            <Field type="email" name="email" className='put' placeholder="Enter your email" />
                            <ErrorMessage name="email" component="p" className="erreurMsg" />
                        </div>

                        <div>
                            <label htmlFor="password">Password*</label>
                            <Field type="password" name="password" className='put' placeholder="Enter your password" />
                            <ErrorMessage name="password" component="p" className='erreurMsg' />
                        </div>
                        
                        <div>{children}</div>

                        <div className='button'>
                            <button className='start' type="submit" >{nameButton}</button>
                            <button className='emailButton'><img src={google} className='google' alt=''/>Sign up with Google</button>
                        </div>

                    </Form>
                )}
            </Formik>
            
        </div>
    );
};
