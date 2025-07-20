import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://zenquotes.io/api/today', {
      next: { revalidate: 86400 }, // Cache the result for a day (86400 seconds)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch quote from ZenQuotes');
    }

    const data = await response.json();
    return NextResponse.json(data[0]);

  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: 'Error fetching quote' }),
      { status: 500 }
    );
  }
}
