import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons';
import { UserContext } from '../context/UserContext';
import { Editor } from '../components/TextEditor';
import { UserContextType } from '../types/UserContext';

export const Feed: React.FC = () => {
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
    <div className='w-8/12'>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full border-x-2 border-gray-600">
          <div className="border-b-2 border-gray-600 mb-4 p-4 py-8">
            <div className="flex items-center">
              <img
                src={user?.avatar ?? 'https://i.pravatar.cc/300'}
                alt={user?.name ?? 'User'}
                className="w-16 h-16 rounded-full"
              />
              <div className="ml-4 flex flex-col">
                <h1 className="feed-heading text-3xl">Welcome {user?.name ?? 'User'}</h1>
                <h2 className="font-light text-gray-400">@{user?.username ?? 'user'}</h2>
              </div>
            </div>
          </div>
          <div className="w-full border-b-2 border-gray-600">
            <Editor />
          </div>
          <div className="w-full">
            {DummyPosts.map((post, index) => (
              <div key={index} className="w-full shadow-lg pt-8 pb-4 px-4 border-b-2 border-gray-600">
                {post.posts.map((postData, postIndex) => (
                  <div key={postIndex} className="flex items-start my-1">
                    <img
                      src={post.profile.avatar}
                      alt={post.profile.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h1 className="feed-heading text-lg font-medium">{post.profile.name}</h1>
                        <h2 className="font-light text-gray-400 ml-2">
                          @{post.profile.username} • {new Date(post.postedAt).toLocaleDateString('en-in', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        }).replace(',', ' ')}
                        </h2>
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
    </div>
  );
};
