import React from "react";

interface ProductSpecsProps {
    specs?: Record<string, string>;
    features?: string[];
}

export default function ProductSpecs({ specs, features }: ProductSpecsProps) {
    if (!specs && !features) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 border-t border-gray-100 pt-16">
            {/* 1. Key Features (Bullet Points) */}
            {features && features.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-8 h-1 bg-brand-teal rounded-full"></span>
                        Key Features
                    </h2>
                    <ul className="space-y-4">
                        {features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700 font-body">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0"></span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 2. Technical Specifications (Table) */}
            {specs && Object.keys(specs).length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-8 h-1 bg-brand-teal rounded-full"></span>
                        Technical Details
                    </h2>
                    <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                        <table className="w-full text-left text-sm">
                            <tbody className="divide-y divide-gray-200">
                                {Object.entries(specs).map(([key, value]) => (
                                    <tr key={key}>
                                        <th className="px-6 py-4 font-bold text-gray-900 bg-gray-100/50 w-1/3 font-body">
                                            {key}
                                        </th>
                                        <td className="px-6 py-4 text-gray-600 font-body">
                                            {value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
