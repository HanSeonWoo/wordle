"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { checkWord } from "../util/checkWord";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { encodeWord } from "../util/hash";

const CreateWordlePage: React.FC = () => {
  const [word, setWord] = useState("");
  const [gameId, setGameId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (word.length !== 5) {
      toast({
        title: "잘못된 단어 길이",
        description: "단어는 정확히 5글자여야 합니다.",
        duration: 3000,
      });
      setIsLoading(false);
      return;
    }

    if (!/^[A-Za-z]+$/.test(word)) {
      toast({
        title: "잘못된 문자",
        description: "영문자만 사용할 수 있습니다.",
        duration: 3000,
      });
      setIsLoading(false);
      return;
    }

    try {
      const isValidWord = await checkWord(word.toLowerCase());
      if (!isValidWord) {
        toast({
          title: "유효하지 않은 단어",
          description: "사전에 없는 단어입니다. 다른 단어를 입력해주세요.",
          duration: 3000,
        });
        setIsLoading(false);
        return;
      }

      const newGameId = encodeWord(word.toUpperCase());
      setGameId(newGameId);
      toast({
        title: "게임 생성 성공",
        description: "새로운 워들 게임이 생성되었습니다.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "게임 생성 실패",
        description:
          "게임을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    const gameUrl = `${window.location.origin}/play/${gameId}`;
    navigator.clipboard
      .writeText(gameUrl)
      .then(() => {
        toast({
          title: "URL 복사 완료",
          description: "게임 URL이 클립보드에 복사되었습니다.",
          duration: 2000,
        });
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast({
          title: "복사 실패",
          description:
            "URL을 복사하는데 실패했습니다. 직접 선택하여 복사해주세요.",
          duration: 3000,
        });
      });
  };

  return (
    <div className="container mx-auto max-w-md mt-10">
      <h1 className="text-2xl font-bold mb-6">워들 생성하기</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="word"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            5글자 단어 입력
          </label>
          <Input
            id="word"
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            maxLength={5}
            placeholder="5글자 영단어 입력"
            className="w-full"
            disabled={isLoading}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "생성 중..." : "게임 생성"}
        </Button>
      </form>
      {gameId && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <p className="text-sm font-medium text-gray-700 mb-2">
            생성된 게임 URL:
          </p>
          <div className="flex items-center space-x-2">
            <Input
              value={`${window.location.origin}/play/${gameId}`}
              readOnly
              className="flex-grow"
            />
            <Button onClick={copyToClipboard} size="sm">
              <ClipboardIcon className="size-6" />
              복사
            </Button>
          </div>
          <div className="mt-4">
            <Link href={`/play/${gameId}`} passHref>
              <Button className="w-full">게임 시작</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateWordlePage;
