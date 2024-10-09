import Image from "next/image";

export default function loading() {
  return (
    <div className="h-full w-full flex">
        <span className="loading loading-ring loading-lg justify-center items-center"></span>
    </div>
  );
}