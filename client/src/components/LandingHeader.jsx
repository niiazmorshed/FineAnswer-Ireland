import React, { useEffect, useRef, useState } from "react";

import Navbar3 from "./navbar3";
import TopUtilityBar from "./TopUtilityBar";

const getPageScrollY = () => {
  const scrollingElement = document.scrollingElement || document.documentElement;
  return Math.max(
    0,
    window.scrollY ||
      scrollingElement?.scrollTop ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
  );
};

const getEventScrollY = (event) => {
  const target = event?.target;
  if (
    target &&
    target !== window &&
    target !== document &&
    target !== document.documentElement &&
    target !== document.body &&
    typeof target.scrollTop === "number"
  ) {
    return target.scrollTop;
  }

  return getPageScrollY();
};

export default function LandingHeader() {
  const [headerHidden, setHeaderHidden] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const lastHeaderY = useRef(0);
  const headerFrame = useRef(null);
  const headerHiddenRef = useRef(false);
  const headerScrolledRef = useRef(false);
  const headerScrollIntent = useRef({ direction: 0, distance: 0 });

  useEffect(() => {
    const revealAtTop = 80;
    const noiseThreshold = 2;
    const hideDistance = 22;
    const showDistance = 8;

    const setHeaderScrolledStable = (next) => {
      if (headerScrolledRef.current === next) return;
      headerScrolledRef.current = next;
      setHeaderScrolled(next);
    };

    const setHeaderHiddenStable = (next) => {
      if (headerHiddenRef.current === next) return;
      headerHiddenRef.current = next;
      setHeaderHidden(next);
    };

    const resetIntent = () => {
      headerScrollIntent.current = { direction: 0, distance: 0 };
    };

    const applyScrollPosition = (y) => {
      const delta = y - lastHeaderY.current;
      lastHeaderY.current = y;

      setHeaderScrolledStable(y > 10);

      if (y <= revealAtTop) {
        resetIntent();
        setHeaderHiddenStable(false);
        return;
      }

      if (Math.abs(delta) < noiseThreshold) return;

      const direction = delta > 0 ? 1 : -1;
      const intent = headerScrollIntent.current;
      if (intent.direction !== direction) {
        intent.direction = direction;
        intent.distance = 0;
      }

      intent.distance += Math.abs(delta);

      if (direction > 0 && !headerHiddenRef.current && intent.distance >= hideDistance) {
        setHeaderHiddenStable(true);
        resetIntent();
      } else if (direction < 0 && headerHiddenRef.current && intent.distance >= showDistance) {
        setHeaderHiddenStable(false);
        resetIntent();
      }
    };

    const scheduleFromScroll = (event) => {
      if (headerFrame.current !== null) return;
      headerFrame.current = window.requestAnimationFrame(() => {
        headerFrame.current = null;
        const y = getEventScrollY(event);
        applyScrollPosition(y);
      });
    };

    lastHeaderY.current = getPageScrollY();
    headerScrolledRef.current = lastHeaderY.current > 10;
    headerHiddenRef.current = false;
    setHeaderScrolled(headerScrolledRef.current);
    setHeaderHiddenStable(false);
    resetIntent();

    window.addEventListener("scroll", scheduleFromScroll, { passive: true });
    document.addEventListener("scroll", scheduleFromScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener("scroll", scheduleFromScroll);
      document.removeEventListener("scroll", scheduleFromScroll, { capture: true });
      if (headerFrame.current !== null) {
        window.cancelAnimationFrame(headerFrame.current);
        headerFrame.current = null;
      }
    };
  }, []);

  return (
    <>
      <div className={`landing-top${headerScrolled ? " is-scrolled" : ""}${headerHidden ? " is-hidden" : ""}`}>
        <TopUtilityBar />
        <Navbar3
          autoHide={false}
          withSpacer={false}
          controlledScrolled={headerScrolled}
          controlledHidden={false}
        />
      </div>
      <div className="landing-top-spacer" aria-hidden="true" />
    </>
  );
}
