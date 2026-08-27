"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import Link, { type LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";

/**
 * Brand-coloured curtain wipe between routes. TransitionLink plays the
 * curtain down, then navigates; when the new pathname lands the curtain
 * lifts. Regular <Link>/anchor navigation still works everywhere (the
 * curtain is a pure enhancement) and reduced-motion users navigate plainly.
 */

const TransitionContext = createContext<{ navigate: (href: string) => void }>({
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "covering" | "revealing">("idle");
  const pendingHref = useRef<string | null>(null);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }
      pendingHref.current = href;
      setPhase("covering");
      setTimeout(() => router.push(href), 480);
    },
    [pathname, router]
  );

  // New route arrived → lift the curtain
  useEffect(() => {
    if (phase === "covering" && pendingHref.current) {
      pendingHref.current = null;
      window.scrollTo(0, 0);
      setPhase("revealing");
      const t = setTimeout(() => setPhase("idle"), 700);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[9990] flex flex-col ${
          phase === "idle" ? "invisible" : "visible"
        }`}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-full flex-1 bg-ink transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] ${
              phase === "covering"
                ? "translate-y-0 duration-500"
                : phase === "revealing"
                  ? "-translate-y-[102%] duration-600"
                  : "translate-y-[102%] duration-0"
            }`}
            style={{ transitionDelay: `${i * 70}ms`, transform: phase === "idle" ? "translateY(102%)" : undefined }}
          />
        ))}
      </div>
    </TransitionContext.Provider>
  );
}

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  "aria-current"?: "page" | undefined;
  "data-cursor"?: string;
  onNavigate?: () => void;
}

export function TransitionLink({ children, onNavigate, ...props }: TransitionLinkProps) {
  const { navigate } = usePageTransition();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // let modified clicks (new tab etc.) behave natively
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onNavigate?.();
    navigate(props.href.toString());
  };

  return (
    <Link {...props} onClick={onClick}>
      {children}
    </Link>
  );
}
