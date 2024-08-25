import { Header } from "@/components/Header";
import Image from "next/image";
import { z } from "zod";

const schema = z.object({
  data: z.array(z.string())
})

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-background">
      <Header />
    </main>
  );
}
