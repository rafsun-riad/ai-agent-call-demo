import { NextResponse } from "next/server";

const BASE_URL = "https://api.verbex.ai";
const TOKEN = `API_v7WxPAfwGj-rlMD-Riym2Abt8uzyr_scyV2aGgEXA-jAmiqhz6eGTMm42Qandw3r`;

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/v2/knowledge-bases/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
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
