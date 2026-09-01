"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import { developments } from "@/lib/content";

/**
 * Interactive Leaflet map of the Dublin/Wicklow region with a pin per
 * current development. Hover state syncs both ways with the listing cards
 * via activeSlug / onPinHover. Keyboard focusable pins; full-colour OSM
 * basemap per client preference. (CARTO's keyless tiles began watermarking
 * "API KEY REQUIRED", Aug 2026 — keep basemaps keyless.)
 */
export default function DevelopmentsMap({
  activeSlug,
  onPinHover,
  className,
}: {
  activeSlug: string | null;
  onPinHover: (slug: string | null) => void;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        attributionControl: true,
      });
      mapRef.current = map;
      map.attributionControl.setPrefix(false);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const bounds = L.latLngBounds(developments.map((d) => [d.lat, d.lng]));
      map.fitBounds(bounds, { padding: [56, 56] });

      for (const dev of developments) {
        const icon = L.divIcon({
          className: "wb-pin",
          html: '<div class="pin-dot"></div>',
          iconSize: [26, 26],
          iconAnchor: [13, 24],
        });
        const marker = L.marker([dev.lat, dev.lng], {
          icon,
          keyboard: true,
          title: `${dev.name}, ${dev.location}`,
          alt: `${dev.name}, ${dev.location}`,
        }).addTo(map);
        marker.bindTooltip(
          `<strong>${dev.name}</strong><br>${dev.location}`,
          { direction: "top", offset: [0, -20] }
        );
        marker.on("mouseover", () => onPinHover(dev.slug));
        marker.on("mouseout", () => onPinHover(null));
        marker.on("click", () => {
          window.location.href = `/homes/${dev.slug}`;
        });
        markersRef.current[dev.slug] = marker;
      }
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reflect card hover onto pins
  useEffect(() => {
    for (const [slug, marker] of Object.entries(markersRef.current)) {
      const el = marker.getElement();
      if (!el) continue;
      el.classList.toggle("is-active", slug === activeSlug);
      if (slug === activeSlug) marker.openTooltip();
      else marker.closeTooltip();
    }
  }, [activeSlug]);

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="h-full min-h-[420px] w-full"
        role="region"
        aria-label="Map of current Winterbrook developments across Dublin and Wicklow"
      />
    </div>
  );
}
