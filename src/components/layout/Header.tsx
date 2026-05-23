import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="border-b border-[#e5e2df] bg-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-headline font-bold text-[#1c1c1a] tracking-tight">
          BuildBazaarX <span className="italic font-normal text-[#735c00]">Professional</span>
        </Link>
      </div>
    </header>
  );
};
