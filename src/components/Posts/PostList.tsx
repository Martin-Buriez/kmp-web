import React, { useEffect } from "react";
import { getAllRessources } from "../../services/ressources.service";
import PostListType from "../../types/post.type";
import Navbar from "../Navbar";

let PostList: React.FC = () => {

  let [posts, setPosts] = React.useState<PostListType>();

  useEffect(()=> {
    handleGetPosts();
  }, []);

  const handleGetPosts = React.useCallback(async () => {
    try {
        setPosts(await getAllRessources())
    } catch (error) {
        console.error(error);
    }
  }, []);
  return (
    <>
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
                            <td className="border border-slate-700"><a href={`posts/${post.id}`}>{post.id}</a></td>
                            <td className="border border-slate-700">{post.value}</td>
                            <td className="border border-slate-700">{post.id}</td>
                            <td className="border border-slate-700">{post.access}</td>
                      </tr>
                  )}
                </tbody>
            </table>
    </>
  );
};

export default PostList;