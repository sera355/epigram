import logo from '@/assets/images/logo-lg.svg';

export default function SimpleHeader() {
  return (
    <header className="fixed flex h-20 w-full items-center justify-center border-b border-(--color-line-100) bg-white px-30 py-6.5">
      <img src={logo} alt="Epigram"></img>
    </header>
  );
}
