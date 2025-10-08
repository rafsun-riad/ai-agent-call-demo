"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function PageLoadingBar() {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);
  const timer = useRef<number | null>(null);
  const timeoutTimer = useRef<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);

  const finish = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    if (timeoutTimer.current) {
      clearTimeout(timeoutTimer.current);
      timeoutTimer.current = null;
    }
    setWidth(100);
    window.setTimeout(() => {
      setVisible(false);
      setWidth(0);
    }, 240);
  }, []);

  const start = useCallback(() => {
    if (timer.current) return;
    setVisible(true);
    setWidth(6);
    timer.current = window.setInterval(() => {
      setWidth((w) => Math.min(90, w + Math.random() * 8));
    }, 200);

    // Auto-finish if no route change occurs within 2 seconds
    // This handles same-page navigation scenarios
    timeoutTimer.current = window.setTimeout(() => {
      finish();
    }, 2000);
  }, [finish]);

  useEffect(() => {
    const isInternal = (a: HTMLAnchorElement | null) => {
      if (!a) return false;
      const href = a.getAttribute("href");
      if (!href) return false;
      if (
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return false;
      if (a.target && a.target !== "_self") return false;
      if (a.hasAttribute("data-no-loading")) return false;
      return true;
    };

    const isSamePage = (a: HTMLAnchorElement | null) => {
      if (!a) return false;
      const href = a.getAttribute("href");
      if (!href) return false;

      // Check if the href matches the current pathname
      // Handle both absolute and relative paths
      const targetPath = href.startsWith("/") ? href : "/" + href;
      const currentPath = pathname;

      return (
        targetPath === currentPath ||
        targetPath === currentPath + "/" ||
        targetPath + "/" === currentPath
      );
    };

    const clickHandler = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest(
        "a"
      ) as HTMLAnchorElement | null;

      if (isInternal(a)) {
        // Only start loading bar if we're not navigating to the same page
        if (!isSamePage(a)) {
          start();
        }
      }
    };

    const keyHandler = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      const a = (document.activeElement as HTMLElement)?.closest(
        "a"
      ) as HTMLAnchorElement | null;

      if (isInternal(a)) {
        // Only start loading bar if we're not navigating to the same page
        if (!isSamePage(a)) {
          start();
        }
      }
    };

    const popHandler = () => start();

    document.addEventListener("click", clickHandler, true);
    document.addEventListener("keydown", keyHandler, true);
    window.addEventListener("popstate", popHandler);

    return () => {
      document.removeEventListener("click", clickHandler, true);
      document.removeEventListener("keydown", keyHandler, true);
      window.removeEventListener("popstate", popHandler);
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
      if (timeoutTimer.current) {
        clearTimeout(timeoutTimer.current);
        timeoutTimer.current = null;
      }
    };
  }, [pathname, start]);

  useEffect(() => {
    if (prevPath.current === null) {
      prevPath.current = pathname;
      return;
    }
    if (prevPath.current !== pathname) {
      if (!visible) {
        setVisible(true);
        setWidth(40);
      }
      finish();
      prevPath.current = pathname;
    }
  }, [pathname, visible, finish]);

  if (!visible) return null;

  return (
    <div
      className="fixed left-0 right-0 top-0 h-0.5 z-[9999] pointer-events-none"
      aria-hidden
    >
      <div
        className="h-full bg-gradient-to-r from-cyan-400/95 via-sky-500/95 to-indigo-600/95 shadow-lg transition-[width] duration-200 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
