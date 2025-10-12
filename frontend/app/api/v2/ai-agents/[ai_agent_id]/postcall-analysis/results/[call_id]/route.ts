import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.verbex.ai";
const TOKEN = `API_v7WxPAfwGj-rlMD-Riym2Abt8uzyr_scyV2aGgEXA-jAmiqhz6eGTMm42Qandw3r`;

export async function GET(
  request: NextRequest,
  { params }: { params: { ai_agent_id: string; call_id: string } }
) {
  try {
    const { ai_agent_id, call_id } = params;

    const response = await fetch(
      `${BASE_URL}/v2/ai-agents/${ai_agent_id}/postcall-analysis/results/${call_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Post call analysis API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch post call analysis" },
      { status: 500 }
    );
  }
}
