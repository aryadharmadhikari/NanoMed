export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* 1. Introduction Section */}
            <section className="py-16 md:py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-brand-teal mb-8">About NanoMed</h1>
                    <div className="space-y-6 text-lg text-gray-600 font-body leading-relaxed text-left md:text-center">
                        <p>
                            NanoMed was founded with a clear philosophy: <span className="font-bold text-gray-900">recovery deserves care, comfort, and confidence.</span>
                        </p>
                        <p>
                            We understand that healing is not just a medical process, it is deeply personal. Senior citizens, post-surgery patients, and individuals on the path to recovery need products they can trust, products that support mobility, comfort, and everyday independence.
                        </p>
                        <p>
                            At NanoMed, we curate and deliver high-quality medical solutions designed to elevate the recovery experience. Every product is selected with attention to detail, reliability, and patient well-being, ensuring that care continues beyond clinical settings and into everyday life.
                        </p>
                        <p>
                            As we grow across digital and physical platforms, our commitment remains unchanged: to provide dependable healthcare solutions that bring reassurance to patients, caregivers, and healthcare professionals alike. Each delivery reflects our promise of quality, precision, and care.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. Mission & Vision Grid */}
            <section className="bg-gray-50 py-16 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Mission Card */}
                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-md transition-shadow">
                        <div className="bg-brand-teal/10 p-4 rounded-2xl mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-gray-600 font-body text-lg leading-relaxed">
                            To deliver thoughtfully designed medical products that enhance comfort, support recovery, and uphold the highest standards of care.
                        </p>
                    </div>

                    {/* Vision Card */}
                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start hover:shadow-md transition-shadow">
                        <div className="bg-brand-red/10 p-4 rounded-2xl mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">Our Vision</h2>
                        <p className="text-gray-600 font-body text-lg leading-relaxed">
                            To be a trusted name in healthcare solutions, recognized for elevating recovery experiences and improving quality of life through refined, dependable medical products.
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. Closing Philosophy */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="inline-block bg-brand-teal w-16 h-1 mb-8 rounded-full"></div>
                    <p className="text-xl md:text-2xl text-gray-800 font-body font-medium leading-relaxed italic">
                        "NanoMed exists to support better recovery journeys—quietly, reliably, and with purpose."
                    </p>
                    <p className="mt-8 text-gray-500 font-body">
                        — The NanoMed Team
                    </p>
                </div>
            </section>
        </main>
    );
}