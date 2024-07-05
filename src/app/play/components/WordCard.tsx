"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const ANIMATION_TIME = 500;

interface WordCardProps {
  letter: string;
  status: "initial" | "flipping" | "correct" | "present" | "absent";
  delay: number;
  isCurrent?: boolean;
}

const WordCard: React.FC<WordCardProps> = ({ letter, status, delay }) => {
  const [currentStatus, setCurrentStatus] = useState<
    "initial" | "flipping" | "correct" | "present" | "absent"
  >("initial");

  useEffect(() => {
    if (["correct", "present", "absent"].includes(status)) {
      setTimeout(() => {
        setCurrentStatus("flipping");
        setTimeout(() => {
          setCurrentStatus(status);
        }, ANIMATION_TIME);
      }, delay);
    }
  }, [delay, status]);

  const getBackgroundColor = () => {
    switch (currentStatus) {
      case "correct":
        return "bg-green-500";
      case "present":
        return "bg-yellow-500";
      case "absent":
        return "bg-gray-500";
      default:
        return "bg-white";
    }
  };
  return (
    <div
      className={cn(
        "w-14 h-14 flex items-center justify-center text-2xl font-bold border-2 rounded ",
        currentStatus !== "initial" && currentStatus !== "flipping"
          ? "text-white"
          : "text-black",
        getBackgroundColor(),
        currentStatus === "flipping" ? "animate-flip" : "",
        `transition-colors`
      )}
    >
      {letter}
    </div>
  );
};

export default WordCard;
