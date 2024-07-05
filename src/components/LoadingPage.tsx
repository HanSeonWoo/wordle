import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">워들 로딩 중...</h1>
      <div className="grid grid-rows-5 gap-2">
        {[...Array(5)].map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-2">
            {[...Array(5)].map((_, colIndex) => (
              <div
                key={colIndex}
                className={`w-12 h-12 rounded-md animate-pulse ${getColor(
                  rowIndex,
                  colIndex
                )}`}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const getColor = (row: number, col: number) => {
  const colors = ["bg-gray-300", "bg-yellow-500", "bg-green-500"];
  const index = (row + col) % 3;
  return colors[index];
};

export default LoadingPage;
