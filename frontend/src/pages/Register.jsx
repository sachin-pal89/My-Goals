
import React, { useState, useEffect } from 'react'
import { FaUser } from "react-icons/fa"
import { useSelector, useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {register, reset} from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

function Register() {

    // to set the name, email, password and confirm password as entered by the client
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    // destructring the given formData
    const { name, email, password, password2 } = formData

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

    // Send action for register and verify the user
    const onSubmit = (e) => {
        e.preventDefault()

        // check if password and confirm password is same or not
        if(password !== password2){
            console.log("Password do not match");
        } else {

            // store given user data
            const userData = {
                name,
                email,
                password
            }
            
            // dispatch login action which basically uses given data and verify the current client
            dispatch(register(userData))
        }
    }

    // If state is still loading then show spinner
    if(isLoading){
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type="text"
                            classname="form-control"
                            id="name"
                            name="name"
                            value={name}
                            placeholder="Enter your name"
                            onChange={onChange} />
                    </div>
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
                        <input
                            type="password"
                            classname="form-control"
                            id="password2"
                            name="password2"
                            value={password2}
                            placeholder="Confirm password"
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

export default Register