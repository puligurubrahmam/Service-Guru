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
                <img className="logo" src="https://s3-alpha-sig.figma.com/img/a7c2/c95a/e57df5f03ddceb5a4011eb1efd953170?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i7lvM1s0i74MfggIel4C7VrexlGfffkxShALGiS99Txtnir6kf9cE0wDtpfwUiHXVw0BRZQHQIfzxZw1EQ0H1ClfCtFjay3rQCAIS~nSYjLOjg2TBlpcxwCRke5MQCppl-mEDFaqK3aVya7rCuiCkN2hntF9bpWkY8IHJUAJHnAT3XawIK1KXfQdPSW8NrdCJX0OPs0WWHm1JoUY~g374aVLigYQeWKFPHWCLbp7LdkPNRoL~08fbV~qj1viBUfox9ktE9IfCzq6zwxjitIwcAaYxJhH7o77FBChfuYVChd6aYDxaStNv9~tWtzOPwKUir3zVend3~SPe9Jc-FP5VA__"/>
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