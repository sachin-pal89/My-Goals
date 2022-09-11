import React from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa"
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {logout, reset} from "../features/auth/authSlice.js"
import {useNavigate} from "react-router-dom"

function Header() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // to get the current user 
    const {user} = useSelector((state) => state.auth)

    // logout user from application
    const onLogout = () => {

        // action to logout user
        dispatch(logout())

        // action to reset value for all
        dispatch(reset())

        // navigate to home dashboard
        navigate('/')
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to="/">GoalSetter</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                    <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
                ) :
                (<>
                    <li>
                    <Link to="/login">
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to="/register">
                        <FaUser /> Register
                    </Link>
                </li>
                </>)}
                
            </ul>
        </header>
    )
}

export default Header