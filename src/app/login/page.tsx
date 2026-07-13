import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description: "Sign in to your GadgetGrid account to track orders and manage your profile.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
