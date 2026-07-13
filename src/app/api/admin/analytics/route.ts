import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Order from "@/models/Order";
import Gadget from "@/models/Gadget";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    
    // Revenue over last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    const orders = await Order.find({ createdAt: { $gte: sixMonthsAgo } });

    const monthlyData: Record<string, number> = {};
    const categoryData: Record<string, number> = {};

    // Get all categories initially to 0
    const gadgets = await Gadget.find({});
    gadgets.forEach(g => {
        if (!categoryData[g.category]) {
            categoryData[g.category] = 0;
        }
    });

    orders.forEach(order => {
        const month = new Date(order.createdAt).toLocaleString('default', { month: 'short' });
        monthlyData[month] = (monthlyData[month] || 0) + order.totalAmount;

        order.items.forEach((item: any) => {
            const gadg = gadgets.find(g => g._id.toString() === item.product.toString());
            const cat = gadg?.category || "Other";
            categoryData[cat] = (categoryData[cat] || 0) + (item.price * item.quantity);
        });
    });

    // Format for charts
    const revenueChart = Object.keys(monthlyData).map(month => ({
        name: month,
        revenue: monthlyData[month]
    }));

    const categoryChart = Object.keys(categoryData).map(cat => ({
        name: cat,
        value: categoryData[cat]
    }));

    return NextResponse.json({ revenueChart, categoryChart }, { status: 200 });
  } catch (error) {
    console.error("Analytics GET error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
