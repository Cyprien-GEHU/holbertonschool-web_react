import holbertonLogo from '../assets/holberton-logo.jpg';

function Header() {
  return (
    <div className="flex items-center py-2">
      <img src={holbertonLogo} alt="holberton logo" className='h-60 pointer-events-none'/>
      <h1 className='font-bold text-[color:var(--main-color)] text-5xl'>School dashboard</h1>
    </div>
  );
}

export default Header;