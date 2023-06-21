import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../types/User';
import { faBell, faHouse, faMessage, faUser, faBlog } from '@fortawesome/free-solid-svg-icons';
import { faBell as faBellOutline, faMessage as faMessageOutline, faUser as faUserOutline } from '@fortawesome/free-regular-svg-icons';

import logo from '../assets/images/logo.png';

interface SidebarProps {
  user: User | null;
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <div className="w-3/12 flex flex-col justify-between h-screen items-center">
      <div className='fixed'>
        <div className="flex flex-col justify-between h-screen items-start">
          <div className="md:flex flex-col justify-center items-start space-y-8">
            <div className='flex flex-row justify-start items-center text-2xl my-8'>
              <img
                src={logo}
                alt="The Microblogging Project"
                className="w-10 h-10 rounded-lg"
              />
            </div>
            <div className='flex flex-row justify-start items-center text-2xl'>
              <FontAwesomeIcon icon={faHouse} />
              <div className='ml-6'></div>
              <span>Home</span>
            </div>
            <div className='flex flex-row justify-start items-center text-2xl'>
              <FontAwesomeIcon icon={faBellOutline} />
              <div className='ml-6'></div>
              <span>Notifications</span>
            </div>
            <div className='flex flex-row justify-start items-center text-2xl'>
              <FontAwesomeIcon icon={faMessageOutline} />
              <div className='ml-6'></div>
              <span>Messages</span>
            </div>
            <div className='flex flex-row justify-start items-center text-2xl'>
              <FontAwesomeIcon icon={faUserOutline} />
              <div className='ml-6'></div>
              <span>Profile</span>
            </div>
          </div>
          <div className='flex flex-row justify-start items-center text-2xl my-8'>
            <button className="feed-post-button font-bold text-2xl w-full py-4 text-center rounded-full">
              <span className='ml-3'>Post a microblog</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};