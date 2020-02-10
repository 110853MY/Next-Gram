import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator';
import GracefulImage from 'react-graceful-image';

const UserProfilePage = () => {

    const { userId, username, profileImage } = useParams()
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${userId}`)
            .then(result => {
                setProfiles(result.data)
                setIsLoading(false)
            })
    }, [])

    if (isLoading)
        return <LoadingIndicator />

    return (
        <div className="App">
            <img src={profileImage} />
            <h1>{username}</h1>
            <ul>
                {profiles.map((profile) => (
                    <li className="userprofile">
                        <GracefulImage placeholderColor="white" width="275px" height="255px" src={profile} alt="photo" />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserProfilePage;