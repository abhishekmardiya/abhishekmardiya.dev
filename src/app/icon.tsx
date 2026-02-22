import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div tw="flex items-center justify-center rounded-full w-full h-full bg-black">
      <span
        tw="font-bold text-white"
        style={{
          fontSize: 14,
        }}
      >
        AM
      </span>
    </div>,
    {
      ...size,
    },
  );
}
