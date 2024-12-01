import type { Metadata } from "next";
import { pretendard } from "@/public/fonts/font";
import "./globals.css";
import CustomLayout from "@/components/layout/custom-layout";

export const metadata: Metadata = {
  title: "ChromoMood",
  description:
    "Text to Emotion, Emotion to Color: We transform your words into stories painted with beautiful colors.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "ChromoMood",
    description:
      "Text to Emotion, Emotion to Color: We transform your words into stories painted with beautiful colors.",
    siteName: "ChromoMood",
    images: [
      {
        url: "/og_image.png",
        width: 1200,
        height: 630,
        alt: "ChromoMood Preview",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable} antialiased`}>
      <body>
        <CustomLayout>{children}</CustomLayout>
      </body>
    </html>
  );
}
