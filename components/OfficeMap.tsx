"use client";

import dynamic from "next/dynamic";

const LocationMap = dynamic(() => import("./LocationMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] items-center justify-center bg-stone text-sm uppercase tracking-[0.2em] text-mist">
      Loading map…
    </div>
  ),
});

/**
 * Map of the Winterbrook office — Ashgrove Works, Kill Avenue, Dun Laoghaire
 * (A96 V8C2). Coordinates taken from the client-supplied Google Maps place
 * pin for "Winterbrook Ltd.".
 */
export default function OfficeMap() {
  return (
    <LocationMap
      lat={53.2827339}
      lng={-6.1517859}
      label="Winterbrook — Ashgrove Works, Kill Avenue"
      className="h-[300px] w-full overflow-hidden border border-ink/10"
    />
  );
}
