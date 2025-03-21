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
        <p className="text-muted-foreground mx-auto max-w-2xl text-balance text-center text-base">
          This tool helps estimate missed prayers, rak&apos;ahs, and fasts for
          those who may not have consistently observed them. It&apos;s a guide
          for self-reflection, not for judgment. The calculation starts from
          your birth date, accounting for the age of puberty (~12years), and
          estimates missed obligations based on the time since then.
        </p>
        <YearsForm />
        <p className="text-muted-foreground mx-auto max-w-2xl text-balance text-center text-base">
          Please note that this tool is not a substitute for the knowledge and
          understanding of Islamic rulings. It is designed to provide a general
          estimate and should not be used as a definitive guide. Please talk to
          your imam or a qualified scholar for more accurate information. This
          tool is not affiliated with any religious organization and is provided
          for informational purposes only.
        </p>
      </div>
    </HydrateClient>
  );
}
