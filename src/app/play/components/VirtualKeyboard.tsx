import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  guesses: string[];
  answer: string;
  currentGuess: string;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  onKeyPress,
  guesses,
  answer,
  currentGuess,
}) => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
  ];

  const getKeyState = (key: string): string => {
    let state = "bg-gray-300"; // 기본 상태

    for (let i = guesses.length - 1; i >= 0; i--) {
      const guess = guesses[i];
      const indices = guess
        .split("")
        .map((char, index) => (char === key ? index : -1))
        .filter((index) => index !== -1);

      if (indices.length > 0) {
        if (indices.some((index) => answer[index] === key)) {
          return "bg-green-500"; // 정확한 위치에 있는 글자
        } else if (answer.includes(key)) {
          state = "bg-yellow-500"; // 단어에 포함되지만 위치가 다른 글자
        } else {
          return "bg-gray-500"; // 단어에 포함되지 않는 글자
        }
      }
    }

    return state;
  };

  return (
    <div className="mt-8">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.map((key) => (
            <Button
              key={key}
              onClick={() => onKeyPress(key)}
              className={cn(
                "px-2 py-3 mx-0.5 text-sm font-bold rounded text-white shadow-md hover:bg-gray-300 transition-opacity",
                key.length > 1 ? "px-4" : "min-w-[30px]",
                getKeyState(key),
                currentGuess.length === 5 && key === "ENTER"
                  ? "bg-gray-400 hover:bg-gray-400"
                  : ""
              )}
            >
              {key === "BACKSPACE" ? "←" : key}
            </Button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
