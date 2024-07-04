import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// types.ts
export interface GameStats {
  totalGames: number;
  wins: number;
}

export interface CurrentGameStats {
  win: boolean;
  attempts: number;
  timeTaken: number;
  answer: string;
}

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  currentGameStats: CurrentGameStats;
}

const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onClose,
  stats,
  currentGameStats,
}) => {
  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentGameStats.win ? "축하합니다!" : "아쉽네요!"}
          </DialogTitle>
          <DialogDescription>
            {currentGameStats.win
              ? `${currentGameStats.attempts}번 만에 맞추셨습니다!`
              : `정답은 "${currentGameStats.answer}"였습니다.`}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">이번 게임 통계</h3>
            <p>플레이 시간: {formatTime(currentGameStats.timeTaken)}</p>
            <p>시도 횟수: {currentGameStats.attempts}</p>
          </div>
          <div>
            <h3 className="font-semibold">전체 통계</h3>
            <p>총 게임 수: {stats.totalGames}</p>
            <p>승리 횟수: {stats.wins}</p>
            <p>승률: {((stats.wins / stats.totalGames) * 100).toFixed(1)}%</p>
          </div>
          <Button onClick={onClose}>닫기</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultModal;
