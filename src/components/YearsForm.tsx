"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

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
  date: z.date({
    required_error: "Please select a date",
  }),
  isRevert: z.boolean().default(false),
});

export function YearsForm() {
  const utils = api.useUtils();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isRevert: false,
    },
  });

  const getPrayers = api.post.getMissedPrayers.useMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    getPrayers.mutate({
      date: values.date.toISOString(),
      isRevert: values.isRevert,
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>When did you start praying?</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          fromYear={1900}
                          toYear={new Date().getFullYear()}
                          captionLayout="dropdown-buttons"
                          className="rounded-md border"
                          showOutsideDays={false}
                          fixedWeeks={true}
                          ISOWeek={true}
                          weekStartsOn={1}
                        />
                      </PopoverContent>
                    </Popover>
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

      {getPrayers.data && (
        <PrayerResults data={getPrayers.data} isLoading={false} />
      )}
      {!getPrayers.data && <PrayerResults isLoading={true} />}
    </div>
  );
}
