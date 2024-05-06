import React, { ReactNode } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import google from '../../Assets/images/google.png';
import './index.css';
import supabase from '../../Utils/supabase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface MyFormProps {
    children?: ReactNode; 
    nameButton?: string;
}
interface MyFormValues {
    email: string;
    password: string;
}

export const  MyForm: React.FC<MyFormProps> =  ({ children, nameButton }: MyFormProps) => {
    
    const initialValues: MyFormValues = {
        email: '',
        password: ''
    };

    const navigate = useNavigate();
    const handleSubmit = async (values: MyFormValues) => {
        const { email, password } = values;
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
                toast.success('Sign in successful !',
                {autoClose:3000 , 
                position:'top-center',
                });

                // Sets the session data from the current session. If the current session is expired, 
                // setSession will take care of refreshing it to obtain a new session.
                const settedSession = await supabase.auth.setSession({
                    access_token : data?.session.access_token,
                    refresh_token: data?.session.refresh_token,
                })
                console.log({settedSession});
                navigate('/inventory')
        } catch (error) {  
            console.log({error}); 
        }
    };
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('please write a valid email').required(),
                    password: Yup.string().min(8, 'Password must be at least 8 characters long').required()
                })}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className='inputForm'>
                        <div>
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" className='put' placeholder="Enter your email" />
                            <ErrorMessage name="email" component="p" className="erreurMsg" />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" className='put' placeholder="Enter your password" />
                            <ErrorMessage name="password" component="p" className='erreurMsg' />
                        </div>
                        <div>{children}</div>
                        <div className='button'>
                            <button className='start' type="submit" >{nameButton}</button>
                            <button className='emailButton'><img src={google} className='google' alt=''/>Sign in with Google</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};