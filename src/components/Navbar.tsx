import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="max-w-5xl m-auto px-3 py-5 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} width={60} height={60} alt="company logo" />
          <span className="text-xl font-bold tracking-tight">Flow Jobs</span>
        </Link>
        <Button asChild>
          <Link href="/jobs/new">Post a Job.</Link>
        </Button>
      </nav>
    </header>
  );
}
