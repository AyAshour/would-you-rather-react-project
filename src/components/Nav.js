import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

export default function Nav() {
    const authedUser = useSelector(state => state.authedUser)
    return (
        <nav className='nav'>
            <ul>
                <li>
                    <NavLink to='/' exact activeClassName='active'>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/add' activeClassName='active'>
                        New Question
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' activeClassName='active'>
                        Leader Board
                    </NavLink>
                </li>

                {authedUser &&
                    <li>
                        <img
                            src={authedUser.avatarURL}
                            alt={`Avatar of ${authedUser.avatarURL}`}
                            className='avatar'
                        />
                        <div className='login-info'>
                            {authedUser.name}
                        </div>
                    </li>

                }
                <li>
                    <NavLink to='/login' activeClassName='active'>
                        Logout
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

