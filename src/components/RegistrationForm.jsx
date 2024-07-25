import React from 'react';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(8)
        .matches(/(?=.*[a-z])/, 'one lowercase letter')
        .matches(/(?=.*[A-Z])/, 'one uppercase letter')
        .matches(/(?=.*[0-9])/, 'one digit')
        .matches(/(?=.*[!@#$%^&*])/, 'one uppercase letter')
        .required(),
    
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required()
});

const RegistrationForm = ()=>{
    <Formik 
        initialValues={{username: '', email: '', password: '', confirmPassword: ''}}
        validationSchema={SignupSchema}
        onSubmit={(values, {setSubmitting})=>{
            axios.post('/api/register', values)
                .then(response => {
                    console.log(response.data);
                    setSubmitting(false);
                })  
                .catch(error => {
                    console.log(error);
                    setSubmitting(false);
                });
        }}
    >
        {({isSubmitting }) => (
            <Form>
                <Field type="text" name="username" placeholder="Username" />
                <ErrorMessage name='username' component="div" />
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name='email' component="div" />
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name='password' component="div" />
                <Field type="password" name="confirmPassword" placeholder="Confirm Password" />
                <ErrorMessage name='confirmPassword' component="div" />
                <button type='submit' disabled={isSubmitting}>Register</button>

            </Form>
        )}
    </Formik>
}

export default RegistrationForm;