import AccountIcon from './accounticon';
import PostContent from './postcontent';

function Post() {
  return (
    <div className="post">
        <AccountIcon username='Mustafa'/>
        <PostContent text='Hello world'/>
    </div>
  );
}

export default Post;
