import { NextResponse } from "next/server";

// This handler fetches data for a specific state
export async function GET(request) {
  const apiKey = process.env.NPS_API_KEY;

  // Ensure the API key is present
  if (!apiKey) {
    return NextResponse.json({ error: "API key is missing" }, { status: 400 });
  }

  // Get the state code from the query parameters
  const url = new URL(request.url);
  const stateCode = url.searchParams.get("state");

  // Ensure state code is provided
  if (!stateCode) {
    return NextResponse.json(
      { error: "State code is required" },
      { status: 400 }
    );
  }

  const parksUrl = `https://developer.nps.gov/api/v1/parks?stateCode=${stateCode}&limit=500&api_key=${apiKey}`;

  try {
    const response = await fetch(parksUrl);

    // Check if the response is successful
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch data: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Check if there is park data
    if (!data || !data.data) {
      return NextResponse.json(
        { error: "No data found for the specified state" },
        { status: 404 }
      );
    }

    // Process and return the data
    const processedData = data.data.map((park) => ({
      name: park.fullName,
      state: park.states,
      description: park.description,
      url: park.url,
    }));

    return NextResponse.json({ parks: processedData });
  } catch (error) {
    console.error("Error fetching state data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
