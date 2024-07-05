import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full p-4">
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
        <div />
      </div>
    </header>
  );
};

export default Header;
