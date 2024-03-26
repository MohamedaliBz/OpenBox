import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface MyFormProps {
    nameButton?: string;
}
interface MyFormValues {
    password: string;
    confirmpassword: string;
}

export const  ResetPassForm: React.FC<MyFormProps> =  ({ nameButton }: MyFormProps) => {
    const initialValues: MyFormValues = {
        password: '',
        confirmpassword: ''
    };
    const handleSubmit = async (values: MyFormValues) => {};
    
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
                    confirmpassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
                })}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form className='inputForm'>
                        <div>
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" className='put' placeholder="************" />
                            {<ErrorMessage name="password" component="p" className="erreurMsg" />}
                        </div>

                        <div>
                            <label htmlFor="confirmpassword">Confirm Password</label>
                            <Field type="password" name="confirmpassword" className='put' placeholder="************" />
                            {<ErrorMessage name="confirmpassword" component="p" className="erreurMsg" />}
                        </div>

                        <div className='button'>
                            <button className='start' type="submit" >{nameButton}</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
