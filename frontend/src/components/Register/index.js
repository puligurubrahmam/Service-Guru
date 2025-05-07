import './index.css'
import { Component } from 'react'

class Register extends Component
{
    state={email:'',password:'',confirm_password:'',error:'',loading:false};
    registerFunction=(event)=>
    {
        event.preventDefault();
        if(this.state.password===this.state.confirm_password)
        {
            const fetchFunction= async ()=>
            {
                const {email,password} = this.state;
                this.setState({loading:true});
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
                const response = await fetch("https://nviri-assignment-backend.onrender.com/register",option);
                if(response.ok)
                {
                    this.setState({loading:false})
                    const data = await response.json();
                    console.log(data);
                    const {history} = this.props;
                    history.replace("/login");
                    this.setState({email:'',password:'',confirm_password:'',error:''});
                }
                else
                {
                    this.setState({loading:false})
                    const data = await response.json();
                    this.setState({error:data.error});
                }
            }
            fetchFunction();
        }
        else
        {
            this.setState({error:"Enter same password"});
        }
    }
    render()
    {
        return(
            <div className='login-page'>
                <div className='logo-div'>
                    <img className="logo" src="https://i.pinimg.com/originals/09/f5/27/09f52772454cb6c8589681f32bbab479.jpg"/>
                </div>
                <div className='login-container'>
                    <h1>Register</h1>
                    <form onSubmit={this.registerFunction}>
                        <label>Email</label>
                        <input placeholder='Enter Email' onChange={(event)=>{this.setState({email:event.target.value})}}/>
                        <label>Password</label>
                        <input  type='password' placeholder='Enter Password' onChange={(event)=>{this.setState({password:event.target.value})}}/>
                        <label>Confirm Password</label>
                        <input type='password' placeholder='Enter Password Again' onChange={(event)=>{this.setState({confirm_password:event.target.value})}}/>
                        <button className='btn orange' onClick={this.registerFunction}>{this.state.loading?'Loading...':'Register'}</button>
                        {
                            this.state.error&&<p className='error'>*{this.state.error}</p>
                        }
                    </form>
                </div>
            </div>
        )
    }
}
export default Register
