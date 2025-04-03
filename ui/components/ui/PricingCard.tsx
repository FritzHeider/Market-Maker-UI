"use client";

export default function PricingCard({
  plan,
}: {
  plan: { name: string; price: string; features: string[] };
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-transform hover:scale-[1.02]">
      <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
      <p className="text-4xl font-bold text-blue-600 mb-4">{plan.price}</p>
      <ul className="text-left text-sm space-y-2 mb-6">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-green-500">✔</span> {feature}
          </li>
        ))}
      </ul>
      <button
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
        aria-label={`Start plan: ${plan.name}`}
      >
        Get Started
      </button>
    </div>
  );
}
