import { getActivityByCatalogueId, getActivityByRessourceId, getLikedByUserId, getSharedByUserId, getUserActivity, getUserBlocked, getUserLike, getUserShare, getUserViews } from "../services/activity.service";

const handleGetUserActivity = () => {
  getUserActivity();
};

const handleGetSharedByUserId = () => {
  getSharedByUserId(7);
};

const handleGetLikedByUserId = () => {
  getLikedByUserId(7);
};

const handleGetUserViews = () => {
  getUserViews();
};

const handleGetUserShare = () => {
  getUserShare();
};

const handleGetUserLike = () => {
  getUserLike();
};

const handleGetUserBlocked = () => {
  getUserBlocked();
};

const handleGetActivityByRessourceId = () => {
  getActivityByRessourceId(8);
};

const handleGetActivityByCatalogueId = () => {
  getActivityByCatalogueId(6);
};

function TestActivityRequests() {
  return (
    <>
    <h1>Tests theses</h1>
    <button onClick={handleGetUserActivity}>Get User Activity</button><br/>
    <button onClick={handleGetSharedByUserId}>Get Shared By User Id</button><br/>
    <button onClick={handleGetLikedByUserId}>Get Liked By User Id</button><br/>
    <button onClick={handleGetUserViews}>Get User Views</button><br/>
    <button onClick={handleGetUserShare}>Get User Share</button><br/>
    <button onClick={handleGetUserLike}>Get User Like</button><br/>
    <button onClick={handleGetUserBlocked}>Get User Blocked</button><br/>
    <button onClick={handleGetActivityByRessourceId}>Get Activity By Ressource Id</button><br/>
    <button onClick={handleGetActivityByCatalogueId}>Get Activity By Catalogue Id</button>
    </>
  );
}

export default TestActivityRequests;
