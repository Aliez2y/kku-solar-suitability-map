import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    // { name: 'Team', path: '/team' },
  ];

  return (
  <nav className="fixed top-0 left-0 w-full bg-white text-[#222] shadow-md px-6 py-3 flex items-center justify-between z-[9999]" style={{maxWidth:'100vw'}}>
      <div className="text-2xl font-bold tracking-wide select-none text-[#2563EB]">SolarSuit-KKU</div>
      <div className="flex items-center gap-6">
        <div className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-lg font-medium px-3 py-1 rounded-md transition-colors duration-150
                ${location.pathname === item.path
                  ? 'bg-[#F3F4F6] text-[#222]'
                  : 'hover:bg-[#E0E7EF] hover:text-[#2563EB] text-[#222]'}
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        {/* CTA Button - แสดงเฉพาะในหน้า About */}
        {location.pathname === '/about' && (
          <button
            className="group relative px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 transform overflow-hidden"
            onClick={() => navigate('/map')}
          >
            <span className="relative z-10 flex items-center gap-2">
              เข้าสู่แผนที่
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;