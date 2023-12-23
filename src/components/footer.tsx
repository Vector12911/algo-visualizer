"use clients";

import Image from "next/image";
import Github from "../icons/github";

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-2 fixed bottom-0 w-full">
      <div className="container mx-auto flex text-white justify-between">
        <div />
        <p>&copy; {new Date().getFullYear()} Created By Amrit Sharma</p>
        <div className="flex gap-4">
          <a
            target="blank"
            href="https://www.linkedin.com/in/amrit-sharma-h3rt5lw8/"
          >
            <Image src="/linkedin.svg" width={23} height={23} alt="linkedin" />
          </a>
          <a
            target="blank"
            href="https://github.com/Vector12911/algo-visualizer"
          >
            <Image
              src="/github.png"
              width={23}
              height={23}
              alt="github"
              style={{ borderRadius: "100%", background: "white" }}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
