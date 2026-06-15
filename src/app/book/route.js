import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, timeSlot, message } = body;

    // 1. Get your Cal.com Event Type ID
    // Look at your Cal.com dashboard under 'Event Types', click your event, 
    // and grab the number from the URL bar (e.g., cal.com/event-types/123456)
    const EVENT_TYPE_ID = 332761; // ◄─── Replace with your actual Cal.com Event Type ID

    // 2. Map the dropdown time slot selection into a solid hour string
    let hourString = '09:00:00'; // Default morning
    if (timeSlot === 'afternoon') hourString = '13:00:00';
    if (timeSlot === 'late-afternoon') hourString = '16:00:00';

    // 3. Construct a standard ISO 8601 UTC timestamp string for Cal.com
    // South Africa is UTC+2, so we format it without timezone offsets for the API
    const startDateTimeISO = `${date}T${hourString}.000Z`;

    // 4. Send the payload securely to Cal.com's Core API v2
    const calResponse = await fetch('https://api.cal.eu/v2/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CAL_API_KEY}`,
        'cal-api-version': '2024-08-13', // Current stable API spec line
      },
      body: JSON.stringify({
        eventTypeId: EVENT_TYPE_ID,
        start: startDateTimeISO,
        attendee: {
          name: name,
          email: email,
          timeZone: 'Africa/Johannesburg',
          language: 'en',
          phoneNumber: phone
        },
        metadata: {
          notes: message
        }
      }),
    });

    const calData = await calResponse.json();

    if (!calResponse.ok) {
      console.error('Cal.eu Error Log:', calData);
      return NextResponse.json(
        { error: calData.message || 'Failed to create booking in Cal.eu backend' },
        { status: calResponse.status }
      );
    }

    return NextResponse.json({ success: true, booking: calData.data }, { status: 200 });

  } catch (error) {
    console.error('Internal API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}