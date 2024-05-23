import { useNavigate } from 'react-router';
import './Login.css';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(){
    
    const navigate = useNavigate();
    const [username,setUsername]=useState('')
    const [pwd,setPwd]=useState('')

    useEffect(()=>{

        if(localStorage.getItem('token') ==null){
            // navigate('/login')
        }else{
            navigate('/dashboard')
        }


    })

    const onLogin= async(e)=>{
        e.preventDefault();
        if(username ==='' || pwd===''){
            toast.error('Fill the details !!')
        }
        else{

            const res =  await fetch('http://localhost:8055/api/login',{

            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username:username,
                pwd:pwd
            }),
            

            })

            const data = await res.json()
            if(!data.status){
                toast.error(data.message)
            }else{
                if(data.message==='Login Successfull !!'){
                    toast.success(data.message)
                    setTimeout(() => {
                        localStorage.setItem('token',username)
                        navigate('/dashboard')
                    }, 2100);
                }else{
                    toast.error(data.message)
                    setTimeout(() => {

                        setUsername('')
                        setPwd('')
                        
                    }, 2100);
                }
            }


        }
        

    }
    return(
        <>
        <div className='loginbox'>
            <div className='logtitle'>
                <h1>Login Form</h1>
            </div>
            <form onSubmit={onLogin}> 
            <div className='inputfiled'>
                <label>Username<span>*</span></label>  
                <input type='text' value={username} onChange={(e)=>setUsername(e.target.value)}/>             
            </div>
            <div className='inputfiled'>
                <label>Password<span>*</span></label>  
                <input type='password'
                value={pwd} onChange={(e)=>setPwd(e.target.value)}/>             
            </div>
           <input type='submit' value='Login'></input>
           </form>
           
        </div>
        <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"/>
           
        </>
    );
}
export default Login;