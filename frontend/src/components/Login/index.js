import './index.css'
import { Component } from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
class Login extends Component
{
    state = {email:"",password:"",error:null};
    loginFunction=(event)=>
    {
        const {email,password} = this.state;
        event.preventDefault();
        const fetchFunction = async ()=>
        {
            const option = {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email,
                    password
                })
            }
            const response = await fetch("http://localhost:5000/login",option);
            if(response.ok)
            {
                const data = await response.json();
                Cookies.set('jwtToken',data.jwtToken,{expires:7});
                const {history} = this.props;
                history.replace("/home");
                this.setState({email:"",password:"",error:""});
            }
            else
            {
                const data = await response.json();
                this.setState({error:data.error});
            }
        }
        fetchFunction();
    }
    render()
    {
        const jwtToken = Cookies.get('jwtToken');
        if(jwtToken!==undefined)
        {
            return <Redirect to="/home"/>
        }
        return(
            <div className='login-page'>
                <div className='logo-div'>
                    <img className="logo" src="https://s3-alpha-sig.figma.com/img/a7c2/c95a/e57df5f03ddceb5a4011eb1efd953170?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i7lvM1s0i74MfggIel4C7VrexlGfffkxShALGiS99Txtnir6kf9cE0wDtpfwUiHXVw0BRZQHQIfzxZw1EQ0H1ClfCtFjay3rQCAIS~nSYjLOjg2TBlpcxwCRke5MQCppl-mEDFaqK3aVya7rCuiCkN2hntF9bpWkY8IHJUAJHnAT3XawIK1KXfQdPSW8NrdCJX0OPs0WWHm1JoUY~g374aVLigYQeWKFPHWCLbp7LdkPNRoL~08fbV~qj1viBUfox9ktE9IfCzq6zwxjitIwcAaYxJhH7o77FBChfuYVChd6aYDxaStNv9~tWtzOPwKUir3zVend3~SPe9Jc-FP5VA__"/>
                </div>
                <div className='login-container'>
                    <h1>Login</h1>
                    <form onSubmit={this.loginFunction}>
                        <label>Email</label>
                        <input placeholder='Enter Email' onChange={(event)=>{this.setState({email:event.target.value})}}/>
                        <label>Password</label>
                        <input placeholder='Enter Password' onChange={(event)=>{this.setState({password:event.target.value})}}/>
                        <button className='btn orange' onClick={this.loginFunction}>Login</button>
                        {
                           this.state.error&&<span className='error'>*{this.state.error}</span>
                        }
                        <label>New User? <Link to="/register">Register</Link></label>
                    </form>
                </div>
            </div>
        )
    }
}
export default Login