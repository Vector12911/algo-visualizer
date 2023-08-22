"use clients";

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-2 absolute bottom-0 w-full">
      <div className="container mx-auto flex text-white justify-between">
        <div />
        <p>&copy; {new Date().getFullYear()} Created By Amrit Sharma</p>
        <div className="flex gap-2">
          <span>IN</span>
          <span>Githum</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
