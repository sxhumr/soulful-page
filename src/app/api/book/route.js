// src/app/api/booking/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, timeSlot, message } = body;

    const EVENT_TYPE_ID = 332761; 

    let hourString = '09:00:00'; 
    if (timeSlot === 'afternoon') hourString = '13:00:00';
    if (timeSlot === 'late-afternoon') hourString = '16:00:00';

    const cleanDate = date && date.includes('T') ? date.split('T')[0] : date;
    const startDateTimeISO = `${cleanDate}T${hourString}.000Z`;

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
          name,
          email,
          timeZone: 'Africa/Johannesburg',
          language: 'en'
        },
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
      console.error('Cal.eu Validation Failure:', JSON.stringify(calData, null, 2));
      return NextResponse.json(
        { error: calData.message || 'Failed to create booking in Cal.eu backend' },
        { status: calResponse.status }
      );
    }

    return NextResponse.json({ success: true, booking: calData.data }, { status: 200 });

  } catch (error) {
    console.error('Internal API Route Exception:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}