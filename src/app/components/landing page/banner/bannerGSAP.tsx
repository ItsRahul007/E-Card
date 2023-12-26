"use client";

import gsap from 'gsap';
import React, { useEffect, useMemo } from 'react'

const BannerGSAP = () => {
    const bannerTimeLine = useMemo(() => gsap.timeline(), []);

  useEffect(() => {
    bannerTimeLine.fromTo("#logo", { y: -50, opacity: 0 }, { y: 0, opacity: 1 });
    bannerTimeLine.fromTo("#banner-nav", { y: -100, opacity: 0 }, { y: 0, opacity: 1 });
    bannerTimeLine.fromTo("#h-text-1", { x: -50, opacity: 0 }, { x: 0, opacity: 1 });
    bannerTimeLine.fromTo("#h-text-2", { x: 50, opacity: 0 }, { x: 0, opacity: 1 });
    bannerTimeLine.fromTo("#banner-btn", { opacity: 0, duration: 0.8 }, { opacity: 1 });

    return () => {
      bannerTimeLine.clear();
    }
  }, [bannerTimeLine]);
  return (
    <></>
  )
}

export default BannerGSAP;