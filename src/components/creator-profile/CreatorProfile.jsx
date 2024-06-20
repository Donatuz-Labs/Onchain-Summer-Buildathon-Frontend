import React, { useState, useEffect } from "react";
import {
	Link,
	useParams,
	useNavigate,
} from "react-router-dom";
import {
	editUser,
	getUserByUsername,
} from "../../actions/profile";
import StandardButton from "../shared/StandardButton";
import TextInput from "../shared/TextInput";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import imageBig from "../../assets/unknown-person.png";
import ChevronRight from "../../assets/svg/chevron-right.svg";

import creatorProfileCover from "../../assets/creator-profile-cover.png";
import addFollower from "../../assets/addFollower.png";
import alert from "../../assets/alert.png";
import message from "../../assets/message.png";
import Posts from '../posts/Posts'; 
import Media from '../media/Media'; 
import Collection from '../collection/Collection'; 
import examplePost from "../../assets/example-post.png";
import exampleMedia1 from "../../assets/media-example1.png";
import exampleMedia2 from "../../assets/media-example2.png";
import exampleCollection from "../../assets/example-collection.png";
import exampleCollection2 from "../../assets/example-collection2.png";



const CreatorProfile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	
	const currentUserId = useSelector(
		(state) => state.profile.id
	);


	const handleUsernameChange = (value) => {
		dispatch(getUserByUsername(value));
		setUserName(value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			dispatch(
				editUser(currentUserId, {
					userName,
					fullName,
					dob,
					selectedCountry,
				})
			);
		} catch (error) {
			// setErrorMessage(error.message);
		}
	};

	const [activeTab, setActiveTab] = useState('posts');
	const [isSubscribed, setIsSubscribed] = useState(false);
	const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  const handleSubscribeClick = () => {
    setIsSubscribed(!isSubscribed);
  };

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

	const exampleCollections = [
		{
			image: exampleCollection,
			title: 'Collection Title 1',
			subtitle: 'Subtitle 1',
		},
		{
			image: exampleCollection2,
			title: 'Collection Title 2',
			subtitle: 'Subtitle 2',
		},
		// more collections...
	];

	const exampleMedia = [
    { type: 'image', src: exampleMedia1 },
    { type: 'image', src: exampleMedia2 },
    { type: 'image', src: examplePost },
		{ type: 'image', src: exampleMedia1 },
    { type: 'image', src: exampleMedia2 },
    { type: 'image', src: examplePost },
		{ type: 'image', src: exampleMedia1 },
    { type: 'image', src: exampleMedia2 },
    { type: 'image', src: examplePost },
		{ type: 'image', src: exampleMedia1 },
    { type: 'image', src: exampleMedia2 },
    { type: 'image', src: examplePost },
    // more media...
  ];
	

	return (
		<div className="w-full h-full bg-personal-bg md:bg-personal-bg-one">
			<div className="flex justify-center items-center">
				<div className="relative flex flex-col items-center w-full md:w-120 md:rounded-2">
					<img
						className="flex h-50 w-full justify-center top-0"
						src={creatorProfileCover}
						alt="creatorProfileCover"
					/>
					<div className="relative w-10/12 h-auto bg-[rgba(107,107,107,0.21)] rounded-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[11.6px] mt-[-3rem] px-2 py-4">
						<div className="flex flex-col justify-center items-center text-center">
							<img
								className="absolute top-[-50px] h-24 w-24 rounded-full border-2 border-white"
								src={imageBig}
								alt="Welcome"
								onClick={() => navigate("/select-photo")}
							/>
							<div className="mt-12">
								<h1 className="font-bold text-5 md:text-7 text-center text-white leading-natural -tracking-0-6 w-full">
									Abraham
								</h1>
								<h2 className="font-medium text-4 md:text-6 text-center text-white leading-natural -tracking-0-6 w-full">
									@username
								</h2>
							</div>
							<div className="flex justify-around w-full mt-4">
								<div className="flex flex-col items-center">
									<span className="text-white text-center font-bold text-4">123</span>
									<span className="text-white text-center text-2">Posts</span>
								</div>
								<div className="flex flex-col items-center ml-3">
									<span className="text-white text-center font-bold text-4">456</span>
									<span className="text-white text-center text-2">Subscribers</span>
								</div>
								<div className="flex flex-col items-center">
									<span className="text-white text-center font-bold text-4">789</span>
									<span className="text-white text-center text-2">Followers</span>
								</div>
							</div>
							<div className="flex justify-around w-full mt-4">
								<button onClick={handleFollowClick} className="bg-gray-500 text-white py-2 px-3 rounded flex items-center text-3">
									<img src={addFollower} alt="Follow" className="h-4 w-4 mr-2" />
									{isFollowing ? 'Unfollow' : 'Follow'}
								</button>
								<button className="bg-gray-500 text-white py-2 px-3 rounded flex items-center text-3">
									<img src={message} alt="Message" className="h-4 w-4 mr-2" />
									Message
								</button>
								<button
                  className={`py-2 px-3 rounded flex items-center text-3 text-white ${isSubscribed ? 'bg-gray-500' : 'bg-primary'}`}
                  onClick={handleSubscribeClick}
                >
                  <img src={alert} alt="Subscribe" className="h-4 w-4 mr-2" />
                  {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                </button>
							</div>
							<div className="mt-2 text-white text-center px-4">
								<p>Important to be nice </p>
							</div>
						</div>
					</div>
					<div className="w-11/12 mt-4 bg-gray-500 text-white rounded-3 flex justify-around p-1">
            <button
              className={`w-full py-2 px-4 rounded-3 ${activeTab === 'posts' ? 'bg-white text-primary' : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              Posts
            </button>
            <button
              className={`w-full py-2 px-4 rounded-3 ${activeTab === 'media' ? 'bg-white text-primary' : ''}`}
              onClick={() => setActiveTab('media')}
            >
              Media
            </button>
            <button
              className={`w-full py-2 px-4 rounded-3 ${activeTab === 'collection' ? 'bg-white text-primary' : ''}`}
              onClick={() => setActiveTab('collection')}
            >
              Collection
            </button>
          </div>
					{!isSubscribed && (
            <div className="w-10/12 mt-4 bg-[rgba(107,107,107,0.21)] text-white rounded-3 p-4 text-center">
              <h3 className="font-bold text-4-5">Subscribe To Unlock</h3>
              <p className="mt-2 text-3-5">Still, You don't have subscribed, please subscribe so that you can see posts</p>
            </div>
          )}
          {activeTab === 'posts' && isSubscribed && <Posts posts={examplePosts} backgroundColor={"bg-personal-reverse"}/>}
					{activeTab === 'media' && isSubscribed && <Media media={exampleMedia} />}
					{activeTab === 'collection' && isSubscribed && <Collection collections={exampleCollections} />}
				</div>
			</div>
		</div>
	);
	
	
	
	
};

export default CreatorProfile;
