// components/Pricing.tsx
export default function Pricing() {
  return (
    <section id="pricing" className="py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-8">Pricing Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h4 className="text-xl font-bold mb-2">Basic</h4>
            <p className="text-3xl font-bold mb-4">$29/mo</p>
            <ul className="mb-4 space-y-2">
              <li>Access to real-time data</li>
              <li>Basic AI insights</li>
              <li>Email support</li>
            </ul>
            <a
              href="#"
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Choose Plan
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h4 className="text-xl font-bold mb-2">Pro</h4>
            <p className="text-3xl font-bold mb-4">$79/mo</p>
            <ul className="mb-4 space-y-2">
              <li>Advanced analytics</li>
              <li>High-frequency trading support</li>
              <li>Priority support</li>
            </ul>
            <a
              href="#"
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Choose Plan
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <h4 className="text-xl font-bold mb-2">Enterprise</h4>
            <p className="text-3xl font-bold mb-4">Custom</p>
            <ul className="mb-4 space-y-2">
              <li>Tailored solutions</li>
              <li>Dedicated account management</li>
              <li>Custom integrations</li>
            </ul>
            <a
              href="#"
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}