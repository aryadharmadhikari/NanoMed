import Image from "next/image";
import { Author } from "../data/blogs";

interface AuthorBadgeProps {
    author: Author;
    showRole?: boolean;
    size?: "sm" | "md" | "lg";
}

export default function AuthorBadge({ author, showRole = true, size = "md" }: AuthorBadgeProps) {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-14 h-14"
    };

    const textClasses = {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base"
    };

    return (
        <div className="flex items-center gap-3">
            <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border border-gray-100`}>
                <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div>
                <p className={`${textClasses[size]} font-bold text-gray-900 leading-tight`}>
                    {author.name}
                </p>
                {showRole && (
                    <p className="text-xs text-gray-500 mt-0.5">
                        {author.role}
                    </p>
                )}
            </div>
        </div>
    );
}
