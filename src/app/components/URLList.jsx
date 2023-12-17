// URLList.js
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Fuse from 'fuse.js'

function getAllCards(repos) {
  return repos.map((repo, index) => (
    <div key={index}
      className={`card max-w-sm rounded overflow-hidden shadow-lg border p-4 transition duration-300 ease-in-out transform hover:scale-105 ${getCurrentClass(index)
        }`}>
      <Link href={`/repo/${repo.full_name}`}>
        <div className="flex items-center justify-between mb-4">
          <Image
            src={repo.owner.avatar_url}
            alt={repo.name.split('/')[0]}
            className="rounded-full border-2 border-dotted"
            width={100}
            height={100}
            priority
          />
          <span className="ml-2 font-bold text-lg">{repo.name}</span>
        </div>
        <p className="text-gray-400 mb-4">{repo.description}</p>
        <div className="flex items-center mb-4">
          <svg
            className="w-4 h-4 text-gray-600 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 19.51a13 13 0 01-14 0M12 2C6.48 2 2 6.48 2 12c0 5.13 3.8 9.39 8.7 10.19a1 1 0 001.3-1.28 10 10 0 001.74-2.59 1 1 0 00-1.53-1.24 8 8 0 01-1.34.97 1 1 0 00-.74.94v1.66a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 00-.29-.7A8 8 0 0112 14v-2a1 1 0 00-1-1 8 8 0 01-4.97-1.75 1 1 0 00-1.34 1.5A10 10 0 0012 20a10 10 0 007.33-3.25 1 1 0 00-.15-1.4 1 1 0 00-1.39.15A8 8 0 0112 18a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-1.66a1 1 0 00-1-1 10 10 0 001.74-2.59 1 1 0 00-.15-1.4 1 1 0 00-1.4-.15A13 13 0 0112 2zm0 0c1.9 0 3.68.33 5.34.92M12 6v6l3 3M12 6v6l-3 3"
            ></path>
          </svg>
          <span className="text-gray-600">{repo.stargazers_count}</span>
        </div>
        <div className="flex flex-wrap">
          {repo.topics.map((t, i) => (
            <span key={i} className="mr-2 mb-2 px-2 py-1 bg-gray-200 rounded-md text-gray-700 text-sm">
              {t}
            </span>
          ))}
        </div>
      </Link>
    </div>
  ))
}

const getCurrentClass = (index) => {
  if (index % 3 == 0) {
    return 'large';
  } else if (index % 2 === 0) {
    return 'medium';
  } else {
    return 'small';
  }
}

const URLList = ({ repos }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredRepos, setFilteredRepos] = useState(repos);

  // Debounce function to delay search execution
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Debounced search function
  const debouncedSearch = debounce((keyword) => {
    if (keyword.trim() !== '') {
      // Create a new instance of Fuse with your data and options
      const fuse = new Fuse(repos, {
        keys: ['name', 'description'], // Adjust these based on your data structure
        includeScore: true,
      });

      // Search the data
      const result = fuse.search(keyword);

      // Extract the items from the result
      const filteredItems = result.map((item) => item.item);

      setFilteredRepos(filteredItems);
    } else {
      setFilteredRepos(repos);
    }
  }, 600); // Adjust the delay as needed

  const showSearch = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    // Call debouncedSearch instead of immediate search
    debouncedSearch(keyword);
  };

  return (
    <div className="container mx-auto mt-8">
      <search>
        <input
          value={searchKeyword}
          type="text"
          placeholder='Search a language or keyword'
          className="p-2 my-2 outline outline-1 w-full"
          onChange={showSearch}
        />
      </search>
      <div className="masonary-container">
        {searchKeyword ? getAllCards(filteredRepos) : getAllCards(repos)}
      </div>
    </div>
  );
};

export default URLList;