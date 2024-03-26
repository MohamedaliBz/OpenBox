import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import './codeInput.css'


export function Code() {

    const validationSchema = Yup.object().shape({
        codePut: Yup.string().max(1),      
    })
    const initialValues = {
      codePut: '',
  };

  return (
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
                        <div>     
                          <Field name="text" className='codePut' maxLength={1} />
                        </div>   
                    </Form>
                )}
          </Formik>
      </div>
  );
};
