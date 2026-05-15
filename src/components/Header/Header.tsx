import { useState } from 'react';
import logo from '@/assets/images/logo-lg.svg';
import userIcon from '@/assets/icons/user.svg';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '@/apis/auth';

export default function Header() {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = localStorage.getItem('accessToken');
  const savedUser = localStorage.getItem('user');
  const parsedUser = savedUser ? JSON.parse(savedUser) : null;

  const isLoggedIn = !!token;

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logOut();
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between border-b border-(--color-line-100) bg-white px-30 py-6.5">
      <div className="flex items-center gap-9">
        <Link to="/">
          <img src={logo} alt="Epigram" className="cursor-pointer" />
        </Link>

        <Link
          to="/epigramlist"
          className="cursor-pointer text-center text-base leading-6 font-semibold text-(--color-black-600)"
        >
          피드
        </Link>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={handleProfileClick}
          className="flex items-center gap-1"
        >
          <img src={userIcon} className="cursor-pointer" />
          <span className="cursor-pointer text-[14px] font-medium text-(--color-gray-300)">
            {isLoggedIn ? parsedUser?.nickname : '로그인'}
          </span>
        </button>

        {isLoggedIn && isMenuOpen && (
          <div className="absolute top-[48px] right-0 z-50 flex min-w-max flex-col rounded-[20px] border border-[#D7E0EE] bg-white shadow-sm">
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-[10px] px-[32px] py-[12px] text-[20px] leading-[32px] font-normal text-(--color-black-600)"
            >
              로그아웃하기
            </button>
          </div>
        )}
      </div>
    </header>
  );
}