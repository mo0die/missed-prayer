"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface PrayerResultsProps {
  data?: PrayerResult;
  isLoading?: boolean;
}

export function PrayerResults({ data, isLoading = false }: PrayerResultsProps) {
  if (isLoading) {
    return (
      <div className="mx-auto grid max-w-md grid-cols-1 gap-4">
        {/* Daily Prayers Skeleton */}
        <Card>
          <CardHeader>
            <div className="bg-muted h-6 w-32 animate-pulse rounded" />
          </CardHeader>
          <CardContent className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col rounded-lg border p-2">
                <div className="bg-muted mb-2 h-4 w-20 animate-pulse rounded" />
                <div className="space-y-1">
                  <div className="bg-muted h-4 w-24 animate-pulse rounded" />
                  <div className="bg-muted h-4 w-20 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Ramadan Skeleton */}
        <Card>
          <CardHeader>
            <div className="bg-muted h-6 w-24 animate-pulse rounded" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="bg-muted h-4 w-24 animate-pulse rounded" />
              <div className="bg-muted h-8 w-16 animate-pulse rounded" />
            </div>
          </CardContent>
        </Card>

        {/* Total Skeleton */}
        <Card>
          <CardHeader>
            <div className="bg-muted h-6 w-16 animate-pulse rounded" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="bg-muted h-4 w-32 animate-pulse rounded" />
              <div className="bg-muted h-8 w-16 animate-pulse rounded" />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="bg-muted h-4 w-28 animate-pulse rounded" />
              <div className="bg-muted h-8 w-16 animate-pulse rounded" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mx-auto grid max-w-md grid-cols-1 gap-4">
      {/* Daily Prayers */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Prayers</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(data)
            .filter(([key]) => key !== "ramadan" && key !== "total")
            .map(
              ([prayer, stats]: [
                string,
                { missedRakats: number; missedPrayers: number },
              ]) => (
                <div
                  key={prayer}
                  className="flex flex-col rounded-lg border p-2"
                >
                  <span className="mb-2 capitalize">{prayer}</span>
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-sm">
                      {stats.missedPrayers} prayers
                    </div>
                    <div className="text-muted-foreground text-sm">
                      {stats.missedRakats} rakats
                    </div>
                  </div>
                </div>
              ),
            )}
        </CardContent>
      </Card>

      {/* Ramadan */}
      <Card>
        <CardHeader>
          <CardTitle>Ramadan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <span>Missed Fasts</span>
            <span className="text-2xl font-bold">
              {data.ramadan.missedFasts}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Total */}
      <Card>
        <CardHeader>
          <CardTitle>Total</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <span>Total Missed Prayers</span>
            <span className="text-2xl font-bold">
              {data.total.totalPrayers}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <span>Total Missed Rakats</span>
            <span className="text-2xl font-bold">{data.total.totalRakats}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
