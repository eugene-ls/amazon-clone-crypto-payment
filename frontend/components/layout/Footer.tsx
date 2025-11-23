import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Mazon</h3>
            <p className="text-sm text-gray-600">
              Your destination for fashion and style. Discover the latest trends and timeless classics.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/products?category=men" className="hover:text-black">Men</Link></li>
              <li><Link href="/products?category=women" className="hover:text-black">Women</Link></li>
              <li><Link href="/products?category=kids" className="hover:text-black">Kids</Link></li>
              <li><Link href="/products?category=sale" className="hover:text-black">Sale</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-black">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-black">Shipping</Link></li>
              <li><Link href="#" className="hover:text-black">Returns</Link></li>
              <li><Link href="#" className="hover:text-black">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-black">About Us</Link></li>
              <li><Link href="#" className="hover:text-black">Careers</Link></li>
              <li><Link href="#" className="hover:text-black">Sustainability</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Mazon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}


