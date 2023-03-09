import { getCurrentUser } from "../services/auth.service";
import PostList from "./Posts/PostList";

function Home() {
  return (
    <>
    {!getCurrentUser() && (
      <>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold mb-6">Veuillez vous connecter pour accéder à cette page</h1>
          </div>
        </div>
      </>
    )}
    {getCurrentUser() && (
    <div className="home">
        <PostList />
    </div>
    )}
    </>
  );
}

export default Home;
