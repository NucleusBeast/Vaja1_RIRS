import { Link } from "react-router-dom";
import { UserContext } from "../userContext";
import { useTheme } from '../themeContext';

function Header(props) {
    const { toggleTheme, theme } = useTheme();

    return (
        <div className="navbar bg-neutral text-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h16M4 18h7"/>
                        </svg>
                    </div>
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral  rounded-box w-52">
                        <li><a href={'/'}>Homepage</a></li>
                        <UserContext.Consumer>
                            {context => (context.user ?
                                    <>
                                        <li><a href={'/publish'}>Publish</a></li>
                                        <li><a href={'/profile'}>Profile</a></li>
                                        <li><a href={'/logout'}>Logout</a></li>
                                    </>
                                    :
                                    <>
                                        <li><a href={'/login'}>Login</a></li>
                                        <li><a href={'/register'}>Register</a></li>
                                    </>
                            )}
                        </UserContext.Consumer>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl" href={'/'}>Vaja3</a>
            </div>
            <div className="navbar-end gap-2">
                <button className="btn btn-ghost btn-circle" onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === 'mythemedark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.36 6.36l-1.42-1.42M7.05 7.05 5.64 5.64m12.02 0-1.41 1.41M7.05 16.95l-1.41 1.41M12 8a4 4 0 100 8 4 4 0 000-8z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                        </svg>
                    )}
                </button>
                <UserContext.Consumer>
                    {context => (context.user ?
                            <>
                                <button className="btn btn-ghost hover:bg-accent btn-circle">
                                    <>
                                        {/*TODO: Add image*/}
                                        <Link to='/publish'>
                                            <div className="indicator">
                                                <i className="material-icons">publish</i>
                                            </div>
                                        </Link>
                                    </>
                                </button>

                                <button className="btn btn-ghost hover:bg-accent btn-circle">
                                    <>
                                        {/*TODO: Add image*/}
                                        <Link to='/profile'>
                                            <div className="indicator">
                                                <i className="material-icons">account_circle</i>
                                            </div>
                                        </Link>
                                    </>
                                </button>
                            </>
                            :
                            <>
                                <button className="btn btn-ghost hover:bg-accent btn-circle">
                                    <>
                                        <Link to='/login'>
                                            <div className="indicator">
                                                <i className="material-icons">account_circle</i>
                                            </div>
                                        </Link>
                                    </>
                                </button>
                            </>
                    )}
                </UserContext.Consumer>
            </div>
        </div>
    )
        ;
}

export default Header;