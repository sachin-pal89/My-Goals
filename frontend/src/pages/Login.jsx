
import React, { useState, useEffect } from 'react'
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {login, reset} from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

function Login() {

    // to set the email and password as entered by the client
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    // destructring the given formData
    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    // basically state action to check
    const { user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth)

    // if changes occur from any of the action given above
    useEffect(() => {
        
        // if errored occurred give a warning message
        if(isError){
            console.log(message);
        }

        // if successfully logged in then return to dashboard
        if(isSuccess || user){
            navigate('/')
        }

        // after that dispatch reset action which will make all state action to their default value
        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])


    // if some changes occur in input fields
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    // Send action for login and verify the user
    const onSubmit = (e) => {
        e.preventDefault()

        // store given user data
        const userData = {
            email,
            password
        }

        // dispatch login action which basically uses given data and verify the current client
        dispatch(login(userData))
    }

    // If state is still loading then show spinner
    if(isLoading){
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting goals</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type="text"
                            classname="form-control"
                            id="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <input
                            type="password"
                            classname="form-control"
                            id="password"
                            name="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={onChange} />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login