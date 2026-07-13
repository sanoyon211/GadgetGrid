import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Securely checkout your GadgetGrid order.",
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
