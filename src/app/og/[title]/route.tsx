import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { SITE_CONSTANTS } from "@/constants";

export async function GET(
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ title: string }>;
  },
) {
  const { title } = await params;

  return new ImageResponse(
    <div
      tw="flex flex-col w-full h-full items-center justify-center bg-white relative"
      style={{ padding: "48px" }}
    >
      {/* Logo in top-left corner */}
      <div
        tw="absolute left-12 top-12 flex items-center justify-center rounded-full bg-black text-white text-xl font-black"
        style={{ width: 48, height: 48 }}
      >
        AM
      </div>

      {/* Bold, thick centered text */}
      <h1
        tw="flex text-center text-black font-black leading-tight max-w-4xl"
        style={{
          fontSize: 64,
          fontWeight: 900,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h1>
      <p tw="mt-4 text-xl text-gray-600 font-medium">
        {SITE_CONSTANTS.siteName}
      </p>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
