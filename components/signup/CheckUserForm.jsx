import React from "react"

export default function CheckUserForm({err}) {
    return (
        <form className='login'>
            <div className={`input-wrapper ${err && 'turn-red'}`}>
                {user.username && <label htmlFor='user-name'>Имя пользователя</label>}
                <input 
                    required 
                    name='username'
                    className={`input ${err && 'turn-red'}`}
                    onChange={handleChange}             
                    placeholder='Имя пользователя'
                    type='text' />
            </div>
            <div className={`input-wrapper ${err && 'turn-red'}`}>
                {user.email && <label htmlFor='email'>Почта</label>}
                <input 
                    required 
                    name='email'
                    className={`input ${err && 'turn-red'}`}
                    onChange={handleChange}             
                    placeholder='Имя пользователя'
                    type='text' />
            </div>
            <button 
                id='login-button'
                className={`button ${(user.password && user.username) && 'active-btn'}`}
                onClick={login}
                disabled={user.password && user.username ? false : true}>
                    Войти
            </button>
        </form>
    )
}