import {useContext} from "react";
import {UserContext} from "../userContext";
import {Link} from "react-router-dom";

function Header(props) {
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
            <div className="navbar-end">
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