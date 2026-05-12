import logo from '@/assets/images/logo-lg.svg';
import { Link } from 'react-router-dom';

export default function SimpleHeader() {
  return (
    
    <header className="fixed flex h-20 w-full items-center justify-center border-b border-(--color-line-100) bg-white px-30 py-6.5 cursor-pointer">
      <Link to="/epigramlist">
        <img src={logo} alt="Epigram" className="cursor-pointer"></img>
      </Link>
    </header>
  );
}
