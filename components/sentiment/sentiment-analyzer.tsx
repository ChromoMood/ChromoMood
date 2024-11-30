'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SentimentResult {
  positive: number;
  negative: number;
  neutral: number;
  color: string;
  emotion: string;
}

let pipeline: any = null;

const getEmotionColor = (score: number): { color: string; emotion: string } => {
  // 감정 점수에 따른 색상 및 감정 매핑
  if (score > 0.8) return { color: '#FFD700', emotion: 'Serenity' }; // 밝은 노랑 - 매우 긍정
  if (score > 0.6) return { color: '#98FB98', emotion: 'Trust' }; // 밝은 초록 - 긍정
  if (score > 0.4) return { color: '#87CEEB', emotion: 'Amazement' }; // 하늘색 - 약간 긍정
  if (score > 0.2) return { color: '#DDA0DD', emotion: 'Interest' }; // 연보라 - 중립적 긍정
  if (score < -0.8) return { color: '#800000', emotion: 'Grief' }; // 어두운 빨강 - 매우 부정
  if (score < -0.6) return { color: '#8B4513', emotion: 'Remorse' }; // 갈색 - 부정
  if (score < -0.4) return { color: '#4B0082', emotion: 'Sadness' }; // 남색 - 약간 부정
  if (score < -0.2) return { color: '#483D8B', emotion: 'Pensiveness' }; // 어두운 남색 - 중립적 부정
  return { color: '#808080', emotion: 'Neutral' }; // 회색 - 중립
};

const SentimentAnalyzer = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [isModelLoading, setIsModelLoading] = useState(true);

  useEffect(() => {
    const loadModel = async () => {
      try {
        if (typeof window !== 'undefined') {
          const { pipeline: transformersPipeline } = await import('@xenova/transformers');
          pipeline = await transformersPipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english', {
            quantized: false
          });
          setIsModelLoading(false);
        }
      } catch (err) {
        console.error('Model loading error:', err);
        setError('Error occurred while loading the model.');
        setIsModelLoading(false);
      }
    };

    loadModel();
  }, []);

  const analyzeSentiment = async () => {
    if (!pipeline) {
      setError('Model has not been loaded yet.');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError('');

      const result = await pipeline(text);
      const sentimentScore = result[0].label === 'POSITIVE' ? result[0].score : -result[0].score;
      const { color, emotion } = getEmotionColor(sentimentScore);

      const scores: SentimentResult = {
        positive: result[0].label === 'POSITIVE' ? result[0].score : 0,
        negative: result[0].label === 'NEGATIVE' ? result[0].score : 0,
        neutral: 1 - result[0].score,
        color,
        emotion
      };

      setResult(scores);
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Error occurred during analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <textarea
        className="w-full p-4 border rounded-lg h-32 focus:ring-2 focus:ring-black focus:border-transparent"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to analyze... (English)"
        disabled={isAnalyzing || isModelLoading}
      />
      
      <motion.button
        className="w-full bg-black text-white font-bold py-2 rounded-lg hover:bg-black/80 disabled:bg-gray-400"
        onClick={analyzeSentiment}
        disabled={!text.trim() || isAnalyzing || isModelLoading}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {isModelLoading ? 'Loading model...' : 
         isAnalyzing ? 'Analyzing.....' : 'Analyze Sentiment'}
      </motion.button>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {result && (
        <div className="p-4 bg-gray-50 rounded-lg space-y-4">
          <div 
            className="w-full h-32 rounded-lg transition-colors duration-500 flex items-center justify-center"
            style={{ backgroundColor: result.color }}
          >
            <span className="text-2xl font-bold text-white drop-shadow-lg">
              {result.emotion}
            </span>
          </div>
          
          <div className="space-y-2">
            {Object.entries(result)
              .filter(([key]) => ['positive', 'negative', 'neutral'].includes(key))
              .map(([sentiment, score]) => (
                <div key={sentiment} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="capitalize">
                      {sentiment === 'positive' ? 'Positive' : 
                       sentiment === 'negative' ? 'Negative' : 'Neutral'}
                    </span>
                    <span>{(score * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${score * 100}%`,
                        backgroundColor: result.color
                      }}
                    />
                  </div>
                </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SentimentAnalyzer;