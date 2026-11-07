import FAQ from '@/src/components/common/faq/FAQ';
import faqs from '../data/faqs';

const FAQs = () => {
    return (
        <section className='bg-bg-primary p-8'>
            <div className='max-w-4xl mx-auto space-y-8'>

                <FAQ
                    title="Frequently Asked Questions"
                    subtitle="Find answers to common questions about managing your company profile, posting jobs, and hiring the right talent with Jobble."
                    tag="home-faq"
                    faqs={faqs}
                />
            </div>
        </section>
    );
};

export default FAQs;