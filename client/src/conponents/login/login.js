import React, {useState} from 'react';
import style from './login.module.css'

const Login = (props) => {

    let [username, setUsername]=useState('');
    let [password, setPassword]=useState('');

    const onChangeHandler=(e, isUsername)=>{
        if(isUsername)
            setUsername(e.target.value);
        else
            setPassword(e.target.value);
    }

    return (
        <div className={style.Body}>
            Please {props.isLogin? 'Login': 'Signup'}
            <div className={style.input}>
                Username: <input type='text' value={username} onChange={(e)=>onChangeHandler(e, true)}/>
            </div>
            <div className={style.input}>
                Password: <input type='password' value={password} onChange={(e)=>onChangeHandler(e, false)}/>
            </div>
            <button className={style.button} onClick={(event)=>props.click(event, props.isLogin, username, password)}>{props.isLogin? 'Login': 'Signup'}</button>
        </div>
    )
}

export default Login