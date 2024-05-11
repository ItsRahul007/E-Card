'use client';

import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

const NewReleaseGsap = () => {
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from('#new-release-items', {
            opacity: 0,
            y: -30,
            ease: "power1.in",
            scrollTrigger: {
                trigger: "#new-release",
                start: "top 30%",
                end: "bottom 70%",
            }
        });
    }, []);
    return (
        <></>
    )
}

export default NewReleaseGsap;
