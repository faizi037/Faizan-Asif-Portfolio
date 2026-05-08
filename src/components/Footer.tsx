const Footer = () => {
  return (
    <footer className="bg-navy py-6 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <div className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Muhammad Soban. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
