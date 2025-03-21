import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import { YearsForm } from "@/components/YearsForm";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-col items-center justify-center">
        <p className="sm:text-md text-center text-2xl font-bold">
          This tool assumes you have not prayed, and should be used as a guide.
          please do not use this as a tool to judge yourself or others. the tool
          takes the birth date and subtracts 7 years from the current date. then
          it calculates the missed prayers,fasts based on the number of days
        </p>
        <YearsForm />
      </div>
    </HydrateClient>
  );
}
