import { useState } from "react";

const Dashboard = () => {
  const [introText, setIntroText] = useState("Ma's web");
  const introFunc = () => {
    setIntroText((prevText) =>
      prevText === "Ma's web" ? "马的网" : "Ma's web"
    );
  };
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-130px)] box-border">
      <p
        className="text-[3em] hover:bg-slate-800 cursor-pointer transition-all duration-300 hover:scale-105 hover:text-slate-200 hover:shadow-2xl"
        onClick={introFunc}
      >
        {introText}
      </p>
    </div>
  );
};

export default Dashboard;
