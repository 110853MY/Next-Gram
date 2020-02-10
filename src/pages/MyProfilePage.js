import React, { useState, useEffect } from 'react';
import axios from 'axios'
import LoadingIndicator from '../components/LoadingIndicator';

const MyProfilePage = () => {

    const [Myprofile, setMyProfile] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios({
            method: "get",
            url: `https://insta.nextacademy.com/api/v1/images/me`,
            headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
        })
            .then(result => {
                console.log(result);
                setMyProfile(result.data);
                setIsLoading(false)
            })
            .catch(error => {
                console.error(error.response);
            });
    }, []);

    if (isLoading)
        return <LoadingIndicator />

    return (
        <>
            {Myprofile.map((user, index) => {
                return <img key={index} src={user} />;
            })}
        </>
    );
};

export default MyProfilePage;