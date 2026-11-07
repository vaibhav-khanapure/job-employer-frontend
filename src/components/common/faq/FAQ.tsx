"use client";

import { useState } from "react";
import { GoPlus } from "react-icons/go";

interface Props {
    tag: string;
    title?: string;
    subtitle?: string;
    faqs: {
        question: string;
        answer: string;
    }[];
};

const FAQ = ({ faqs = [], tag, subtitle, title }: Props) => {
    const [active, setActive] = useState<number[]>([]);

    return (
        <div className="flex flex-col py-4">

            {(title || subtitle) && (
                <div className="text-center mb-10">
                    {title && (
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-3">
                            {title}
                        </h2>
                    )}

                    {subtitle && (
                        <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-text-tertiary">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            {faqs?.map((faq, index) => (
                <div
                    key={`${tag}-faq-${index}`}
                    className={index !== faqs?.length - 1 ? "border-b border-border-primary" : ""}
                    onClick={() => setActive(prev => {
                        if (prev.includes(index)) return prev.filter(idx => idx !== index)
                        return [...prev, index];
                    })}
                >
                    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-bg-secondary">
                        <h5 className="text-[15px] sm:text-base font-medium tracking-tight text-text-primary leading-6">
                            {faq?.question}
                        </h5>
                        <GoPlus
                            className="transition duration-300 text-text-tertiary"
                            size={20}
                            style={{ transform: `rotate(${active?.includes(index) ? "45" : "0"}deg)` }}
                        />
                    </div>

                    <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${active.includes(index)
                            ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`
                        }
                    >
                        <div className="overflow-hidden">
                            <p className="px-4 pb-5 pt-2 text-[14px] sm:text-[15px] leading-7 font-normal text-text-secondary">
                                {faq?.answer}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQ;