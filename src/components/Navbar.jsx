import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';
  const navItems = [
    { name: 'หน้าแรก', to: '/', isRoute: true },
    { name: 'วิธีการศึกษา', to: '/method', isRoute: true },
    { name: 'สถิติ', to: '/#stats', isRoute: false },
    { name: 'เกี่ยวกับเรา', to: '/about', isRoute: true }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1200] border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-18 flex items-center justify-between">
          <Link to="/" className="text-xl sm:text-2xl font-semibold tracking-wide text-white">
            SolarSuit-KKU
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-200">
            {navItems.map((item) => {
              const isActive = item.isRoute && location.pathname === item.to;

              if (item.isRoute) {
                return (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`transition-colors ${isActive ? 'text-white font-semibold underline decoration-2' : 'hover:text-white'}`}
                  >
                    {item.name}
                  </Link>
                );
              }

              return (
                <a key={item.name} href={item.to} className="transition-colors hover:text-white">
                  {item.name}
                </a>
              );
            })}
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 hover:bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors shadow-lg shadow-violet-950/60"
            onClick={() => navigate('/map')}
          >
            {isHomePage ? 'เปิดใช้งานแผนที่' : 'เข้าสู่แผนที่'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;