import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!// 環境変数で管理（.envに記述）
    });

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: content,
    });

    return NextResponse.json({ result: result.text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'エラーが発生しました。' }, { status: 500 });
  }
}