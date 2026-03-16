import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';
  const navItems = [
    { name: 'หน้าแรก', to: '/', isRoute: true },
    { name: 'วิธีการศึกษา', to: '/method', isRoute: true },
    { name: 'สถิติ', to: '/stats', isRoute: true },
    { name: 'เกี่ยวกับเรา', to: '/about', isRoute: true }
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-[1200] w-[95%] max-w-6xl animate-fade-up">
      <div
        className="rounded-full border border-white/10 bg-[#0F172A]/99 backdrop-blur-sm shadow-lg shadow-black/20">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-wide text-white flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-brand-emerald)] to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-outfit text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">SolarSuit-KKU</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            {navItems.map((item) => {
              const isActive = item.isRoute && location.pathname === item.to;

              if (item.isRoute) {
                return (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`relative px-4 py-2 rounded-full transition-all duration-300 ease-[var(--ease-out-quint)] overflow-hidden group ${isActive
                      ? 'text-white bg-white/10 font-medium shadow-inner'
                      : 'hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[var(--color-brand-emerald)] rounded-t-full shadow-[0_-2px_8px_oklch(0.68_0.17_150)]"></span>
                    )}
                  </Link>
                );
              }

              return (
                <a key={item.name} href={item.to} className="px-4 py-2 rounded-full transition-all duration-300 ease-[var(--ease-out-quint)] hover:text-white hover:bg-white/5">
                  {item.name}
                </a>
              );
            })}
          </div>

          {!(isHomePage || location.pathname === '/map') && (
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 hover:border-white/20 px-5 py-2 text-sm font-medium text-white transition-all duration-300 ease-[var(--ease-out-quint)] hover:scale-105 active:scale-95 shadow-lg group relative overflow-hidden"
              onClick={() => navigate('/map')}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">สู่หน้าแผนที่</span>
              <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          )}

          {/* Mobile menu button placeholder for symmetry if button is hidden, or actual mobile menu logic could go here */}
          {(isHomePage || location.pathname === '/map') && <div className="w-[104px] hidden md:block"></div>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;