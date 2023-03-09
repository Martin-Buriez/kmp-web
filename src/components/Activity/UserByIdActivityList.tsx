import React, { useEffect, useState } from "react";
import { getLikedByUserId, getSharedByUserId, getUserActivity } from "../../services/activity.service";
import { getRessourceByUserId } from "../../services/ressources.service";
import { UserActivity } from "../../types/activity.type";
import PostListType from "../../types/post.type";

const UserByIdActivityList: React.FC = () => {
  const [likedActivities, setLikedActivities] = useState<UserActivity[]>([]);
  const [sharedActivities, setSharedActivities] = useState<UserActivity[]>([]);
  const [createdActivities, setCreatedActivities] = useState<any[]>([]);
  const [toggleLikedActivities, setToggleLikedActivities] = useState<boolean>(false);
  const [toggleSharedActivities, setToggleSharedActivities] = useState<boolean>(false);
  const [toggleCreatedActivities, setToggleCreatedActivities] = useState<boolean>(false);

  const url = window.location.pathname;
  const userId = parseInt(url.substring(url.lastIndexOf("/") + 1));

  const handleToggleLikedActivities = () => {
    setToggleLikedActivities(!toggleLikedActivities);
  };

  const handleToggleSharedActivities = () => {
    setToggleSharedActivities(!toggleSharedActivities);
  };

  const handleToggleCreatedActivities = () => {
    setToggleCreatedActivities(!toggleCreatedActivities);
  };


  useEffect(() => {
    handleGetUserLike();
    handleGetUserShare();
    handleGetUserCreate();
  }, []);

  const handleGetUserLike = async () => {
    try {
      const activities = await getLikedByUserId(userId);
      setLikedActivities(activities);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetUserShare = async () => {
    try {
      const activities = await getSharedByUserId(userId);
      setSharedActivities(activities);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetUserCreate = async () => {
    try {
      const activities = await getRessourceByUserId(userId);
      setCreatedActivities(activities);
      console.log('test :', await getRessourceByUserId(userId));
    } catch (error) {
      console.error(error);
    }
  };

  const renderActivityList = (activities: UserActivity[]) => {
    if (activities.length === 0) {
      return (
        <div className="mt-3">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Pas de postes</span>
        </div>
      );
    }
    return (
      <>
        <ul>
          {activities.map((activity) => (
            <>
            {activity.resource && (
              <div key={activity.id} className="px-4 py-3">
              <div className="flex items-center">
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-700">{activity.resource.value}</p>
              </div>
              <div className="mt-3">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{activity.resource.catalogue[0].category}</span>
              </div>
              <div className="mt-3 flex justify-end">
                <a href={`/post/${activity.resource.id}`} className="text-sm text-indigo-600 hover:text-indigo-900">Voir ce post</a>
              </div>
            </div>
            )}
            </>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div>
      <div className="border border-slate-500 rounded-md p-4 m-4">
      <div className="mt-3">
        <h2><b>Postes crées :</b></h2>
      </div>
      <div className="mt-3 flex justify-end">
        <button className="text-sm text-indigo-600 hover:text-indigo-900" onClick={handleToggleCreatedActivities}>Voir</button>
      </div>
      {toggleCreatedActivities && (
        <>
        <ul>
          {createdActivities.map((createdActivity) => (
              <div key={createdActivity.id} className="px-4 py-3">
              <div className="flex items-center">
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-700">{createdActivity.value}</p>
              </div>
              <div className="mt-3">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{createdActivity.catalogue[0].category}</span>
              </div>
              <div className="mt-3 flex justify-end">
                <a href={`post/${createdActivity.id}`} className="text-sm text-indigo-600 hover:text-indigo-900">Voir ce post</a>
              </div>
            </div>
          ))}
        </ul>        
        </>
      )}
      </div>
      <div className="border border-slate-500 rounded-md p-4 m-4">
        <div className="mt-3">
          <h2><b>Postes likés :</b></h2>
        </div>
        <div className="mt-3 flex justify-end">
          <button className="text-sm text-indigo-600 hover:text-indigo-900" onClick={handleToggleLikedActivities}>Voir</button>
        </div>
        {toggleLikedActivities && (
          <>
          {renderActivityList(likedActivities)}
          </>
        )}
      </div>
      <div className="border border-slate-500 rounded-md p-4 m-4">
        <div className="mt-3">
          <h2><b>Postes partagés :</b></h2>
        </div>
        <div className="mt-3 flex justify-end">
          <button className="text-sm text-indigo-600 hover:text-indigo-900" onClick={handleToggleSharedActivities}>Voir</button>
        </div>
        {toggleSharedActivities && (
        <>
          {renderActivityList(sharedActivities)}
        </>
        )}
      </div>
    </div>
  );
};

export default UserByIdActivityList;
