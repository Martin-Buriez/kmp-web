import { logout } from "../services/auth.service";
import Button from "./Button";

function Navbar() {
  return (
    <div className="navbar flex h-14 bg-gray-300">
        <img src="kmp_logo.png" className="App-logo w-1/6" alt="kmp logo" />
        <div className="flex w-5/6 justify-evenly items-center" >
          <Button name="Home" />
          <Button name="Account" />
          <Button name="Search" />
          <Button name="Login" />
          <Button name="Register" />
          <Button name="Post" />
          <a onClick={logout} href="/">Logout</a>
        </div>
    </div>
  );
}

export default Navbar;
