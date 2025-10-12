import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = "https://6db9-45-123-220-68.ngrok-free.app";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Forward all query parameters
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      params.append(key, value);
    });

    const response = await fetch(
      `${API_BASE_URL}/v1/calls/?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API call error:", error);
    return NextResponse.json(
      { error: "Failed to fetch calls data" },
      { status: 500 }
    );
  }
}
