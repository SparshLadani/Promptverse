"use client";

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setMyPosts(data);
        };

        if(session?.user.id) fetchPosts();
    }, [session?.user.id]);

    const handleDelete = async (post) => {
        const confirmDelete = confirm(`Are you sure you want to delete the post?`);

        if(confirmDelete){
            try{
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = myPosts.filter((item) => item._id !== post._id);

                setMyPosts(filteredPosts);
            }

            catch(error) {
                console.log(error);
            }
        }
    };

    const handleEdit = async (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    return (
        <Profile
            name='Your'
            desc={'Welcome to your personalized profile page. View your prompts'}
            data={myPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile;
