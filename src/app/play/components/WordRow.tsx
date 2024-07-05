import React, { useState, useEffect } from "react";
import WordCard, { ANIMATION_TIME } from "./WordCard";

interface WordRowProps {
  word: string;
  answer: string;
  isRevealing?: boolean;
  isCurrent?: boolean;
}

type CardStatus = "initial" | "flipping" | "correct" | "present" | "absent";

const WordRow: React.FC<WordRowProps> = ({
  word,
  answer,
  isRevealing = false,
  isCurrent = false,
}) => {
  const [cardStatuses, setCardStatuses] = useState<CardStatus[]>(
    Array(5).fill("initial")
  );

  useEffect(() => {
    if (isRevealing) {
      const newStatuses: CardStatus[] = word.split("").map((letter, index) => {
        if (letter === answer[index]) return "correct";
        if (answer.includes(letter)) return "present";
        return "absent";
      });
      setCardStatuses(newStatuses);
    }
  }, [isRevealing, word, answer]);

  return (
    <div className="grid grid-cols-5 gap-1">
      {word.split("").map((letter, index) => (
        <WordCard
          key={index}
          letter={letter}
          status={cardStatuses[index]}
          delay={index * ANIMATION_TIME}
          isCurrent={isCurrent}
        />
      ))}
    </div>
  );
};

export default WordRow;
