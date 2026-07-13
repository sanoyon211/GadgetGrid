import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongoose";
import Order from "@/models/Order";
import User from "@/models/User";
import Gadget from "@/models/Gadget";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const isAdmin = session.user.role === "admin";
    const userId = session.user.id;

    if (isAdmin) {
      const [
        totalUsers,
        totalProducts,
        pendingOrders,
        salesResult,
        recentOrders,
        monthlySalesResult
      ] = await Promise.all([
        User.countDocuments(),
        Gadget.countDocuments(),
        Order.countDocuments({ status: "pending" }),
        Order.aggregate([
          { $match: { status: { $ne: "cancelled" } } },
          { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]),
        Order.find().sort({ createdAt: -1 }).limit(3).populate('user', 'name email'),
        Order.aggregate([
          { $match: { status: { $ne: "cancelled" } } },
          {
            $group: {
              _id: { 
                year: { $year: "$createdAt" }, 
                month: { $month: "$createdAt" } 
              },
              total: { $sum: "$totalAmount" }
            }
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } }
        ])
      ]);

      const totalSales = salesResult.length > 0 ? salesResult[0].total : 0;

      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      
      const currentDate = new Date();
      const salesData = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const year = d.getFullYear();
        const month = d.getMonth() + 1; // 1-12
        
        const found = monthlySalesResult.find(item => item._id.year === year && item._id.month === month);
        salesData.push({
          name: months[month - 1],
          sales: found ? found.total : 0
        });
      }

      const recentActivities = recentOrders.map(order => ({
        id: order._id.toString(),
        title: `Order #${order._id.toString().slice(-6).toUpperCase()} placed`,
        time: order.createdAt,
      }));

      return NextResponse.json({
        totalUsers,
        totalProducts,
        totalSales,
        pendingOrders,
        salesData,
        recentActivities
      });

    } else {
      const userObjectId = new mongoose.Types.ObjectId(userId);
      const [
        totalOrders,
        pendingDelivery,
        spentResult,
        latestOrders,
        monthlySpentResult
      ] = await Promise.all([
        Order.countDocuments({ user: userObjectId }),
        Order.countDocuments({ 
          user: userObjectId, 
          status: { $in: ["pending", "processing", "shipped"] } 
        }),
        Order.aggregate([
          { $match: { user: userObjectId, status: { $ne: "cancelled" } } },
          { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]),
        Order.find({ user: userObjectId }).sort({ createdAt: -1 }).limit(1),
        Order.aggregate([
          { $match: { user: userObjectId, status: { $ne: "cancelled" } } },
          {
            $group: {
              _id: { 
                year: { $year: "$createdAt" }, 
                month: { $month: "$createdAt" } 
              },
              total: { $sum: "$totalAmount" }
            }
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } }
        ])
      ]);

      const totalSpent = spentResult.length > 0 ? spentResult[0].total : 0;
      const rewardPoints = Math.floor(totalSpent); 
      const latestOrder = latestOrders.length > 0 ? latestOrders[0] : null;

      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const currentDate = new Date();
      const spendingData = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        
        const found = monthlySpentResult.find(item => item._id.year === year && item._id.month === month);
        spendingData.push({
          name: months[month - 1],
          sales: found ? found.total : 0
        });
      }

      return NextResponse.json({
        totalOrders,
        pendingDelivery,
        totalSpent,
        rewardPoints,
        latestOrder,
        spendingData
      });
    }
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
