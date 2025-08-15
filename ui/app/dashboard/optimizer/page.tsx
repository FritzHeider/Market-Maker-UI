"use client";

export default function StrategyOptimizerPage() {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-4">AI Strategy Optimizer</h1>
      <p className="text-gray-300 mb-6 max-w-xl">
        Upload your trading history and let our AI suggest optimized parameter sets.
      </p>
      <form className="space-y-4 max-w-md">
        <input
          type="file"
          className="w-full rounded border border-gray-700 bg-gray-900 p-2"
          aria-label="Upload trading history"
        />
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          aria-label="Run Optimization"
        >
          Run Optimization
        </button>
      </form>
    </section>
  );
}
