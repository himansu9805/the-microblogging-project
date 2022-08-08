import "./styles.scss";

export const Navbar = () => {
    return (
        <div className={"nav-bar"}>
            <Navitem value={"Home"} />
            <Navitem value={"About"} />
            <Navitem value={"Login"} />
        </div>
    );
}

const Navitem = (props) => {
    return (
        <div className={"nav-item"}>{props.value}</div>
    );
}