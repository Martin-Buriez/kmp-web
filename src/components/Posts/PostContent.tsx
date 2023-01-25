type PostProps = {
  text: string;
}; 

function PostContent({ text }: PostProps) {
    return (
      <div className="postContent">
        <p>{text}</p>
      </div>
    );
  }
  
  export default PostContent;