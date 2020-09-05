
import React, { useContext } from "react";
import './login.css';
import FirebaseContext from '../Firebase'
import AuthContext from '../Firebase/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

// import * as firebase from "firebase/app";
// import "firebase/auth";
// const config = {
//   apiKey: "AIzaSyAs9poikn_6GE2eP_Yz7nibaKrC9WcNGNU",
//   projectId: "team-reactors"
// };
// firebase.initializeApp(config)


function Login(props) {
  const history = useHistory()
  const firebase = useContext(FirebaseContext)
  const authContext = useContext(AuthContext)
  // console.log(firebase.auth.currentUser)

  return (

    <div className="login-page">
      <div className="form">


        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={async(values, { setSubmitting }) => {
            try {
              //wait until log in is complete
              await firebase.auth.signInWithEmailAndPassword(values.username, values.password)
              history.push('/')
            } catch (error) {
              alert(error)
            }
          }}
        >
          <Form className="login-form">
            <Field as="input" type="text" placeholder="username" name="username" />
            <Field as="input" type="password" placeholder="password" name="password" />
            <button type="submit">login</button>
            <p className="message">Not registered? <Link to="/register">Create an account</Link></p>
          </Form>
        </Formik>



      </div>
    </div>



  );
}

export default Login;
