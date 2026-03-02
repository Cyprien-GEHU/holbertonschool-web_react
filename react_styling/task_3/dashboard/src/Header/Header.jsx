import holbertonLogo from '../assets/holberton-logo.jpg'

function Header() {
    return (
        <>
        <div className="App-heade flex items-center py-2">
            <img className="App-logo h-60 pointer-events-none" src={holbertonLogo} alt="holberton logo" />
            <h1 className="font-bold text-[color:var(--main-color)] text-5xl">School dashboard</h1>
        </div>
        </>
    )
}

export default Header