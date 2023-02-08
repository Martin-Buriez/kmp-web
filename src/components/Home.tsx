import Navbar from "./Navbar";
import PostList from "./Posts/PostList";

function Home() {
  return (
    <div className="home">
        <Navbar />
        <PostList />
    </div>
  );
}

export default Home;
