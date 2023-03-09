import { getCurrentUser, logout } from "../services/auth.service";
import Button from "./Button";
import { BiLogOut } from "react-icons/bi";

function Navbar() {
  return (
    <div className="navbar flex h-14 bg-gray-300">
      <img src="kmp_logo.png" className="App-logo w-1/6" alt="kmp logo" />
      <div className="flex w-5/6 justify-evenly items-center">
        <Button value="Accueil" name="Home"/>
        {!getCurrentUser() && (
          <>
            <Button value="Se connecter" name="Login" />
            <Button value="Créer un compte" name="Register" />
          </>
        )}
        {getCurrentUser() && (
          <>
            <Button value="Comptes" name="Search" />
            <Button value="Posts" name="Post" />
            <Button value="Catégories" name="Catalogue" />
            <Button value="Mon Compte" name="Account" />
            <div className="flex items-center">
            <div className="flex items-center justify-center rounded-md w-8 h-8 bg-white text-gray-600 mr-2">
              <BiLogOut/>
            </div>
            <a onClick={logout} href="/" className="text-gray-800 font-medium text-lg lg:block hidden">Déconnexion</a>          
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
