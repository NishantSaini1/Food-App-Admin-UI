"use client";

import { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { loginSchema } from "@/validations/login.schema";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/auth/auth.actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const { loading, error, token } = useSelector((state: any) => state.auth);

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (token) {
      router.push("/");
      return;
    }

    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("accessToken");
      if (storedToken) {
        router.push("/");
      }
    }
  }, [token, router]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[1.2fr_minmax(0,1fr)] gap-8 items-center">
        {/* Left: Brand + copy */}
        <div className="hidden md:flex flex-col gap-4 text-white/90">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80">
            Food Admin
          </span>
          <h1 className="text-3xl font-semibold leading-tight">
            Manage your restaurant
            <br />
            in one clean dashboard.
          </h1>
          <p className="text-sm text-white/70 max-w-md">
            Track orders, update menu items, monitor payments and view reports
            from a single admin panel. Log in to get started.
          </p>
        </div>

        {/* Right: Card */}
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl px-5 py-7 sm:px-8 sm:py-8">
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome back
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to your Food Admin account
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {typeof error === "string" ? error : "Login failed. Try again."}
            </div>
          )}

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              const payload = {
                returnSecureToken: true,
                ...values,
              };
              dispatch(login(payload));
            }}
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

              <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                <span>Use your admin credentials to log in.</span>
                <button
                  type="button"
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  Forgot password?
                </button>
              </div>

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
    </div>
  );
}
