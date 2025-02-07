import { motion, stagger, useAnimate } from "motion/react";
import { useEffect } from "react";

const TypingAnimation = () => {
  const [scope, animate] = useAnimate();
  const firstLine = "Text to Emotion, Emotion to Color".split("");
  const secondLine = "Turning your words into beautiful colors.".split("");

  useEffect(() => {
    const animateText = async () => {
      await animate(
        ".first-line span",
        { opacity: 1, y: 0 },
        {
          duration: 0.02,
          delay: stagger(0.04, { from: "first" }),
          ease: "easeOut",
        }
      );

      await new Promise((resolve) => setTimeout(resolve, 400));

      await animate(
        ".second-line span",
        { opacity: 1, y: 0 },
        {
          duration: 0.02,
          delay: stagger(0.04, { from: "first" }),
          ease: "easeOut",
        }
      );

      animate(
        ".cursor",
        { opacity: [0, 1] },
        {
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
        }
      );
    };

    animateText();
  }, [animate]);

  return (
    <div
      ref={scope}
      className="text-xl text-center text-muted-foreground text-black"
    >
      <div className="first-line mb-2 relative">
        {firstLine.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 5 }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
      <div className="second-line relative">
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          className="inline-block text-black font-bold"
        >
          {secondLine.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 5 }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
          <motion.span
            className="cursor inline-block w-[2px] h-[1.2em] bg-black ml-1"
            initial={{ opacity: 0 }}
          />
        </motion.span>
      </div>
    </div>
  );
};

export default TypingAnimation;
