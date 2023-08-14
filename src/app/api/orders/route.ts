import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();
  if (session) {
    try {
      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany();
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      } else {
        const orders = await prisma.order.findMany({
          where: {
            userEmail: session.user.email!,
          },
        });
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      }
    } catch (error) {
      return new NextResponse(JSON.stringify(error), { status: 500 });
    }
  } else {
    return new NextResponse(JSON.stringify("You are not authenticate"), {
      status: 401,
    });
  }
};

// CREATE ORDER
export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    try {
      const body = await req.json();
      const order = await prisma.order.create({
        data: body,
      });
      return new NextResponse(JSON.stringify(order), { status: 201 });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "You are not authenticated!" }),
      { status: 401 }
    );
  }
};
