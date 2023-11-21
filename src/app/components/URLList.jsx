'use client'
import React from 'react';
import Image from 'next/image'
import Link from 'next/link'
 
const URLList = ({repos}) => {
  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo, index) => (
          <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg border-2 p-2">
            <Link href={repo.html_url} target='_blank'>
             <Image
              src={repo.owner.avatar_url}
              alt={repo.name.split('/')[0]}
              className="dark:invert rounded-full border-1 border-dotted"
              width={100}
              height={24}
              priority
            />
            <span>{ repo.html_url }</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default URLList;
