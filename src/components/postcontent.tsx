type PostProps = {
  text: string;
}; 

function postContent({ text }: PostProps) {
    return (
      <div className="postContent">
        <p>{text}</p>
      </div>
    );
  }
  
  export default postContent;