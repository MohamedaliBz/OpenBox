import React, { ReactNode, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import google from '../../Assets/images/google.png';

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
                            {touched?.email && <ErrorMessage name="email" component="p" className="erreurMsg" />}
                        </div>

                        <div className='button'>
                            <button className='start' type="submit" >{nameButton}</button>
                            <button className='emailButton'><img src={google} className='google' />Sign in with Google</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
