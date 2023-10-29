import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await Ticket.findByIdAndDelete(id);

    return NextResponse.json({ message: "Ticket deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const ticket = await Ticket.findById(id);
    if (!ticket)
      return NextResponse.json(
        { message: "Ticket not found" },
        { status: 400 }
      );
    return NextResponse.json({ ticket }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const ticketData = body.formData;

    await Ticket.findByIdAndUpdate(id, ticketData);

    return NextResponse.json({ message: "Ticket updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
