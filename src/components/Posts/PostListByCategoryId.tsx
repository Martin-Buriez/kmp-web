import React, { useEffect } from "react";
import { getRessourceByCategoryId } from "../../services/ressources.service";
import PostListType from "../../types/post.type";

let PostListByCatalogueId: React.FC = () => {

  let [posts, setPosts] = React.useState<any>();

  useEffect(()=> {
    handleGetPostsByCategoryId();
  }, []);

  let url = window.location.pathname;
  let catalogueId = parseInt(url.substring(url.lastIndexOf('/') + 1));

  const handleGetPostsByCategoryId = React.useCallback(async () => {
    try {
        setPosts(await getRessourceByCategoryId(catalogueId))
        console.log(posts);
    } catch (error) {
        console.error(error);
    }
  }, []);
  return (
    <>
      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {posts.map((post: { id: React.Key | null | undefined; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; access: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{post.value}</div>
                <div className="text-gray-700 text-base">{post.access}</div>
                <div className="mt-4">
                  <a href={`/post/${post.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Voir le post
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Pas de posts trouvés pour cette catégorie</div>
      )}    
    </>
  );
};

export default PostListByCatalogueId;