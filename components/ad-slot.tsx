"use client";

import { useEffect } from "react";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle";
  responsive?: boolean;
  className?: string;
}

export function AdSlot({
  slot,
  format = "auto",
  responsive = true,
  className = "",
}: AdSlotProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {},
        );
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className={`my-8 ${className}`}>
      <div className="rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-4 min-h-[250px] flex items-center justify-center">
        <div className="text-center">
          <div className="mb-2 text-sm font-medium text-primary">
            Advertisement
          </div>
          <div className="text-xs text-muted-foreground">Ad Slot: {slot}</div>
        </div>
        <ins
          className="adsbygoogle absolute inset-0"
          style={{ display: "block" }}
          data-ad-client={
            process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXX"
          }
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive.toString()}
        />
      </div>
    </div>
  );
}
