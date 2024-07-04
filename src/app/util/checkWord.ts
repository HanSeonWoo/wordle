interface DictionaryResponse {
  word: string;
  // 다른 필드들도 있지만, 여기서는 단어의 존재 여부만 확인하므로 생략합니다.
}

export async function checkWord(word: string): Promise<boolean> {
  const apiUrl = `${process.env.NEXT_PUBLIC_DICTIONARY_API_URL}/en/${word}`;

  try {
    const response = await fetch(apiUrl);
    console.log("🚀 ~ checkWord ~ response:", response.status, response.ok);

    if (!response.ok) {
      // 404 오류는 단어를 찾지 못했다는 의미이므로 false를 반환합니다.
      if (response.status === 404) {
        return false;
      }
      // 다른 HTTP 오류의 경우 예외를 발생시킵니다.
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as DictionaryResponse[];

    // API가 결과를 반환하면 (빈 배열이 아니면) 유효한 단어입니다.
    return data.length > 0;
  } catch (error) {
    console.error("Error checking word:", error);
    // 네트워크 오류 등의 경우 false를 반환합니다.
    // 실제 프로덕션 환경에서는 이 부분을 더 세밀하게 처리해야 할 수 있습니다.
    return false;
  }
}
