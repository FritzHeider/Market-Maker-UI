// components/Footer.tsx
export default function Footer() {
  return (
    <footer id="contact" className="bg-white py-6 shadow-inner">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>© 2025 Botsensai. Built with ❤️ using Next.js, FastAPI & Tailwind CSS</p>
        <p className="mt-2">
          <a href="mailto:support@botsensai.com" className="hover:underline">
            support@botsensai.com
          </a>
        </p>
      </div>
    </footer>
  )
}