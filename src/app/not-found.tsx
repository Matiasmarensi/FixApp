import Image from "next/image";

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
    </div>
  );
}
