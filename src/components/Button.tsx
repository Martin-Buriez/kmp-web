import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { IoMdCreate } from "react-icons/io";
import { AiOutlineSearch, AiFillHome } from "react-icons/ai";
import { BsQuestionDiamond } from "react-icons/bs";
import { MdAccountBox } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { GrCatalog } from "react-icons/gr";

type ButtonProps = {
  name: string;
  value: string;
}; 

type LogoProps = {
  name: string;
}

function logoName({ name }: LogoProps){
  switch(name){
    case "Login":
      return <BiLogIn />;
    case "Register":
      return <IoMdCreate />;
    case "Search":
      return <AiOutlineSearch />;
    case "Account":
      return <MdAccountBox />;
    case "Home":
      return <AiFillHome />;
    case "Post":
      return <IoCreateOutline/>;
    case "Catalogue":
      return <GrCatalog/>;
    default:
      return <BsQuestionDiamond />;
  }
}

function Button({ name, value }: ButtonProps) {
  return (
    <div className="flex items-center">
      <Link to={`/${(name === "Home") ? "" : name}`}>
        <div className="flex items-center justify-center rounded-md w-8 h-8 bg-white text-gray-600 mr-2">
          {logoName({name})}
        </div>
      </Link>
      <Link to={`/${(name === "Home") ? "" : name}`} className="text-gray-800 font-medium text-lg lg:block hidden">{value}</Link>
    </div>
  );
}

export default Button;
