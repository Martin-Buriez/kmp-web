import React, { useEffect } from "react";
import { getAllCatalogues } from "../../services/catalogues.service";
import CatalogueType from "../../types/catalogue.type";
import PostListType from "../../types/catalogue.type";
import Navbar from "../Navbar";

let PostList: React.FC = () => {

  let [catalogues, setPosts] = React.useState<CatalogueType[]>([]);

  useEffect(()=> {
    handleGetPosts();
  }, []);

  const handleGetPosts = React.useCallback(async () => {
    try {
        setPosts(await getAllCatalogues())
    } catch (error) {
        console.error(error);
    }
  }, []);
  return (
    <>
      <Navbar/>
      <table className="border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th className="border border-slate-600">Id</th>
                        <th className="border border-slate-600">Categorie</th>
                    </tr>
                </thead>
                <tbody>
                    {catalogues && catalogues.map(catalogue =>
                      <tr key={catalogue.id}>
                            <td className="border border-slate-700"><a href={`catalogue/${catalogue.id}`}>{catalogue.id}</a></td>
                            <td className="border border-slate-700">{catalogue.category}</td>
                      </tr>
                  )}
                </tbody>
            </table>
    </>
  );
};
  
export default PostList;