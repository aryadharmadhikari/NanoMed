import Image from "next/image";

export default function Home() {
  const brandName = "NANOMED"; // This is a JavaScript variable!

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome to {brandName}
      </h1>
      <p className="mt-4 text-gray-600">
        Phase 1: Digital Catalog is under construction.
      </p>
    </main>
  );
}
