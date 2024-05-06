import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import supabase from '../../Utils/supabase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate()
    const handleSubmit = async (values: MyFormValues) => {
        const {password } = values
        try {
            const { data, error } = await supabase.auth.updateUser({
                password: password
            });
            if (error) {
                toast.error(`Error while updating password:', ${error.message}`,
                {   autoClose:3000 , 
                    position:'top-center',
                    });
            } else {
                toast.success(`Password updated successfully `, 
                {   autoClose:3000 , 
                    position:'top-center',
                    onClose : () => {
                        navigate('/login'); // Redirect to login page using navigate after closing the toast
                    }
                    });
            }
                console.log(data);
        } catch (error) {
            toast.error(`Error updating password: ${error}` );
        }
    };
    
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
                {({ errors, touched , isValid}) => (
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
                            <button className='start' type="submit" disabled={!isValid}>{nameButton}</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};
