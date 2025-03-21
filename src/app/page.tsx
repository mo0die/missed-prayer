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
        <YearsForm />
      </div>
    </HydrateClient>
  );
}
