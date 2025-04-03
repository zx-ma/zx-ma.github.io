import { ReactNode } from "react";
import Header from "./Header";

interface StructureInterf {
  children: ReactNode;
}

const Structure = ({ children }: StructureInterf) => {
  return (
    <div className="w-[100vw]">
      <main className="w-[100vw] flex-grow mt-[0px] h-[calc(100vh-100px)] screen800w:h-[calc(100vh-60px)] bg-slate-100">
        {children}
      </main>
      <Header />
    </div>
  );
};

export default Structure;
