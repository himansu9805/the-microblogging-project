import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { UserContext } from '../context/UserContext';
import { Editor } from '../components/TextEditor';
import { UserContextType } from '../types/UserContext';

export const UserFeed: React.FC = () => {
  const userContext = React.useContext(UserContext) as UserContextType;
  const { user } = userContext;

  const DummyPosts = [
    {
      posts: [
        'Lorem ipsum dolor sit amet consecte tur adipiscing elit. Nullam a nisl ut ante blandit hendrerit. Fusce auctor, nisl eget imperdiet aliquet, nisl arcu dignissim dolor, sit amet aliquam nunc nisl quis nunc. ',
        'Lorem ipsum dolor sit amet consecte tur adipiscing elit. Nullam a nisl ut ante blandit hendrerit. Fusce auctor, nisl eget imperdiet aliquet, nisl arcu dignissim dolor, sit amet aliquam nunc nisl quis nunc. ',
      ],
      profile: {
        name: 'John Doe',
        username: 'johndoe',
        avatar: 'https://i.pravatar.cc/300',
      },
      postedAt: '2021-01-01T00:00:00.000Z',
    },
    {
      posts: [
        'Lorem ipsum dolor sit amet consecte tur adipiscing elit. Nullam a nisl ut ante blandit hendrerit. Fusce auctor, nisl eget imperdiet aliquet, nisl arcu dignissim dolor, sit amet aliquam nunc nisl quis nunc. ',
      ],
      profile: {
        name: 'John Doe',
        username: 'johndoe',
        avatar: 'https://i.pravatar.cc/300',
      },
      postedAt: '2021-01-01T00:00:00.000Z',
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-2xl border-x">
        <div className="border-b mb-4 p-4 py-8">
          <h1 className="text-3xl">Welcome {user!.name}</h1>
        </div>
        <div className="w-full border-b">
          <Editor />
        </div>
        <div className="w-full">
          {DummyPosts.map((post, index) => (
            <div key={index} className="w-full shadow-lg py-8 px-4 border-b">
              {post.posts.map((postData, postIndex) => (
                <div key={postIndex} className="flex items-start my-1">
                  <img
                    src={post.profile.avatar}
                    alt={post.profile.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h1 className="text-xl">{post.profile.name}</h1>
                      <h2 className="font-light text-gray-400 ml-2">
                        @{post.profile.username}
                      </h2>
                      <div className="text-gray-400 text-sm ml-2">
                        {post.postedAt}
                      </div>
                    </div>
                    <p>{postData}</p>
                    <div className="ml-auto flex items-center space-x-8 my-4">
                      <FontAwesomeIcon
                        className="text-xl cursor-pointer hover:text-green-600 transition-all duration-150"
                        icon={faComment}
                      />
                      <FontAwesomeIcon
                        className="text-xl cursor-pointer hover:text-pink-600 transition-all duration-150"
                        icon={faHeart}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
