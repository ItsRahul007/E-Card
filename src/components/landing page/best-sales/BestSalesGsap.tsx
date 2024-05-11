'use client';

import React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

const BestSalesGsap = ({ id }: { id: string }) => {
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from('#best-sales-item' + id, {
            opacity: 0,
            y: -20,
            ease: "power1.in",
            duration: .6,
            scrollTrigger: {
                trigger: "#best-sales-item" + id,
                start: "top 80%",
                end: "bottom 70%",
            }
        });
    }, []);

    return (
        <></>
    );
};

export default BestSalesGsap;