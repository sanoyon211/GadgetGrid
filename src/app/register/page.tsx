import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a new GadgetGrid account and start shopping for premium tech gadgets today.",
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
