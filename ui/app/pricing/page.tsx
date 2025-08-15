export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-12">Pricing</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-gray-900 p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Free</h2>
          <p className="text-3xl font-bold mb-4">$0</p>
          <ul className="text-sm text-gray-400 mb-6 space-y-1">
            <li>Basic dashboard</li>
            <li>Community strategies</li>
          </ul>
          <button className="px-4 py-2 bg-blue-600 rounded">Get Started</button>
        </div>
        <div className="rounded-xl bg-gray-900 p-6 text-center border border-blue-600">
          <h2 className="text-xl font-semibold mb-2">Pro</h2>
          <p className="text-3xl font-bold mb-4">$29</p>
          <ul className="text-sm text-gray-400 mb-6 space-y-1">
            <li>Advanced analytics</li>
            <li>Strategy optimizer</li>
            <li>Email support</li>
          </ul>
          <button className="px-4 py-2 bg-blue-600 rounded">Start Pro</button>
        </div>
        <div className="rounded-xl bg-gray-900 p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Enterprise</h2>
          <p className="text-3xl font-bold mb-4">Custom</p>
          <ul className="text-sm text-gray-400 mb-6 space-y-1">
            <li>Dedicated support</li>
            <li>Custom integrations</li>
            <li>SLA & on-prem</li>
          </ul>
          <button className="px-4 py-2 bg-blue-600 rounded">Contact Sales</button>
        </div>
      </div>
    </div>
  );
}
