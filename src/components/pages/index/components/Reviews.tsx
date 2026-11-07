"use client";

import reviews from '../data/reviews';

const Reviews = () => {
    return (
        <section className='py-12 bg-bg-primary'>

            <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-3">
                    Trusted by Employers
                </h2>

                <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-text-tertiary">
                    See how businesses are simplifying their hiring process and building stronger teams with Jobble.
                </p>
            </div>

            <div className="container overflow-hidden">
                <div className={`reviews-track flex w-max hover:[animation-play-state:paused]`}>

                    {[0, 1].map((group) => (
                        <div
                            key={group}
                            className="flex shrink-0 gap-6 pr-6"
                            aria-hidden={group === 1}
                        >
                            {reviews.map((review, index) => (
                                <div
                                    key={`home-reviews-${group}-${index}`}
                                    className="w-80 shrink-0 rounded-xl border border-border-primary bg-bg-primary p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className='mb-5 pb-5 space-y-2 border-b border-border-primary'>
                                        <h4 className='text-lg font-bold tracking-tight text-text-primary'>
                                            {review?.name}
                                        </h4>

                                        <p className='text-sm text-text-tertiary'>
                                            {review?.position}
                                        </p>

                                        <b className='text-sm font-medium text-text-secondary'>
                                            {review?.company}
                                        </b>
                                    </div>

                                    <p className='text-[15px] leading-7 text-text-secondary'>
                                        "{review?.review}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}

                </div>
            </div>

            <style jsx>{`
                .reviews-track {
                    animation: reviews-scroll 35s linear infinite;
                }

                .reviews-track:hover, .reviews-track:has(.review-card:hover) {
                    animation-play-state: paused;
                }

                @keyframes reviews-scroll {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .reviews-track {
                        animation: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default Reviews;