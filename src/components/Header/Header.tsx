import logo from '@/assets/images/logo-lg.png';
import user from '@/assets/icons/user.svg';

export default function Header() {
  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-[var(--line-100)] bg-white px-[120px] py-[26px]">
      <div className="flex items-center gap-[36px]">
        <img src={logo} alt="Epigram"></img>
        <div className="text-base font-semibold text-center justify-start text-neutral-700 leading-6">
          피드
        </div>
      </div>

      <div className="flex items-center gap-[4px]">
        <img src={user}></img>
        <button className="text-sm font-medium text-[var(--color-gray-300)]">
          김코드
        </button>
      </div>
    </header>
  );
}
