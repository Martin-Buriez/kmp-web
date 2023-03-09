import React, { useEffect } from "react";
import { getAllCatalogues } from "../../services/catalogues.service";
import CatalogueType from "../../types/catalogue.type";
import CreateNewCatalogue from "./CreateNewCatalogue";

let PostList: React.FC = () => {

  let [catalogues, setCatalogues] = React.useState<CatalogueType[]>([]);

  useEffect(()=> {
    handleGetPosts();
  }, []);

  const handleGetPosts = React.useCallback(async () => {
    try {
      setCatalogues(await getAllCatalogues())
    } catch (error) {
        console.error(error);
    }
  }, []);

  return (
    <>
      <div className="border border-slate-500 rounded-md p-4 m-4">
        <h2 className="text-lg font-medium text-slate-900 mb-2">Catalogues</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {catalogues &&
            catalogues.map((catalogue) => (
              <div key={catalogue.id} className="border border-slate-600 rounded-md p-4">
                <h3 className="text-md font-medium text-slate-900 mb-2">{catalogue.category}</h3>
                <a href={`catalogue/${catalogue.id}`} className="text-blue-600 hover:underline">
                  Voir Catalogue
                </a>
              </div>
            ))}
        </div>
        <CreateNewCatalogue />
      </div>
    </>
  );
};  
  
export default PostList;