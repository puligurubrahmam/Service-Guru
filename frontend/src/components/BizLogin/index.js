import './index.css'
import { Component } from 'react'
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from 'js-cookie'
class BizLogin extends Component
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
            const response = await fetch("http://localhost:5000/bizlogin",option);
            if(response.ok)
            {
                const data = await response.json();
                Cookies.set('jwtToken',data.jwtToken,{expires:7});
                const {history} = this.props;
                history.replace("/bizhome");
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
            return <Redirect to="/bizhome"/>
        }
        return(
            <div className='login-page'>
                <div className='logo-div'>
                    <img className="logo" src="https://i.pinimg.com/originals/09/f5/27/09f52772454cb6c8589681f32bbab479.jpg"/>
                </div>
                <div className='login-container'>
                    <h1>Workers Login</h1>
                    <form onSubmit={this.loginFunction}>
                        <label>Email</label>
                        <input placeholder='Enter Email' onChange={(event)=>{this.setState({email:event.target.value})}}/>
                        <label>Password</label>
                        <input type='password' placeholder='Enter Password' onChange={(event)=>{this.setState({password:event.target.value})}}/>
                        <button className='btn orange' onClick={this.loginFunction}>Login</button>
                        {
                           this.state.error&&<span className='error'>*{this.state.error}</span>
                        }
                        <label>New User? <Link to="/bizregister">Register</Link></label>
                    </form>
                </div>
            </div>
        )
    }
}
export default BizLogin
