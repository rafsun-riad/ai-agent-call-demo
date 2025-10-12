import { NextResponse } from "next/server";

const BASE_URL = "https://api.verbex.ai";
const TOKEN = `API_v7WxPAfwGj-rlMD-Riym2Abt8uzyr_scyV2aGgEXA-jAmiqhz6eGTMm42Qandw3r`;

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/v1/phone-numbers/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const text = await response.text();
    if (!response.ok) {
      console.error(`Phone numbers API error: ${response.status} - ${text}`);
      return NextResponse.json(
        { error: "Failed to fetch phone numbers", details: text },
        { status: response.status }
      );
    }

    // Try to parse JSON; if not JSON, return raw text
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch {
      return NextResponse.json({ data: text });
    }
  } catch (error) {
    console.error("Phone numbers route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
