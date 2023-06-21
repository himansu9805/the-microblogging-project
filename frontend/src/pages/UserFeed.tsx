import React from 'react';
import { UserContext } from '../context/UserContext';
import { UserContextType } from '../types/UserContext';

import '../assets/styles/feed.scss';
import { Stories } from '../components/Stories';
import { Feed } from '../components/Feed';
import { Sidebar } from '../components/Sidebar';

export const UserFeed: React.FC = () => {
  const userContext = React.useContext(UserContext) as UserContextType;
  const { user } = userContext;

  return (
  <div className='h-full flex flex-row justify-between items-start'>
    <Stories user={user} />
    <Feed />
    <Sidebar user={user} />
  </div>
  );
};
