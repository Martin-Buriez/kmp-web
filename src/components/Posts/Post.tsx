import AccountIcon from "../Account/AccountIcon";
import PostContent from "./PostContent";

function Post() {
  return (
    <div className="post">
        <AccountIcon username='Mustafa'/>
        <PostContent text='Hello world'/>
    </div>
  );
}

export default Post;
