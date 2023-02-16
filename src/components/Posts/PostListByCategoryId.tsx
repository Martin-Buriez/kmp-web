import React, { useEffect } from "react";
import { getRessourceByCategoryId } from "../../services/ressources.service";
import PostListType from "../../types/post.type";
import Navbar from "../Navbar";

let PostListByCatalogueId: React.FC = () => {

  let [posts, setPosts] = React.useState<PostListType>();

  useEffect(()=> {
    handleGetPostsByCategoryId();
  }, []);

  let url = window.location.pathname;
  let catalogueId = parseInt(url.substring(url.lastIndexOf('/') + 1));

  const handleGetPostsByCategoryId = React.useCallback(async () => {
    try {
        setPosts(await getRessourceByCategoryId(catalogueId))
    } catch (error) {
        console.error(error);
    }
  }, []);
  return (
    <>
      {posts && posts.content && posts.content.length > 0 ? (
          <table className="border-collapse border border-slate-500">
            <thead>
                <tr>
                    <th className="border border-slate-600">Id</th>
                    <th className="border border-slate-600">Value</th>
                    <th className="border border-slate-600">Catalogue</th>
                    <th className="border border-slate-600">Accès</th>
                </tr>
            </thead>
            <tbody>
                {posts && posts.content.map(post =>
                  <tr key={post.id}>
                        <td className="border border-slate-700"><a href={`post/${post.id}`}>{post.id}</a></td>
                        <td className="border border-slate-700">{post.value}</td>
                        <td className="border border-slate-700">{post.catalogue[0].category}</td>
                        <td className="border border-slate-700">{post.access}</td>
                  </tr>
              )}
            </tbody>
          </table>
      ) : (
        <div>No posts found</div>
      )}    
    </>
  );
};

export default PostListByCatalogueId;