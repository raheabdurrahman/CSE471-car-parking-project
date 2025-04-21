
const Footer = () => {
  return (
    <footer className="bg-parkblue-dark py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-white font-bold mb-2">ParkEase</h3>
            <p className="text-white text-sm">Find. Book. Park. Stress-Free!</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-white font-bold mb-2">Quick Links</h3>
            <ul className="text-white text-sm">
              <li className="mb-1"><a href="/" className="hover:underline">Home</a></li>
              <li className="mb-1"><a href="/about" className="hover:underline">About Us</a></li>
              <li className="mb-1"><a href="/find-parking" className="hover:underline">Find Parking</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-white font-bold mb-2">Contact</h3>
            <p className="text-white text-sm">Email: support@parkease.com</p>
            <p className="text-white text-sm">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 border-t border-blue-400 pt-4">
          <p className="text-white text-sm text-center">© 2025 ParkEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
