import React, { useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios from "axios"

function Connection (props) {
  const [error,setError] = useState()
  return (
    <div className="container">
      <h1>Connexion</h1>
      <div className="alert alert-danger"></div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required('Un email est nécessaire')
            .email('Entrez un email valide'),
          password: Yup.string()
            .required('Un mot de passe est nécessaire')
            .min(6, 'Votre mot de passe doit comporter au minimum 6 caractères')
            .max(10, 'Votre mot de passe doit comporter au maximum 10 caractères'),
        })}
        onSubmit={async (values) => {
          try {
            const res = await axios.post('/user/login')
          } catch (error) {

          }
        }}
      >
        <Form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <Field name="email" id="email" className="form-control"/>
            <ErrorMessage name="email" component="div" className="alert alert-warning"/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <Field type="password" id="password" name="password" className="form-control"/>
            <ErrorMessage name="password" component="div" className="alert alert-warning"/>
          </div>
          <button type="submit" className="btn btn-primary">Connexion</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Connection
