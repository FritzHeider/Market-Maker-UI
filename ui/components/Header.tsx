// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold text-gray-900">Botsensai</a>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#features" className="text-gray-600 hover:text-gray-900">
                Features
              </a>
            </li>
            <li>
              <a href="#about" className="text-gray-600 hover:text-gray-900">
                About
              </a>
            </li>
            <li>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
