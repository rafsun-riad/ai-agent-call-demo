import { NextResponse } from "next/server";

const API_BASE_URL = "https://api.verbex.ai";

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/v2/knowledge-bases/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch knowledge bases" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching knowledge bases:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
