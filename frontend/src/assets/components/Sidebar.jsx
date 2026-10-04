function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white">
      <div className="border-b border-gray-700 p-5">
        <h1 className="text-xl font-bold">Duitku</h1>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <a
              href="/dashboard"
              className="block rounded-lg px-4 py-2 hover:bg-gray-800"
            >
              Dashboard
            </a>
          </li>

          <li>
            <a
              href="/transaksi"
              className="block rounded-lg px-4 py-2 hover:bg-gray-800"
            >
              Transaksi
            </a>
          </li>

          <li>
            <a
              href="/pengguna"
              className="block rounded-lg px-4 py-2 hover:bg-gray-800"
            >
              Pengguna
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
