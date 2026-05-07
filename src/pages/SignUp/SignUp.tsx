import SimpleHeader from '@/components/Header/SimpleHeader';
import Logo from '@/assets/images/logo-lg.svg';

export default function SignUp() {
  return (
    <>
      <SimpleHeader />
      <img src={Logo} alt="logo" className="h-12" />
    </>
  );
}
