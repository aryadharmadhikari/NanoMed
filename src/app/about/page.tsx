export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white py-20 px-6">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h1>

                {/* We will replace this text once you talk to the founder! */}
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed text-left">
                    <p>
                        NANOMED is a specialized brand under **Maruti Enterprises**,
                        dedicated to providing high-quality mobility assistance
                        to those who need it most.
                    </p>
                    <p>
                        We believe that age or injury shouldn't limit a person's
                        independence. Our mission is to provide engineered stability
                        through our premium range of walking sticks, walkers, and chairs.
                    </p>
                    <p className="bg-blue-50 p-4 border-l-4 border-blue-600 italic">
                        "Coming soon: The full history of Maruti Enterprises and our
                        commitment to healthcare in India."
                    </p>
                </div>
            </div>
        </main>
    );
}