import { GameState, getGameDuration, WordleStorage } from "@/app/util/store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

export interface CurrentGameStats {
  win: boolean;
  attempts: number;
  timeTaken: number;
  answer: string;
}

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGameStats: GameState;
  answer: string;
  overallStats: WordleStorage["stats"];
}

const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  onClose,
  currentGameStats,
  answer,
  overallStats,
}) => {
  const isWin = currentGameStats.guesses.includes(answer);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isWin ? "축하합니다!" : "아쉽네요!"}</DialogTitle>
          <DialogDescription>
            {isWin
              ? `${currentGameStats.guesses.length}번 만에 맞추셨습니다!`
              : `정답은 "${answer}"였습니다.`}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">이번 게임 통계</h3>
            <p>플레이 시간: {getGameDuration(currentGameStats.startTime)}</p>
            <p>시도 횟수: {currentGameStats.guesses.length}</p>
          </div>
          <div>
            <h3 className="font-semibold">전체 통계</h3>
            <p>총 게임 수: {overallStats?.totalPlays}</p>
            <p>승리 횟수: {overallStats?.wins}</p>
            <p>
              승률:{" "}
              {((overallStats?.wins / overallStats?.totalPlays) * 100).toFixed(
                2
              )}
              %
            </p>
          </div>
          <Button onClick={onClose}>닫기</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultModal;
