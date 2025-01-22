import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json(); // Parse the incoming JSON data
    console.log('Received data:', body);

    // Simulate saving data or performing an action
    return NextResponse.json({
      message: 'Data received successfully',
      data: body,
    });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
