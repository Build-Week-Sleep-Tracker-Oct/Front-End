import React, { Component } from 'react'
import axios from 'axios'

class SignUp extends Component {
    state = {
        credentials: {
            email: '',
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
        axios
            .post('https://sleep-tracker-bw.herokuapp.com/api/auth/register', this.state.credentials)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        this.props.history.push('/trackerlist')

    }

    render() {
        return (
            <div className='signUp'>
                <form onSubmit={this.handleSubmit}>
                    <input 
                    name='email'
                    placeholder='Email'
                    onChange={this.changeHandler}
                    value={this.state.email}
                    type='email'
                    />
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
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default SignUp