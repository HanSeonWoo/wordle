"use client";

import { checkWord } from "@/app/util/checkWord";
import {
  GameState,
  getGameStats,
  loadGameState,
  saveGameState,
  startNewGame,
  updateGameStats,
} from "@/app/util/store";
import { useToast } from "@/components/ui/use-toast";
import { useCallback, useEffect, useState } from "react";
import ResultModal from "./ResultModal";
import VirtualKeyboard from "./VirtualKeyboard";
import WordGrid from "./WordGrid";

export default function Play({ answer }: { answer: string }) {
  const [gameState, setGameState] = useState<GameState>({
    guesses: [],
    startTime: Date.now(),
    isComplete: false,
  });
  const [showResults, setShowResults] = useState(false);
  const [currentGuess, setCurrentGuess] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const savedState = loadGameState(answer);
    if (savedState) {
      setGameState(savedState);
    } else {
      const newGame = startNewGame(answer);
      setGameState(newGame);
    }
  }, [answer]);

  const handleKeyPress = useCallback(
    async (key: string) => {
      if (gameState.isComplete) return;

      if (key === "ENTER") {
        if (currentGuess.length !== 5) return;

        const isValidWord = await checkWord(currentGuess);
        if (!isValidWord) {
          toast({
            title: "단어를 찾을 수 없습니다.",
            description: "올바른 단어인지 확인해주세요.",
          });
          return;
        }

        const newGuesses = [...gameState.guesses, currentGuess];
        const newIsComplete =
          currentGuess === answer || newGuesses.length === 6;

        setGameState((prevState) => ({
          ...prevState,
          guesses: newGuesses,
          isComplete: newIsComplete,
        }));
        setCurrentGuess("");

        saveGameState(answer, {
          guesses: newGuesses,
          startTime: gameState.startTime,
          isComplete: newIsComplete,
        });

        if (newIsComplete) {
          updateGameStats(answer, currentGuess === answer, newGuesses.length);
          // 짧은 지연 후 결과 모달 표시
          setTimeout(() => {
            setShowResults(true);
          }, 300 * 5); //
        }
      } else if (key === "BACKSPACE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [
      gameState.isComplete,
      gameState.guesses,
      gameState.startTime,
      currentGuess,
      answer,
      toast,
    ]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.altKey || event.metaKey) return;

      if (event.key === "Enter") {
        handleKeyPress("ENTER");
      } else if (event.key === "Backspace") {
        handleKeyPress("BACKSPACE");
      } else {
        const key = event.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) {
          handleKeyPress(key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyPress]);

  const handleCloseResults = () => {
    setShowResults(false);
  };

  return (
    <main className="flex flex-col items-center">
      <WordGrid
        guesses={gameState.guesses}
        currentGuess={currentGuess}
        answer={answer}
      />
      <VirtualKeyboard
        onKeyPress={handleKeyPress}
        guesses={gameState.guesses}
        currentGuess={currentGuess}
        answer={answer}
      />
      <ResultModal
        isOpen={showResults}
        onClose={handleCloseResults}
        currentGameStats={gameState}
        overallStats={getGameStats()}
        answer={answer}
      />
    </main>
  );
}
