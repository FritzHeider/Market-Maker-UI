// components/Hero.tsx
export default function Hero() {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Trade Smarter, Trade Faster
        </h2>
        <p className="text-xl mb-8">
          Leverage real-time data and AI-driven strategies to maximize your trading edge.
        </p>
        <a
          href="/dashboard"
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
        >
          Enter Dashboard
        </a>
      </div>
    </section>
  )
}