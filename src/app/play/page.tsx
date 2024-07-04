"use client";

import { useCallback, useEffect, useState } from "react";
// import { checkWord, decryptWord } from '@/utils/wordUtils';
// import { saveGameStats } from '@/utils/statsUtils';
import WordGrid from "./components/WordGrid";
import VirtualKeyboard from "./components/VirtualKeyboard";
import { checkWord } from "../util/checkWord";
import Header from "./components/Header";
import { useToast } from "@/components/ui/use-toast";
import ResultModal from "./components/ResultModal";

const DEFAULT_WORD = "WORLD";

export default function Play() {
  const [answer, setAnswer] = useState(DEFAULT_WORD);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [stats, setStats] = useState({ totalGames: 0, wins: 0 });

  const { toast } = useToast();

  const handleShowResults = () => {
    setShowResults(true);
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };
  const currentGameStats = {
    win: gameOver && guesses[guesses.length - 1] === answer,
    attempts: guesses.length,
    timeTaken: Date.now() - startTime,
    answer: answer,
  };

  const handleKeyPress = useCallback(
    async (key: string) => {
      if (gameOver) return;
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
        setGuesses([...guesses, currentGuess]);
        if (currentGuess === answer) {
          setGameOver(true);
          //   saveGameStats(true, guesses.length + 1, Date.now() - startTime);
        } else if (guesses.length === 5) {
          setGameOver(true);
          //   saveGameStats(false, 6, Date.now() - startTime);
        }
        setCurrentGuess("");
      } else if (key === "BACKSPACE") {
        setCurrentGuess(currentGuess.slice(0, -1));
      } else if (currentGuess.length < 5) {
        setCurrentGuess(currentGuess + key);
      }
    },
    [answer, currentGuess, gameOver, guesses, toast]
  );

  // Handle physical keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log("🚀 ~ handleKeyDown ~ event:", event);
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

  return (
    <main className="flex flex-col items-center">
      <Header />
      <WordGrid guesses={guesses} currentGuess={currentGuess} answer={answer} />
      <VirtualKeyboard
        onKeyPress={handleKeyPress}
        guesses={guesses}
        answer={answer}
      />
      <ResultModal
        isOpen={showResults}
        onClose={handleCloseResults}
        stats={stats}
        currentGameStats={currentGameStats}
      />
    </main>
  );
}
