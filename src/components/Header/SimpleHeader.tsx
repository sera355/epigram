import logo from '@/assets/images/logo-lg.png';

export default function SimpleHeader() {
  return (
    <header className="flex h-20 w-full items-center justify-center border-b border-[var(--color-line-100)] bg-white px-[120px] py-[26px]">
      <img src={logo} alt="Epigram"></img>
    </header>
  );
}
