import React from "react";
import { Review } from "../data/reviews";

export default function ReviewCard({ review }: { review: Review }) {
    // Logic: Create an array of 5 for the stars
    const stars = Array.from({ length: 5 }, (_, i) => i + 1);

    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
            {/* 1. Header: Stars & Verified Badge */}
            <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1">
                    {stars.map((star) => (
                        <svg
                            key={star}
                            className={`w-5 h-5 ${star <= review.rating ? "text-yellow-400" : "text-gray-200"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
                {review.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-wider">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                        Verified
                    </span>
                )}
            </div>

            {/* 2. The Review Content */}
            <p className="text-gray-700 leading-relaxed mb-8 flex-1 italic font-body">
                "{review.comment}"
            </p>

            {/* 3. Footer: User Info */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                <div className="w-12 h-12 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal font-bold text-lg">
                    {review.name.charAt(0)}
                </div>
                <div>
                    <h4 className="font-bold text-gray-900 leading-tight">{review.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{review.location}</p>
                </div>
            </div>
        </div>
    );
}
