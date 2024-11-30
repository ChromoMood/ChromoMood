"use client";

import SentimentAnalyzer from "@/components/sentiment/sentiment-analyzer";
import TypingAnimation from "@/components/sentiment/typing-animation";

export default function Home() {
  return (
    <div className="p-10">
      <TypingAnimation/>
      <SentimentAnalyzer/>
    </div>
  );
}
