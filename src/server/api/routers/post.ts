import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Mocked DB
interface Post {
  id: number;
  name: string;
}
const posts: Post[] = [
  {
    id: 1,
    name: "Hello World",
  },
];

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const post: Post = {
        id: posts.length + 1,
        name: input.name,
      };
      posts.push(post);
      return post;
    }),

  getLatest: publicProcedure.query(() => {
    return posts.at(-1) ?? null;
  }),
  getMissedPrayers: publicProcedure
    .input(
      z.object({
        age: z.string(),
      }),
    )
    .mutation(({ input }) => {
      const { age } = input;
      const ageNumber = parseInt(age);
      // get age and get gender, then calculate the missed prayers

      if (ageNumber < 7) {
        // return the missed prayers
        return {
          fajr: {
            missedRakats: 0,
            missedPrayers: 0,
          },
          duhar: {
            missedRakats: 0,
            missedPrayers: 0,
          },
          asr: {
            missedRakats: 0,
            missedPrayers: 0,
          },
          maghrib: {
            missedRakats: 0,
            missedPrayers: 0,
          },
          isha: {
            missedRakats: 0,
            missedPrayers: 0,
          },
          ramadan: {
            missedFasts: 0,
          },
          total: {
            totalRakats: 0,
            totalPrayers: 0,
          },
        };
      }
      if (ageNumber >= 7) {
        const calculateAge = ageNumber - 7;
        const calculateDays = calculateAge * 365;

        const missedFasts = calculateAge * 30;
        const missedFajirRakats = calculateDays * 2;
        const missedDuharRakats = calculateDays * 4;
        const missedAsrRakats = calculateDays * 4;
        const missedMaghribRakats = calculateDays * 3;
        const missedIshaRakats = calculateDays * 4;
        ///
        const calculateMissedPrayers = calculateDays * 5;
        const calcualteMissedRakats = calculateDays * 17;

        return {
          fajr: {
            missedRakats: missedFajirRakats,
            missedPrayers: calculateDays,
          },
          duhar: {
            missedRakats: missedDuharRakats,
            missedPrayers: calculateDays,
          },
          asr: {
            missedRakats: missedAsrRakats,
            missedPrayers: calculateDays,
          },
          maghrib: {
            missedRakats: missedMaghribRakats,
            missedPrayers: calculateDays,
          },
          isha: {
            missedRakats: missedIshaRakats,
            missedPrayers: calculateDays,
          },
          ramadan: {
            missedFasts,
          },
          total: {
            totalRakats: calcualteMissedRakats,
            totalPrayers: calculateMissedPrayers,
          },
        };
      }
    }),
});
