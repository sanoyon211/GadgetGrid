import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with GadgetGrid support team. We're here to help you with any questions or issues.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
