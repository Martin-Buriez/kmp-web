import React, { useEffect } from "react";
import { getCatalogueById } from "../../services/catalogues.service";
import { getRessourceById } from "../../services/ressources.service";
import CatalogueType from "../../types/catalogue.type";
import Navbar from "../Navbar";

let Catalogue: React.FC = () => {

    let [catalogueById, setCatalogueById] = React.useState<CatalogueType>({} as CatalogueType);

    let url = window.location.pathname;
    let catalogueId = parseInt(url.substring(url.lastIndexOf('/') + 1));

    useEffect(()=> {
      handleGetCatalogueById();
    }, []);

    const handleGetCatalogueById = React.useCallback(async () => {
      setCatalogueById(await getCatalogueById(catalogueId));
      console.log(getRessourceById(catalogueId))
    }, []);

    const { id, category} = catalogueById;

    return (
      <>
        <Navbar />
        <div className="container">
          <p>
            <strong>id:</strong> {id? id : "Not available"}
          </p>
          <p>
            <strong>category:</strong> {category? category : "Not available"}
          </p>
        </div>
      </>
    );
};
export default Catalogue;