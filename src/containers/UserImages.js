import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator';
import GracefulImage from 'react-graceful-image';

const UserImages = ({ usersId }) => {

    const [userImages, setUserImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v2/images?userId=${usersId}`)
            .then(result => {
                setUserImages(result.data)
                setIsLoading(false)
            })
    }, [])

    if (isLoading)
        return <LoadingIndicator />

    return (
        <>
            {
                userImages.map((userImage) => {
                    return <GracefulImage placeholderColor="white" width="250" height="200" key={userImage.id}
                        src={userImage.url} alt="Pic Pic Pic Pic" />
                })
            }
        </>
    )
}

export default UserImages;