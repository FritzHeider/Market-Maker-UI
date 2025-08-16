// File: ui/app/components/Footer.tsx

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-12">
      <p className="text-sm">&copy; {year} Botsensai. All rights reserved.</p>
      <p className="mt-2 space-x-4">
        <a
          href="https://twitter.com/botsensai"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white underline"
        >
          Twitter
        </a>
        <a
          href="mailto:contact@botsensai.com"
          className="hover:text-white underline"
        >
          Contact
        </a>
      </p>
    </footer>
  );
}
