"use client";

import { checkWord } from "@/app/util/checkWord";
import { decodeWord } from "@/app/util/hash";
import LoadingPage from "@/components/LoadingPage";
import { useEffect, useState } from "react";
import Play from "../components/Play";

type Props = {
  params: {
    hash: string;
  };
};

export default function Page({ params: { hash } }: Props) {
  const [word, setWord] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const customWord = decodeWord(hash);
    const validateWord = async () => {
      setIsLoading(true);
      try {
        const isValid = await checkWord(customWord);
        console.log("🚀 ~ validateWord ~ isValid:", isValid);
        if (isValid) {
          setWord(customWord);
        } else {
          setError("유효하지 않은 단어입니다.");
        }
      } catch (err) {
        setError("단어 확인 중 오류가 발생했습니다.");
        console.error("Word validation error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    validateWord();
  }, [hash]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!word) {
    return <div className="text-center">유효한 단어를 찾을 수 없습니다.</div>;
  }

  return <Play answer={word} />;
}
