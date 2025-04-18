import { Link } from "react-router";

const Header = () => {
  return (
    <header className="fixed bottom-0 left-0 w-full h-[50px] bg-slate-800 shadow-[0px_-4px_6px_-1px_rgba(255,255,255,0.3)] text-slate-50 flex items-center py-0 px-[10%] md:h-[60px] lg:h-[80px]">
      <nav className="grid grid-rows-1 grid-cols-5 w-full">
        <div className="flex justify-center items-center">
          <img
            src="../src/assets/linux.png"
            alt="Logo"
            className="h-[20px] w-[20px] flex-shrink-0 flex justify-center items-center bg-slate-300"
          />
        </div>
        <Link to="/dashboard" className="flex justify-center items-center">
          <span className="inline md:hidden">Da</span>
          <span className="hidden md:inline">Dashboard</span>
        </Link>

        <Link to="/demo/hungarian" className="flex justify-center items-center">
          <span className="inline md:hidden">Hu</span>
          <span className="hidden md:inline">Hungarian</span>
        </Link>

        <Link to="/demo/cbba" className="flex justify-center items-center">
          <span className="inline">CBBA</span>
        </Link>

      </nav>
    </header>
  );
};

export default Header;
