"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";

/** Single-location Leaflet map used on development detail pages. */
export default function LocationMap({
  lat,
  lng,
  label,
  className,
}: {
  lat: number;
  lng: number;
  label: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;
      const map = L.map(containerRef.current, {
        center: [lat, lng],
        zoom: 14,
        scrollWheelZoom: false,
      });
      mapRef.current = map;
      map.attributionControl.setPrefix(false);
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: "© OpenStreetMap contributors © CARTO",
        subdomains: "abcd",
        maxZoom: 19,
      }).addTo(map);
      const icon = L.divIcon({
        className: "wb-pin is-active",
        html: '<div class="pin-dot"></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 27],
      });
      L.marker([lat, lng], { icon, title: label, alt: label })
        .addTo(map)
        .bindTooltip(label, { direction: "top", offset: [0, -22], permanent: true });
    })();
    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [lat, lng, label]);

  return (
    <div
      ref={containerRef}
      className={className}
      role="region"
      aria-label={`Map showing the location of ${label}`}
    />
  );
}
