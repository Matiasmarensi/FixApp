import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Not Found",
};
export default function NotFound() {
  return (
    <div className="px-2 w-full">
      <div className="mx-auto py-4 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl text-center">Not Found</h2>
        <Image
          className="m-0 rounded-xl mx-auto"
          src="/notfound.jpg"
          alt="not found"
          width={300}
          height={300}
          sizes="300px"
          priority={true}
          title="not found"
        />
      </div>
      <div className="flex justify-center">
        <Link
          href="/tickets"
          className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 hover:scale-105 transform text-center"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
