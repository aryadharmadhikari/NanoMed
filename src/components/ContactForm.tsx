"use client";

import { useActionState } from "react";
import { submitContactForm } from "../app/actions";

const initialState = {
    success: false,
    message: "",
};

export default function ContactForm() {
    const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

    return (
        <form action={formAction} className="space-y-6">
            {state.success && (
                <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-200 mb-4 animate-fade-in transition-all">
                    <p className="font-bold">Message Sent!</p>
                    <p className="text-sm">{state.message}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-lg font-heading font-bold text-gray-700 mb-2">Full Name</label>
                    <input
                        name="name"
                        type="text"
                        required
                        placeholder="Arya Dharmadhikari"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none transition font-body"
                    />
                </div>
                <div>
                    <label className="block text-lg font-heading font-bold text-gray-700 mb-2">Phone Number</label>
                    <input
                        name="phone"
                        type="tel"
                        required
                        placeholder="+91 98XXX XXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none transition font-body"
                    />
                </div>
            </div>
            <div>
                <label className="block text-lg font-heading font-bold text-gray-700 mb-2">Email Address</label>
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="arya@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none transition font-body"
                />
            </div>
            <div>
                <label className="block text-lg font-heading font-bold text-gray-700 mb-2">How can we help?</label>
                <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="I am interested in the Pivot Explorer Stick..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none transition font-body"
                ></textarea>
            </div>
            <button
                type="submit"
                disabled={isPending}
                className={`w-full text-xl text-white font-heading font-bold py-4 rounded-xl transition shadow-lg flex justify-center items-center ${isPending ? "bg-teal-300 cursor-not-allowed" : "bg-brand-teal hover:bg-teal-700 hover:shadow-teal-100"
                    }`}
            >
                {isPending ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                    </span>
                ) : (
                    "Submit Inquiry"
                )}
            </button>
        </form>
    );
}
