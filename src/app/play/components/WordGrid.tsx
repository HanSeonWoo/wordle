import React, { useState, useEffect } from "react";

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
  const [animatingRows, setAnimatingRows] = useState<number[]>([]);

  useEffect(() => {
    if (guesses.length > 0) {
      setAnimatingRows([...animatingRows, guesses.length - 1]);
      const timer = setTimeout(() => {
        setAnimatingRows((rows) =>
          rows.filter((row) => row !== guesses.length - 1)
        );
      }, 2500); // Total animation time for a row
      return () => clearTimeout(timer);
    }
  }, [guesses]);

  const getBackgroundColor = (letter: string, index: number, word: string) => {
    if (letter === answer[index]) return "bg-green-500";
    if (answer.includes(letter)) return "bg-yellow-500";
    return "bg-gray-500";
  };

  return (
    <div className="grid grid-rows-6 gap-1 p-2">
      {guesses.map((guess, i) => (
        <div key={i} className="grid grid-cols-5 gap-1">
          {guess.split("").map((letter, j) => (
            <div
              key={j}
              className={`w-14 h-14 flex items-center justify-center text-2xl font-bold text-white rounded
                transition-colors duration-[0ms] ease-linear
                ${animatingRows.includes(i) ? "animate-flip" : ""}
                ${
                  animatingRows.includes(i)
                    ? "bg-gray-300"
                    : getBackgroundColor(letter, j, guess)
                }`}
              style={{
                animationDelay: `${j * 500}ms`,
                transitionDelay: `${j * 500 + 250}ms`,
              }}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}
      {currentGuess && (
        <div className="grid grid-cols-5 gap-1">
          {currentGuess.split("").map((letter, i) => (
            <div
              key={i}
              className="w-14 h-14 flex items-center justify-center text-2xl font-bold border-2 border-gray-300 rounded"
            >
              {letter}
            </div>
          ))}
          {[...Array(5 - currentGuess.length)].map((_, i) => (
            <div
              key={i}
              className="w-14 h-14 border-2 border-gray-300 rounded"
            />
          ))}
        </div>
      )}
      {[...Array(empties)].map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-1">
          {[...Array(5)].map((_, j) => (
            <div
              key={j}
              className="w-14 h-14 border-2 border-gray-300 rounded"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordGrid;
