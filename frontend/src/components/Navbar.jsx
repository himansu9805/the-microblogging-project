import Logo from "../assets/images/logo.png";

export const Navbar = () => {
  return (
    <nav className="py-8">
      <div className="flex flex-row items-center">
        <img src={Logo} alt="Logo" className="h-10 pr-5" />
        <div className="text-sm">
          The
          <br />
          Microblogging Project
        </div>
      </div>
      <div className="flex md:flex-row flex-col justify-end items-center">
        <Navitem value={"Home"} />
        <Navitem value={"About"} />
        <Navitem value={"Login"} />
      </div>
    </nav>
  );
};

const Navitem = (props) => {
  return <div className="md:pl-10">{props.value}</div>;
};
