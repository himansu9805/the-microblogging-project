import logo from '../assets/images/logo.png';

export const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen animate-pulse">
      <img
        src={logo}
        alt="The Microblogging Project"
        className="w-32 h-32 rounded-lg"
      />
      <div className="my-6"></div>
      <div className="text-2xl text-yellow-400">DID YOU KNOW?</div>
      <div className="md:w-1/2 text-2xl text-center">You can actually format your posts unlike other plaforms which even limit the amount to text you write!</div>
    </div>
  );
};
