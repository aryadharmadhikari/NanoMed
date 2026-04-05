"use client";
import React from "react";
import ContactForm from "../../components/ContactForm";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* 1. Header Section */}
            <section className="bg-white py-16 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4 text-brand-teal">Get in Touch</h1>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium font-body">
                    Have questions about our medical equipment? Our team at Maruti Enterprises
                    is ready to assist you with expert advice and support.
                </p>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* 2. Left Side: Contact Form */}
                <div className="bg-gray-50 p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Send us a Message</h2>
                    <ContactForm />

                </div>

                {/* 3. Right Side: Contact Info & Map */}
                <div className="flex flex-col space-y-8">
                    <div>
                        <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Contact Information</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-brand-teal/10 p-3 rounded-lg text-brand-teal">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-heading font-bold text-gray-900">Our Office</h4>
                                    <p className="text-gray-600 font-body">Maruti Enterprises, Mumbai, Maharashtra, India</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-brand-red/10 p-3 rounded-lg text-brand-red">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-heading font-bold text-gray-900">Email</h4>
                                    <p className="text-gray-600 font-body">nanomedsales@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-brand-teal/10 p-3 rounded-lg text-brand-teal">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-lg font-heading font-bold text-gray-900">Call / WhatsApp</h4>
                                    <p className="text-gray-600 font-body">+91 7738281416</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google Maps Embed */}
                    <div className="w-full h-64 rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.932159902717!2d73.01601811710903!3d19.24178814947143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bd3040145aeb%3A0xa8360e57e769cf52!2sNanoMed!5e0!3m2!1sen!2sin!4v1776153476589!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>
        </main>
    );
}