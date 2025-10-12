import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.verbex.ai";
const TOKEN = `API_v7WxPAfwGj-rlMD-Riym2Abt8uzyr_scyV2aGgEXA-jAmiqhz6eGTMm42Qandw3r`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { from_number, to_number } = body;

    if (!from_number || !to_number) {
      return NextResponse.json(
        { error: "from_number and to_number are required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${BASE_URL}/v1/calls/dial-outbound-phone-call`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          from_number,
          to_number,
          direction: "outbound",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Dial outbound call API error: ${response.status} - ${errorText}`
      );
      return NextResponse.json(
        { error: "Failed to initiate call", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Dial outbound call route error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
