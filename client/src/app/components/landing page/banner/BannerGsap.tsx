"use client"

import gsap from 'gsap';
import React, { useEffect } from 'react'

const BannerGsap = () => {
    useEffect(() => {
        gsap.fromTo("#logo", { y: -50 }, { opacity: 1, y: 0, duration: 0.6 });

        gsap.fromTo("#banner-nav", { y: -100 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.5 });

        gsap.fromTo("#h-text-1", { x: -50 }, { opacity: 1, x: 0, duration: 0.6, delay: 1 });

        gsap.fromTo("#h-text-2", { x: 50 }, { opacity: 1, x: 0, duration: 0.6, delay: 1.5 });

        gsap.to("#banner-btn", { opacity: 1, duration: 0.8, delay: 2 });

    }, []);
    return (
        <></>
    )
}

export default BannerGsap;