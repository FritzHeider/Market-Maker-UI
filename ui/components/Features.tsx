// components/Features.tsx
export default function Features() {
  return (
    <section id="features" className="py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-xl font-bold mb-2">Real-Time Data</h4>
            <p>Stay ahead with live market updates and actionable insights.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-xl font-bold mb-2">AI-Enhanced Strategies</h4>
            <p>
              Utilize intelligent algorithms to refine your trading decisions and strategies.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-xl font-bold mb-2">High-Frequency Trading</h4>
            <p>
              Experience rapid order execution and take advantage of fleeting market opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}