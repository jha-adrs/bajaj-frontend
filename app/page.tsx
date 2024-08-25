
import { Header } from "@/components/Header";
import Image from "next/image";
import { z } from "zod";

export default function Home() {
  return (
    <main className=" flex min-h-screen flex-col items-center justify-center p-8 md:p-24 bg-background">
       <Header />

    </main>
  );
}
