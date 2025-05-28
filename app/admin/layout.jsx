export default function AdminLayout({ children }) {
    return (
      <div className="min-h-screen flex">
        <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
          <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
          <nav className="space-y-2">
            <a href="/admin/header" className="block hover:text-yellow-300">Header</a>
            <a href="/admin/hero" className="block hover:text-yellow-300">Hero</a>
            <a href="/admin/aboutUs" className="block hover:text-yellow-300">About Us</a>
            <a href="/admin/propos" className="block hover:text-yellow-300">Our Proposition</a>
            <a href="/admin/galery" className="block hover:text-yellow-300">Galery</a>
            <a href="/admin/map" className="block hover:text-yellow-300">Map</a>
            <a href="/admin/discount" className="block hover:text-yellow-300">Discount</a>
            <a href="/admin/footer" className="block hover:text-yellow-300">Footer</a>

          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    );
  }