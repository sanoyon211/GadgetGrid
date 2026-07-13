import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { Suspense } from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description: "Sign in to your GadgetGrid account to track orders and manage your profile.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
