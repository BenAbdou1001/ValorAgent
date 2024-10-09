import Image from "next/image";

export default function loading() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
}
