import React from "react";
import { postRessource } from "../../services/ressources.service";
import Navbar from "../Navbar";

let CreateNewPost: React.FC = () => {;

    const [catalogId, setCatalogId] = React.useState<number>();
    const [access, setAccess] = React.useState<string>();
    const [content, setContent] = React.useState<string>();

    const handlepostCreateNewPosts = React.useCallback(async () => {
        if(event){
            console.log('event.preventDefault()')
            event.preventDefault();
        }
        console.log(catalogId, access, content)
        if(catalogId && access && content){
            console.log(await postRessource(catalogId, access, content))
            await postRessource(catalogId, access, content);
            console.log('done !');
        } else {
          console.log('required fields are empty')
        }
    }, []);

    return (
    <>
        <Navbar />
        <form>
            <label>
                catalogId:
                <input type="number" name="catalogId" value={catalogId} onChange={e => setCatalogId(e.target.value as unknown as number)}/>
            </label>
            <label>
                access:
                <input type="text" name="access" value={access} onChange={e => setAccess(e.target.value)}/>
            </label>
            <label>
                content:
                <input type="text" name="content" value={content} onChange={e => setContent(e.target.value)}/>
            </label>
            <input type="submit" value="Submit" onClick={handlepostCreateNewPosts}/>
        </form>
    </>
  );
};

export default CreateNewPost;