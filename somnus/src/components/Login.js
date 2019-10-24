import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { axiosWithAuth } from '../utils/axiosWithAuth'

class Login extends Component {
    state = {
        credentials: {
            username: '',
            password: ''
        }
    }

    changeHandler = e => {
        this.setState({
            credentials: {
                ...this.state.credentials, 
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        axiosWithAuth()
            .post('/api/auth/login', this.state.credentials)
            .then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.token)
                this.props.history.push('/trackerlist')
            })
            .catch(err => console.log(err))
        
    }
    render() {
        return (
            <div className='login'>
                <p>Somnus</p>

                <form onSubmit={this.handleSubmit}>
                    <input 
                    type='text'
                    name='username'
                    placeholder='Username'
                    onChange={this.changeHandler}
                    value={this.state.username}
                    />
                    <input 
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={this.changeHandler}
                    value={this.state.password}
                    />
                    <button className='loginButton'>Login</button>
                </form>

                <button className='loginButton'>
                    <Link to='signup'>Sign Up</Link>
                </button>

                <p>Or Sign Up With:</p>
                <div className="socialIcons"></div>

            </div>
        )
    }
}

export default Login