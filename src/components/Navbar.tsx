import { getCurrentUser, logout } from "../services/auth.service";
import Button from "./Button";

function Navbar() {
  return (
    <div className="navbar flex h-14 bg-gray-300">
      <img src="kmp_logo.png" className="App-logo w-1/6" alt="kmp logo" />
      <div className="flex w-5/6 justify-evenly items-center">
        <Button value="Accueil" name="Home" />
        <Button value="Mon Compte" name="Account" />
        <Button value="Comptes" name="Search" />
        <Button value="Posts" name="Post" />
        <Button value="Catégories" name="Catalogue" />
        {!getCurrentUser() && (
          <>
            <Button value="Se connecter" name="Login" />
            <Button value="Créer un compte" name="Register" />
          </>
        )}
        {getCurrentUser() && (
            <a onClick={logout} href="/">Déconnexion</a>
        )}
      </div>
    </div>
  );
}

export default Navbar;
