import logo from '@/assets/images/logo-lg.svg';
import user from '@/assets/icons/user.svg';

export default function Header() {
  return (
    <header className="top-0 left-0 z-50 fixed flex h-20 w-full items-center justify-between border-b border-(--color-line-100) bg-white px-30 py-6.5">
      <div className="flex items-center gap-9">
        <img src={logo} alt="Epigram"></img>
        <div className="text-base font-semibold text-center justify-start text-neutral-700 leading-6">
          피드
        </div>
      </div>

      <div className="flex items-center gap-1">
        <img src={user}></img>
        <button className="text-sm font-medium text-gray-300">김코드</button>
      </div>
    </header>
  );
}
