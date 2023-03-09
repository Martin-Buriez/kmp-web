import React, { useEffect } from "react";
import { getAllRessources } from "../../services/ressources.service";
import PostListType from "../../types/post.type";
import CreateNewPost from "./CreateNewPost";

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
      <div className="border border-slate-500 rounded-md p-4 m-4">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Posts
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <div className="divide-y divide-gray-200">
          {posts && posts.content?.map((post) => (
              <div key={post.id} className="px-4 py-3">
                <div className="flex items-center">
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-700">{post.value}</p>
                </div>
                <div className="mt-3">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{post.catalogue[0].category}</span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{post.access}</span>
                </div>
                <div className="mt-3 flex justify-end">
                  <a href={`post/${post.id}`} className="text-sm text-indigo-600 hover:text-indigo-900">Voir ce post</a>
                </div>
              </div>
           ))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <CreateNewPost/>
      </div>
    </>
  );
  
  
};

export default PostList;