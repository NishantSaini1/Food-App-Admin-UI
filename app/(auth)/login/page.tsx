"use client";

import { Formik, Form, Field } from "formik";
import { loginSchema } from "@/validations/login.schema";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/auth/auth.actions";

export default function LoginPage() {
  const dispatch = useDispatch<any>();
  const { loading, error } = useSelector((state: any) => state.auth);

  return (
<div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center px-4">
      
      {/* Card */}
      <div className="
    w-full max-w-md
    bg-white
    rounded-2xl
    shadow-xl
    px-5 py-7
    sm:px-8 sm:py-8
  ">        
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Food Admin
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to manage orders
          </p>
        </div>

        <Formik
          initialValues={{ email: "", password: ""}}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            let obj ={
                returnSecureToken: true,
                ...values
            }
            console.log("valuesvalues",obj)
            dispatch(login(obj))}}
        >
          <Form className="space-y-4">
            
            <Field
              name="email"
              type="email"
              placeholder="Email address"
              component={Input}
            />

            <Field
              name="password"
              type="password"
              placeholder="Password"
              component={Input}
            />
            

            {/* Action */}
            <Button loading={loading} className="w-full mt-2">
              Login
            </Button>
          </Form>
        </Formik>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          © {new Date().getFullYear()} Food Admin Panel
        </p>
      </div>
    </div>
  );
}
