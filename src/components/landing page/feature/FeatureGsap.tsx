'use client';

import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

const FeatureGsap = () => {
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from("#feature-items-top-left", {
            x: -50,
            opacity: 0,
            ease: "back.in",
            scrollTrigger: {
                trigger: "#featured-products",
                start: "top 30%",
                end: "bottom 70%",
            }
        });
        gsap.from("#feature-items-top-right", {
            x: 50,
            opacity: 0,
            ease: "back.in",
            scrollTrigger: {
                trigger: "#featured-products",
                start: "top 30%",
                end: "bottom 70%",
            }
        });
        gsap.from("#feature-items-bottom-left", {
            x: -50,
            opacity: 0,
            ease: "back.in",
            scrollTrigger: {
                trigger: "#featured-products",
                start: "top 30%",
                end: "bottom 70%",
            }
        });
        gsap.from("#feature-items-bottom-right", {
            x: 50,
            opacity: 0,
            ease: "back.in",
            scrollTrigger: {
                trigger: "#featured-products",
                start: "top 30%",
                end: "bottom 70%",
            }
        });
        gsap.from("#feature-items-middle", {
            opacity: 0,
            ease: "back.in",
            delay: .7,
            scrollTrigger: {
                trigger: "#featured-products",
                start: "top 30%",
                end: "bottom 70%",
            }
        });
    }, []);

    return (
        <></>
    )
}

export default FeatureGsap;