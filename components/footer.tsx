"use clients";

import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-2 absolute bottom-0 w-full">
      <div className="container mx-auto flex text-white justify-between">
        <div />
        <p>&copy; {new Date().getFullYear()} Created By Amrit Sharma</p>
        <div className="flex gap-4">
          <span className="">
            <Image src="/linkedin.svg" width={23} height={23} alt="linkedin" />
          </span>
          <span className="bg-white">
            <Image src="/github.png" width={23} height={23} alt="github" />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
