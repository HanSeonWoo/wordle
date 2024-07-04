import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <Image alt="wordle image" src={"/wordle.png"} width={100} height={100} />
      <h1>Wordle</h1>
      <h2>Get 6 chances to guess a 5-letter word.</h2>
      <Link href={"/create"} className={buttonVariants({ variant: "outline" })}>
        워들 생성하기
      </Link>
      <Link href={"/play"} className={buttonVariants({ variant: "default" })}>
        시작하기
      </Link>
    </main>
  );
}
