import { createContext, useEffect, useReducer } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Login from "./components/Login";
import appReducer from "./reducers/appReducer";


export const appContext = createContext()

function App() {

  const [appData,appDispatch] = useReducer(appReducer,{user:{},products:[],})

  console.log(appData)

  const isLoggedIn  = Boolean(Object.keys(appData.user).length)

  function handleLogOut(){
    appDispatch({type:'SET_USER',payload:{}})
    localStorage.removeItem('user')
  }

  useEffect(()=>{
        if(localStorage.getItem('user')){
          const user = JSON.parse(localStorage.getItem('user'))
          appDispatch({type:"SET_USER",payload:user})
      }
  },[])

  return (
      <appContext.Provider value={{appData,appDispatch}}>
        <div>
            <header>
              <nav>
                  <img src="http://www.hindigraphics.in/wp-content/uploads/2019/01/pro.png" alt="logo"/>
                  <ul className="navLinks">
                    <Link to='/home' className="navLink">Home</Link>
                    <Link to='/about' className="navLink">About</Link>
                    {isLoggedIn && <Link to='/products' className="navLink">Products</Link>}
                    {!isLoggedIn && <Link to='/' className="navLink">login</Link>}
                    {isLoggedIn && <Link to='/home' className="navLink" onClick={handleLogOut}>logout</Link>}
                  </ul>
              </nav>
            </header>
            <main>
              <Routes>
                <Route path="/" element={<Login/>}></Route>
                <Route path='/about' element={<About/>}></Route>
                <Route path='/products' element={<Products/>}></Route>
                <Route path='/home' element={<Home/>}></Route>
              </Routes>
            </main>
        </div>
      </appContext.Provider>
  )
}

export default App;
