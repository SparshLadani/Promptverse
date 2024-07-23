"use client";

import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
    const { data: session} = useSession();
    const path = usePathname();

  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        {session?.user && path === '/profile' ? (
            <span className='blue_gradient'>{name} Profile</span>
        ) : (
            <span className='blue_gradient'>{name}'s Profile</span>
        )}
      </h1>
      <p className='desc text-left mt-16 font-satoshi font-semibold text-gray-800 text-[28px]'>
        {desc}
      </p>
      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;