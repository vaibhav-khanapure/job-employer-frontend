"use client";

const Customers = () => {
    return (
        <section className='py-12 px-4 bg-bg-primary'>

            <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-3">
                    Companies That Trust Jobble
                </h2>

                <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-text-tertiary">
                    Discover the companies shaping the future of work and creating exciting career opportunities.
                </p>
            </div>


            <div className="flex justify-center items-center flex-wrap gap-0 sm:gap-2 md:gap-6">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div
                        key={index}
                        className="customer-sprite"
                        style={{
                            backgroundPosition: `${index * (100 / 9)}% 50%`,
                            clipPath: index === 9 ? "inset(0 8px 0 0)" : "none"
                        }}
                    />
                ))}
            </div>

            <style jsx>
                {`
                    .customer-sprite {
                            width: 80px;
                            height: 80px;
                            flex-shrink: 0;
                            background-image: url("/images/pages/index/customers.webp");
                            background-size: 1000% 100%;
                            background-repeat: no-repeat;
                    }
                `}
            </style>

        </section>
    );
};

export default Customers;