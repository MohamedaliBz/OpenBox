import { Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';
import "./index.css"
import { NavLink } from "react-router-dom";


type Props = {
    nameButton?: string;
}

export default function VerificationForm({nameButton}: Props) {
    const validationSchema = Yup.object().shape({
        codeinput: Yup.string().required('Verification code is required')
        .matches(/^\d+$/, 'Verification code must be a number'),      
    })
    const initialValues = {
      codeinput: '',
      codeinput1: '',
      codeinput2: '',
      codeinput3: '',
  };
  return (
    <div>
        <div>
          <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                  console.log('form submit', values);
              }}
          >
             {({ errors, touched }) => (
                    <Form>
                        <label >Code</label>     
                        <div className="verif-code-container">
                          <Field type="text" name="codeinput"  className='codePut' maxLength={1} />
                          <Field type="text" name="codeinput1" className='codePut' maxLength={1} />
                          <Field type="text" name="codeinput2" className='codePut' maxLength={1} />
                          <Field type="text" name="codeinput3" className='codePut' maxLength={1} />
                        </div>  
                        {<ErrorMessage name="codeinput" component="p" className="erreurMsg" />}

                        <div className='resend'>
                            <p className='msg'>if you didn't recieve a code!</p>
                            <NavLink to="/"><button className='resend-btn' >Resend</button></NavLink>
                        </div>

                        <div className='button'>
                            <button className='start' type="submit" >{nameButton}</button>
                        </div>
                    </Form>
                )}
          </Formik>
      </div>
    </div>
  )
}