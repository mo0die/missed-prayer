"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { api } from "@/trpc/react";
import { PrayerResults } from "@/components/PrayerResults";

interface PrayerResult {
  fajr: {
    missedRakats: number;
    missedPrayers: number;
  };
  duhar: {
    missedRakats: number;
    missedPrayers: number;
  };
  asr: {
    missedRakats: number;
    missedPrayers: number;
  };
  maghrib: {
    missedRakats: number;
    missedPrayers: number;
  };
  isha: {
    missedRakats: number;
    missedPrayers: number;
  };
  ramadan: {
    missedFasts: number;
  };
  total: {
    totalRakats: number;
    totalPrayers: number;
  };
}

const data: PrayerResult = {
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
const formSchema = z.object({
  age: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 120,
      {
        message: "Please enter a valid age between 1 and 120",
      },
    ),
  isRevert: z.boolean().default(false),
});

export function YearsForm() {
  const utils = api.useUtils();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "",
      isRevert: false,
    },
  });

  const { data, mutate: getPrayers } = api.post.getMissedPrayers.useMutation({
    onSuccess: () => {
      form.reset();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    getPrayers({
      age: values.age,
    });
  }

  return (
    <div className="space-y-8">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Enter Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How old are you?</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your age"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {data && <PrayerResults data={data} isLoading={false} />}
      {!data && <PrayerResults isLoading={true} />}
    </div>
  );
}
