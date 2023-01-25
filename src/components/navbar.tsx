import Button from "./Button";

function Navbar() {
  return (
    <div className="navbar">
        <img src=".../public/KMP.png" className="App-logo" alt="kmp logo" />
        <div>
          <Button name="Account" />
          <Button name="Search" />
        </div>
    </div>
  );
}

export default Navbar;
