import React from 'react';
import threeDotIcon from '../../assets/svg/three-dot.svg'; // Ensure correct path
import heartIcon from '../../assets/svg/heart.svg';
import likeIcon from '../../assets/svg/like.svg';
import commentIcon from '../../assets/svg/message.svg';
import tipsIcon from '../../assets/svg/tips.svg';
import shareIcon from '../../assets/svg/share.svg';

const Posts = ({ posts, backgroundColor }) => {
  const background = backgroundColor;

  return (
    <div className={`${background} w-full mt-4 px-4`}>
      {posts.map((post, index) => (
        <div key={index} className="bg-[rgba(107,107,107,0.21)] rounded-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[11.6px] p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img
                src={post.profilePicture}
                alt={`${post.userName}'s profile`}
                className="h-10 w-10 rounded-full mr-2"
              />
              <div>
                <h3 className="text-4 font-bold text-white">{post.userName}</h3>
                <p className="text-3 text-white">{post.timeSinceUpload}</p>
              </div>
            </div>
            <button className="bg-primary p-2 rounded-full">
              <img src={threeDotIcon} alt="Menu" className="h-4 w-4" />
            </button>
          </div>
          {post.description && <p className="mb-2 text-white">{post.description}</p>}
          {post.image && <img src={post.image} alt="Post content" className="rounded-3 mb-2" />}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <img src={likeIcon} alt="Likes" className="h-4 w-4 mr-1" />
              <span className="text-white">{post.likes} likes</span>
            </div>
            <span className="text-gray-500">{post.comments} comments</span>
          </div>
          <hr className="border-gray-500 mb-2" />
          <div className="flex justify-between w-full">
            <button className="flex items-center text-white">
              <img src={heartIcon} alt="Like" className="h-4 w-4 mr-1" />
              Like
            </button>
            <button className="flex items-center text-white">
              <img src={commentIcon} alt="Comment" className="h-4 w-4 mr-1" />
              Comment
            </button>
            <button className="flex items-center text-white">
              <img src={tipsIcon} alt="Tips" className="h-4 w-4 mr-1" />
              Tips
            </button>
            <button className="flex items-center text-white">
              <img src={shareIcon} alt="Share" className="h-4 w-4 mr-1" />
              Share
            </button>
          </div>
        </div>
      ))}
      <div className='h-14'></div>
    </div>
  );
};

export default Posts;
