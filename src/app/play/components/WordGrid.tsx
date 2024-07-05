import React from "react";
import WordRow from "./WordRow";

interface WordGridProps {
  guesses: string[];
  currentGuess: string;
  answer: string;
}

const WordGrid: React.FC<WordGridProps> = ({
  guesses,
  currentGuess,
  answer,
}) => {
  const empties = 6 - guesses.length - (currentGuess ? 1 : 0);

  return (
    <div className="grid grid-rows-6 gap-1 p-2">
      {guesses.map((guess, index) => (
        <WordRow key={index} word={guess} answer={answer} isRevealing />
      ))}
      {currentGuess && (
        <WordRow
          word={currentGuess.padEnd(5)}
          answer={answer}
          isCurrent={true}
        />
      )}
      {[...Array(empties)].map((_, index) => (
        <WordRow
          key={guesses.length + (currentGuess ? 1 : 0) + index}
          word="     "
          answer={answer}
        />
      ))}
    </div>
  );
};

export default WordGrid;
