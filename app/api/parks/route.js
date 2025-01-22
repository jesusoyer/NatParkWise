import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NPS_API_KEY;
  const url = `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
