import React from 'react';
import UserImages from '../containers/UserImages';
import { Link } from 'react-router-dom';

const HomePage = ({ users }) => {
    return (
        <div className="App">
            <h1>Home Page</h1>
            <ul>
                {users.map(user => (
                    <Link to={`/users/${user.id}/${user.username}/${user.profileImage}`}>
                        <li >
                            <img className="userprofile" height="200" src={user.profileImage} alt="Pic Pic Pic Pic" />
                            <br />
                            <h1>{user.username}</h1>
                            <UserImages usersId={user.id} />
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default HomePage;