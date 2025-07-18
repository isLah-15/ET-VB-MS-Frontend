





export default function AboutLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-red-100 p-8 text-gray-800">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-red-600">Welcome to the Greatest Show in Ticketing!</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Your all-access pass to magical events, circus spectacles, haunted thrills, and more.
        </p>
      </section>

      {/* Our Story */}
      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p>
          We dreamed of a place where finding and booking unforgettable experiences felt like part of the adventure. From neon-lit circus raves to ghostly funhouses, we bring the extraordinary to your fingertips.
        </p>
      </section>

      {/* What We Offer */}
      <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-lg mb-2">🎟️ Easy Ticket Booking</h3>
          <p>Book your seat in just a few clicks—fast, secure, and hassle-free.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-lg mb-2">🎪 Curated Events</h3>
          <p>Discover top-tier entertainment from parades to horror mazes and more.</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-lg mb-2">🧠 Smart Suggestions</h3>
          <p>Get personalized event picks based on your interests and vibe.</p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Bold, playful interface with a circus twist 🎉</li>
          <li>Trustworthy, user-first experience</li>
          <li>Perfect for thrill-seekers, families, and fun lovers</li>
        </ul>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to grab your front-row seat?</h2>
        <button className="text-white bg-red-600 hover:bg-red-700 text-lg px-6 py-3 rounded-full">
          Explore Events
        </button>
      </section>
    </div>
  );
}
