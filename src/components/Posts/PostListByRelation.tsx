import React, { useEffect } from "react";
import { getRessourceByRelation } from "../../services/ressources.service";

let PostListRelation: React.FC = () => {
  let [postsFamille, setPostsFamille] = React.useState<any>();
  let [postsAmi, setPostsAmi] = React.useState<any>();
  let [postsConnaissance, setPostsConnaissance] = React.useState<any>();
  let [togglePostsFamille, setTogglePostsFamille] = React.useState<boolean>(false);
  let [togglePostsAmi, setTogglePostsAmi] = React.useState<boolean>(false);
  let [togglePostsConnaissance, setTogglePostsConnaissance] = React.useState<boolean>(false);

  useEffect(() => {
    handleGetPostsByRelationFamille();
    handleGetPostsByRelationAmi();
    handleGetPostsByRelationConnaissance();
  }, []);

  const handleTogglePostsFamille = () => {
    setTogglePostsFamille(!togglePostsFamille);
  };

  const handleTogglePostsAmi = () => {
    setTogglePostsAmi(!togglePostsAmi);
  };

  const handleTogglePostsConnaissance = () => {
    setTogglePostsConnaissance(!togglePostsConnaissance);
  };

  const handleGetPostsByRelationConnaissance = React.useCallback(async () => {
    try {
      const PostList = await getRessourceByRelation('connaissance');
      console.log(PostList);
      setPostsConnaissance(PostList);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleGetPostsByRelationAmi = React.useCallback(async () => {
    try {
      const PostList = await getRessourceByRelation('ami');
      console.log(PostList);
      setPostsAmi(PostList);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleGetPostsByRelationFamille = React.useCallback(async () => {
    try {
      const PostList = await getRessourceByRelation('famille');
      console.log(PostList);
      setPostsFamille(PostList);
    } catch (error) {
      console.error(error);
    }
  }, []);


  const renderPostList = (posts: any[]) => {
    if (posts.length === 0) {
        return (
            <div className="mt-3">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Pas de postes disponibles</span>
            </div>
          );
    }
    return (
      <>
        <div className="border-t border-gray-200">
          <div className="divide-y divide-gray-200">
            {posts && posts?.map((post: { id: React.Key | null | undefined; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; catalogue: { category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }[]; access: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
              <div key={post.id} className="px-4 py-3">
                <div className="flex items-center"></div>
                <div className="mt-3">
                  <p className="text-sm text-gray-700">{post.value}</p>
                </div>
                <div className="mt-3">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    {post.catalogue[0].category}
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    {post.access}
                  </span>
                </div>
                <div className="mt-3 flex justify-end">
                  <a
                    href={`post/${post.id}`}
                    className="text-sm text-indigo-600 hover:text-indigo-900"
                  >
                    Voir ce post
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
    </>
    );
  };


  return (
    <>
    <div className="border border-slate-500 rounded-md p-4 m-4">
    <div className="mt-3">
      <h2><b>Posts de vos connaissances :</b></h2>
    </div>
    <div className="mt-3 flex justify-end">
      <button className="text-sm text-indigo-600 hover:text-indigo-900" onClick={handleTogglePostsConnaissance}>Voir</button>
    </div>
    {togglePostsConnaissance && (
      <>
      {renderPostList(postsConnaissance)}
      </>
    )}
  </div>
  <div className="border border-slate-500 rounded-md p-4 m-4">
    <div className="mt-3">
      <h2><b>Posts de vos amis :</b></h2>
    </div>
    <div className="mt-3 flex justify-end">
      <button className="text-sm text-indigo-600 hover:text-indigo-900" onClick={handleTogglePostsAmi}>Voir</button>
    </div>
    {togglePostsAmi && (
    <>
      {renderPostList(postsAmi)}
    </>
    )}
  </div>
  <div className="border border-slate-500 rounded-md p-4 m-4">
    <div className="mt-3">
      <h2><b>Posts de votre famille :</b></h2>
    </div>
    <div className="mt-3 flex justify-end">
      <button className="text-sm text-indigo-600 hover:text-indigo-900" onClick={handleTogglePostsFamille}>Voir</button>
    </div>
    {togglePostsFamille && (
    <>
      {renderPostList(postsFamille)}
    </>
    )}
  </div>
  </>
  );
};


export default PostListRelation;
