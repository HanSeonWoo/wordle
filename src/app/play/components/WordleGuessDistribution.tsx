import { WordleStorage } from "@/app/util/store";

type Props = {
  guessDistribution: WordleStorage["stats"]["guessDistribution"];
};
const WordleGuessDistribution = ({ guessDistribution }: Props) => {
  const maxCount = Math.max(...Object.values(guessDistribution));

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-3 text-center">맞춘 횟수 분포</h2>
      <div className="space-y-2">
        {[1, 2, 3, 4, 5, 6].map((guessCount) => {
          const count = guessDistribution[guessCount] || 0;
          const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;

          return (
            <div key={guessCount} className="flex items-center">
              <span className="w-4 text-right mr-2">{guessCount}</span>
              <div className="flex-grow bg-gray-200 rounded-full h-5 overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
                  style={{ width: `${percentage}%` }}
                >
                  {count > 0 && (
                    <span className="text-xs text-white font-semibold">
                      {count}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WordleGuessDistribution;
