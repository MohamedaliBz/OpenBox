import React, { ReactNode, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import google from '../../Assets/images/google.png';
import './index.css';

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
    
    const initialValues: MyFormValues = {
        name:'',
        email: '',
        password: ''
    };

    const handleSubmit = async (values: MyFormValues) => {};

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters').max(50, 'Name must not exceed 50 characters').matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),
                    email: Yup.string().email('please write a valid email').required(),
                    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')
                })}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (

                    <Form className='inputForm'>
                        <div>
                            <label htmlFor="name">Name*</label>
                            <Field type="text" name="name" className='put' placeholder="Enter your name" />
                            {touched?.name && <ErrorMessage name="name" component="p" className="erreurMsg" />}
                        </div>

                        <div>
                            <label htmlFor="email">Email*</label>
                            <Field type="email" name="email" className='put' placeholder="Enter your email" />
                            {touched?.email && <ErrorMessage name="email" component="p" className="erreurMsg" />}
                        </div>

                        <div>
                            <label htmlFor="password">Password*</label>
                            <Field type="password" name="password" className='put' placeholder="Enter your password" />
                            {touched?.password && <ErrorMessage name="password" component="p" className='erreurMsg' />}
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
