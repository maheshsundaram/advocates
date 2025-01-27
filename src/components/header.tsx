import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-solace border-b z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link
          href="https://solace.health"
          className="text-4xl font-custom text-gray-50 transition-colors"
        >
          Solace
        </Link>
      </div>
    </header>
  );
}
