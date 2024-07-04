import Image from "next/image";
import {
  QuestionMarkCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full px-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <Image
            alt="wordle image"
            src={"/wordle.png"}
            width={24}
            height={24}
          />
        </Link>

        <h1 className="text-2xl font-bold">Wordle</h1>
        <div className="flex flex-row space-x-2">
          <QuestionMarkCircleIcon className="size-5" />
          <ChartBarIcon className="size-5" />
        </div>
      </div>
    </header>
  );
};

export default Header;
