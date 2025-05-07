import './index.css'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
const BizHome =(props)=>
{
    const jwtToken = Cookies.get("jwtToken");
    if(jwtToken === undefined)
    {
        return <Redirect to="/bizlogin"/>
    }
    const logoutFunction=()=>
    {
        Cookies.remove("jwtToken");
        const {history} = props;
        history.replace('/bizlogin');
    }
    return (
        <div className='bizhome'>
            <div className='logo-div-dashboard'>
                <img className="logo" src="https://i.pinimg.com/originals/09/f5/27/09f52772454cb6c8589681f32bbab479.jpg"/>
                <button onClick={logoutFunction} className='btn orange'>Logout</button>
            </div>
            <div className='book-service-container'>
                <h1>Employers DashBoard</h1>
                <p>No Services Booked yet</p>
            </div>
        </div>
    )
}
export default BizHome
