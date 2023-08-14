import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const body = await req.json();
  try {
    await prisma.order.update({
      where: {
        id: params.id,
      },
      data: {
        status: body,
      },
    });
    return new NextResponse(JSON.stringify({ message: "Updated completed!" }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Failed!" }), {
      status: 500,
    });
  }
};
