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
}; 

function logoName({ name }: ButtonProps){
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

function Button({ name }: ButtonProps) {
  return (
    <div className={`button${name} align-center`}>        
        {logoName({name})}
        <Link to={`/${(name === "Home") ? "" : name}`} className={`${name}_button`}>{name}</Link>
    </div>
  );
}

export default Button;
