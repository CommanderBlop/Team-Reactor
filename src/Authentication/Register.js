
import React, { useContext } from "react";
import './login.css';
import FirebaseContext from '../Firebase'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'


function Register(props) {
  const firebase = useContext(FirebaseContext)
  const history = useHistory()

  return (

    <div className="register-page">
      <div className="form">

        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const res = await firebase.auth.createUserWithEmailAndPassword(values.email, values.password)
              await res.user.updateProfile({ displayName: values.name })
              const user = res.user
              firebase.db.collection("students").doc(user.uid).set({
                  hello: 'hi'
              })
              alert('Signup successful')
              history.push('/')
          } catch (err) {
              alert(err)
          }
          }}
        >
          <Form className="register-form">
            <Field as="input" type="text" placeholder="name" name="name" />
            <Field as="input" type="email" placeholder="email" name="email" />
            <Field as="input" type="password" placeholder="password" name="password" />
            <button type="submit">Sign Up</button>
            <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
          </Form>
        </Formik>



      </div>
    </div>

  );
}

export default Register;

