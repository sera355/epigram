import logo from '@/assets/images/logo-lg.svg';
import user from '@/assets/icons/user.svg';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="top-0 left-0 z-50 fixed flex h-20 w-full items-center justify-between border-b border-(--color-line-100) bg-white px-30 py-6.5">
      <div className="flex items-center gap-9">
        <Link to="/">
          <img src={logo} alt="Epigram" className="cursor-pointer"></img>
        </Link>
        
        <Link to ="/epigramlist" className="text-base font-semibold text-center justify-start text-(--color-black-600) leading-6 
        cursor-pointer">
          피드
        </Link>
      </div>

      <Link to="/login" className="flex items-center gap-1">
        <img src={user} className="cursor-pointer"></img>
        <button className="text-[14px] font-medium text-(--color-gray-300) cursor-pointer">김코드</button>
      </Link>
    </header>
  );
}
