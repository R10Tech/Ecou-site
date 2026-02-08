"use client";

import { useEffect, useRef } from "react";
import { trackSectionTime } from "@/lib/tracking";

export default function TrackSection({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startRef.current = Date.now();
        } else if (startRef.current) {
          const seconds = (Date.now() - startRef.current) / 1000;
          trackSectionTime(name, seconds);
          startRef.current = null;
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      // flush time on unmount
      if (startRef.current) {
        const seconds = (Date.now() - startRef.current) / 1000;
        trackSectionTime(name, seconds);
      }
      observer.disconnect();
    };
  }, [name]);

  return <div ref={ref}>{children}</div>;
}
