import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from '../types/User';
import { faBell, faHouse, faMessage, faUser, faBlog, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faBell as faBellOutline, faMessage as faMessageOutline, faUser as faUserOutline } from '@fortawesome/free-regular-svg-icons';

import logo from '../assets/images/logo.png';

interface StoriesProps {
  user: User | null;
}

export const Stories: React.FC<StoriesProps> = (props) => {
  return (
    <div className='w-1/12 flex flex-col justify-center h-screen items-center'>
      <div className='fixed'>
        <div className="flex flex-col justify-center h-screen items-center">
          <div className="md:flex flex-col justify-center items-center space-y-8">
            <div className='h-16 w-16 rounded-full border-success border-2 flex flex-row justify-center items-center'>
              <FontAwesomeIcon icon={faPlus} className='text-2xl text-success' />
            </div>
            {Array.from(Array(5).keys()).map((i) => (
              <div className='h-16 w-16 rounded-full border-success border-2 flex flex-row justify-center items-center'>
                <img
                  src={'https://i.pravatar.cc/300'}
                  alt={'User'}
                  className="w-14 h-14 rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};