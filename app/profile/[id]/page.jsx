"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const userProfile = ({ params }) => {
    const searchParms = useSearchParams();
    const userName = searchParms.get("name");

    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();

            setUserPosts(data);
        }

        fetchPosts();
    }, []);

    return(
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s prompts`}
            data={userPosts}
        />
    )

}

export default userProfile;