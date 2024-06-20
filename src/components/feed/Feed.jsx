import React, { useState, useEffect } from 'react';
import Posts from '../posts/Posts'; // Ensure the correct path to the Posts component
import menuIcon from '../../assets/svg/menu.svg'; // Ensure the correct path to the menu icon SVG
import examplePost from "../../assets/example-post.png";
import imageBig from "../../assets/unknown-person.png";


const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating an API call with example posts
    const examplePosts = [
      {
        profilePicture: imageBig,
        userName: 'User1',
        timeSinceUpload: '2 hours ago',
        description: 'This is a post description',
        image: examplePost
      },
      {
        profilePicture: imageBig,
        userName: 'User1',
        timeSinceUpload: '2 hours ago',
        description: 'This is a post description',
        image: examplePost
      },
      {
        profilePicture: imageBig,
        userName: 'User1',
        timeSinceUpload: '2 hours ago',
        description: 'This is a post description',
        image: examplePost
      },
      {
        profilePicture: imageBig,
        userName: 'User1',
        timeSinceUpload: '2 hours ago',
        description: 'This is a post description',
        image: examplePost
      },
      {
        profilePicture: imageBig,
        userName: 'User1',
        timeSinceUpload: '2 hours ago',
        description: 'This is a post description',
        image: examplePost
      },
      {
        profilePicture: imageBig,
        userName: 'User1',
        timeSinceUpload: '2 hours ago',
        description: 'This is a post description',
        image: examplePost
      },
      {
        profilePicture: 'https://example.com/profile2.jpg',
        userName: 'User2',
        timeSinceUpload: '1 day ago',
        description: 'Another post description',
        image: null
      },
      // more posts...
    ];
  

    // Simulating a delay to fetch data
    setTimeout(() => {
      setPosts(examplePosts);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="w-full h-full bg-personal-bg md:bg-personal-bg-one">
      <div className="flex items-center p-4">
        <button className="p-2 bg-primary rounded-2">
          <img src={menuIcon} alt="Menu" className="h-6 w-6" />
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="ml-1 flex-1 p-2 rounded-2 bg-[rgba(107,107,107,0.21)]  text-white"
        />
      </div>
      {loading ? (
        <div className="text-white text-center mt-3">Loading...</div>
      ) : (
        <Posts posts={posts} backgroundColor={"bg-personal-bg"} />
      )}
    </div>
  );
};

export default Feed;
