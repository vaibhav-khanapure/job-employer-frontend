import services from "../data/services"

const Services = () => {
    return (
        <section className='py-12 bg-bg-primary'>

            <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-3">
                    Our Services
                </h2>

                <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-text-tertiary">
                    Everything your business needs to attract talent, manage recruitment,
                    and build a stronger workforce.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
                {services?.map((service, index) => (
                    <div
                        key={`home-serice-${index}`}
                        className="w-80 shrink-0 rounded-xl space-y-4 border border-border-primary bg-bg-primary p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                        <h3 className="font-bold text-lg">{service?.title}</h3>

                        <div className="size-10 grid place-items-center rounded-md text-text-secondary border border-border-primary">
                            <service.icon />
                        </div>

                        <p className="text-[15px] leading-7 text-text-secondary">{service?.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Services