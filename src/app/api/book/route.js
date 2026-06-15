import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 1. Capture the data sent by your page.js form
    const body = await request.json();
    const { name, email, phone, date, timeSlot, message } = body;

    // 2. Validate the essential data points
    if (!name || !email || !date) {
      return NextResponse.json(
        { error: "Name, email, and target date are required parameters." },
        { status: 400 }
      );
    }

    // 3. Log data to terminal for testing (Replace with WPGraphQL ingestion later)
    console.log("Calibrating incoming booking payload:", {
      name,
      email,
      phone,
      date,
      timeSlot,
      message,
    });

    // 4. Return success status back to your frontend form component
    return NextResponse.json(
      { message: "Booking intention recorded successfully." },
      { status: 200 }
    );

  } catch (error) {
    console.error("Data pipeline processing failure:", error);
    return NextResponse.json(
      { error: "Internal server error processing booking." },
      { status: 500 }
    );
  }
}