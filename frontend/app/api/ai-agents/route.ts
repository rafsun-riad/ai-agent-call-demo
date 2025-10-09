import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.verbex.ai";
const TOKEN = `API_v7WxPAfwGj-rlMD-Riym2Abt8uzyr_scyV2aGgEXA-jAmiqhz6eGTMm42Qandw3r`;

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/v2/ai-agents/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI agents" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${BASE_URL}/v2/ai-agents/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to create AI agent" },
      { status: 500 }
    );
  }
}
