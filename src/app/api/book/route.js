import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, timeSlot, message } = body;

    // 1. Explicitly ensure Event ID is a numeric integer
    const EVENT_TYPE_ID = 332761; 

    // 2. Map the dropdown time slot selection into a solid hour string
    let hourString = '09:00:00'; 
    if (timeSlot === 'afternoon') hourString = '13:00:00';
    if (timeSlot === 'late-afternoon') hourString = '16:00:00';

    // 3. Defensive Date Parsing
    // If the frontend sent a full ISO string (e.g., from a JS Date object), 
    // extract only the YYYY-MM-DD portion to prevent broken string concatenation.
    const cleanDate = date && date.includes('T') ? date.split('T')[0] : date;
    const startDateTimeISO = `${cleanDate}T${hourString}.000Z`;

    // 4. Send the payload securely matching Cal.com Core API v2 specifications
    const calResponse = await fetch('https://api.cal.eu/v2/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CAL_API_KEY}`,
        'cal-api-version': '2024-08-13', 
      },
      body: JSON.stringify({
        eventTypeId: Number(EVENT_TYPE_ID),
        start: startDateTimeISO,
        attendee: {
          name: name,
          email: email,
          timeZone: 'Africa/Johannesburg',
          language: 'en'
        },
        // Phone numbers and custom fields belong in bookingFieldsResponses for API v2
        bookingFieldsResponses: {
          phone: phone || ''
        },
        metadata: {
          notes: message || ''
        }
      }),
    });

    const calData = await calResponse.json();

    if (!calResponse.ok) {
      console.error('Cal.eu Validation or Auth Failure Log:', JSON.stringify(calData, null, 2));
      return NextResponse.json(
        { 
          error: calData.message || 'Failed to create booking in Cal.eu backend',
          details: calData.error?.details || calData
        },
        { status: calResponse.status }
      );
    }

    return NextResponse.json({ success: true, booking: calData.data }, { status: 200 });

  } catch (error) {
    console.error('Internal API Route Exception:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}