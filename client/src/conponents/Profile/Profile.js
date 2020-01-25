import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Profile.module.css';
import {Redirect} from 'react-router-dom';

const Profile = (props) => {
    let [selectedUser, setSelectedUser] = useState('');
    let [users, setUsers] = useState([]);
    let [deleted, setDeleted] = useState(false);
    let [logout, setLogout] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:4000/users').then(res => {
            console.log(res);
            setUsers(res.data.data);
        }).catch(err => {
            console.log(err);
        })
    }, [deleted])


    const deleteHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/deleteuser', {
            username: selectedUser
        }).then(res => setDeleted(true)).
            catch(err =>
                console.log(err)
            )
    }

    const logoutHandler=()=>{
        setLogout(true);
    }

    const selectedUserChanged = (e, selected) => {
        console.log(e.target.value);
        console.log(selected);
        setSelectedUser(e.target.value);
    }

    return (
        <div className={style.body}>
            {logout?
            <Redirect to='/login'/>:
            users?
            <div>
            <select onClick={(e)=>selectedUserChanged(e, this)}>
                {users.map(user => {
                    return <option key={user.username} value={user.username} >{user.username}</option>
                })}
            </select>
            <button onClick={deleteHandler}>Delete</button>
            <button onClick={logoutHandler}>Logout</button>
            </div>
            :
            <h1>Loading...</h1>}
        </div>
    );
}

export default Profile;