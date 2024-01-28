import {Box, Button, TextField} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import cryptojs from 'crypto-js'
import axios from 'axios'
import {isEmail,isStrongPassword} from 'validator'
import { appContext } from '../App'

const Login = (props) => {


    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [formErrors,setFormErrors] = useState({})
    const errors= {}
    const navigate = useNavigate() 
    const {appDispatch} = useContext(appContext)

    function runValidations(){ 
        if(username==''){
            errors.username = 'Email cannot be empty.'
        }
        else if(!isEmail(username)){
            errors.username = 'Invalid email.'
        }
        if(password==''){
            errors.password ='Password cannot be empty.'
        }
        else if(!isStrongPassword(password)){
            errors.password = 'Invalid password. (requires min 8 chars, 1 lowercase letter, 1 uppercase letter, 1 number & 1 special character)'
        }
    }

    function generateSHA256Hash(input) {
        return cryptojs.SHA256(input).toString(cryptojs.enc.Hex )
      }

    async function handleSubmit(e){ 
        e.preventDefault()
        runValidations() 

        if(Object.keys(errors).length==0){
            setFormErrors({})
            const shaEncrypted = generateSHA256Hash(password)
            const formData = new FormData()
            formData.append('username',username)
            formData.append('password',shaEncrypted) 
            formData.append('grant_type','password')
            
    
            try{
                const response = await axios.post('https://apiv2stg.promilo.com/user/oauth/token',formData,{
                    headers:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization:"Basic UHJvbWlsbzpxNCE1NkBaeSN4MiRHQg=="
                    }
                })
                appDispatch({type:"SET_USER",payload:response.data.response})
                localStorage.setItem('user',JSON.stringify(response.data.response))
                navigate('/home')
                
            }
            catch(err){
                setFormErrors({loginError:err.response.data.status.message})
            }
        }
        else{ 
            setFormErrors(errors)
        }
        

    }

    return (
        <div className='loginContainer'>
            <Box 
             component='form'
             onSubmit={handleSubmit} 
             encType="application/x-www-form-urlencoded"
             sx={{display:'grid',backgroundColor:'whitesmoke',p:'3rem',borderRadius:'1rem',boxShadow:'2px 4px 10px 1px',maxWidth:'300px'}}>
                <TextField 
                value={username}
                onChange={(e)=>{setUsername(e.target.value)}}
                label="email" 
                variant="outlined" 
                size='small'
                error={Boolean(formErrors.username)}
                helperText={formErrors.username ? formErrors.username : ''}/><br/>
                <TextField 
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                label="password" 
                type='password' 
                variant="outlined" 
                size='small'
                error={Boolean(formErrors.password)}
                helperText={formErrors.password ? formErrors.password : ''}/><br/>
                {formErrors.loginError && <p style={{color:'red'}}>{formErrors.loginError}</p> }
                <Button 
                type='submit'
                variant='contained'
                sx={{backgroundColor:'rgb(150, 112, 89)'}}>
                Login
                </Button>
            </Box>
        </div>
    )
}


export default Login