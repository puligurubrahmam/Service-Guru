import {BrowserRouter,Switch,Route} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import BizLogin from './components/BizLogin'
import Register from './components/Register'
import BizRegister from './components/BizRegister'
import LoginHome from './components/LoginHome'
import BizHome from './components/BizHome'
const App=()=>
{
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/bizlogin" component={BizLogin}/>
        <Route exact path="/bizregister" component={BizRegister}/>
        <Route exact path="/home" component={LoginHome}/>
        <Route exact path="/bizhome" component={BizHome}/>
      </Switch>
    </BrowserRouter>
  )
}
export default App;