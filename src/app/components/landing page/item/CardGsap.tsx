"use client";

import gsap from 'gsap';
import React, { useEffect, useMemo } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const CardGsap: React.FC = () => {
    //* Creating a timeline with scroll trigers
    const cardTL = useMemo(() => gsap.timeline({
        scrollTrigger: {
            trigger: ["#first_big_card", "#third_big_card", "#second_big_card"],
            start: 'top 70%',
            end: 'bottom center',
            // onEnter: () => { console.log("started")} //! you can call the photo dropping function here
        }
    }), []);

    useEffect(() => {
        gsap.fromTo("#card_head", {
            y: -50,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: "#card_head",
                scroller: "body",
                start: "top 80%"
            },
        });

        cardTL.fromTo("#first_big_card", {
            x: -100,
            opacity: 0,
        }, {
            x: 0,
            opacity: 1
        });
        cardTL.fromTo("#third_big_card", {
            x: 100,
            opacity: 0,
        }, {
            x: 0,
            opacity: 1,
        });
        cardTL.fromTo("#second_big_card", { opacity: 0 }, { opacity: 1 });

        return () => {
            cardTL.clear();
        }
    }, [cardTL]);
    return (
        <></>
    )
}

export default CardGsap;