import OrderHistory from "@/components/dashboard/OrderHistory";

export const metadata = {
  title: "My Orders | GadgetGrid",
  description: "View your order history.",
};

export default function OrdersPage() {
  return <OrderHistory />;
}
