import React, { useEffect, useState } from "react";
import { getUserActivity, getUserBlocked, getUserLike, getUserShare, getUserViews } from "../../services/activity.service";
import { UserActivity } from "../../types/activity.type";

const UserActivityList: React.FC = () => {
  const [likedActivities, setLikedActivities] = useState<UserActivity[]>([]);
  const [sharedActivities, setSharedActivities] = useState<UserActivity[]>([]);
  const [blockedActivities, setBlockedActivities] = useState<UserActivity[]>([]);
  const [viewedActivities, setViewedActivities] = useState<UserActivity[]>([]);
  const [toggleLikedActivities, setToggleLikedActivities] = useState<boolean>(false);
  const [toggleSharedActivities, setToggleSharedActivities] = useState<boolean>(false);
  const [toggleBlockedActivities, setToggleBlockedActivities] = useState<boolean>(false);
  const [toggleViewedActivities, setToggleViewedActivities] = useState<boolean>(false);

  const handleToggleLikedActivities = () => {
        setToggleLikedActivities(!toggleLikedActivities);
  };

    const handleToggleSharedActivities = () => {
        setToggleSharedActivities(!toggleSharedActivities);
    };

    const handleToggleBlockedActivities = () => {
        setToggleBlockedActivities(!toggleBlockedActivities);
    };

    const handleToggleViewedActivities = () => {
        setToggleViewedActivities(!toggleViewedActivities);
    };

  useEffect(() => {
    handleGetUserLike();
    handleGetUserView();
    handleGetUserShare();
    handleGetUserBlock();
  }, []);

  const handleGetUserLike = async () => {
    try {
      const activities = await getUserLike();
      setLikedActivities(activities);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetUserShare = async () => {
    try {
      const activities = await getUserShare();
      setSharedActivities(activities);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetUserBlock = async () => {
    try {
      const activities = await getUserBlocked();
      setBlockedActivities(activities);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetUserView = async () => {
    try {
      const activities = await getUserViews();
      setViewedActivities(activities);
    } catch (error) {
      console.error(error);
    }
  };

  const renderActivityList = (activities: UserActivity[], toggleActivities: boolean) => {
    if (activities.length === 0) {
        return (
            <div className="mt-3">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Pas de postes disponibles</span>
            </div>
          );
    }
    return (
      <>
        <ul>
          {activities.map((activity) => (
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
                <a href={`post/${activity.resource.id}`} className="text-sm text-indigo-600 hover:text-indigo-900">Voir ce post</a>
              </div>
            </div>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="container">
      <br />
      <br />
      <div className="border border-slate-500 rounded-md p-4 m-4">
      <div className="mt-3">
        <h2><b>Postes likés :</b></h2>
      </div>
      <div className="mt-3 flex justify-end">
        <button className="text-sm text-indigo-600 hover:text-indigo-900" onClick={handleToggleLikedActivities}>Voir</button>
      </div>
      {toggleLikedActivities && (
        <>
        {renderActivityList(likedActivities, toggleLikedActivities)}
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
        {renderActivityList(sharedActivities, toggleSharedActivities)}
      </>
      )}
      </div>
      <div className="border border-slate-500 rounded-md p-4 m-4">
      <div className="mt-3">
        <h2><b>Postes bloqués :</b></h2>
      </div>
      <div className="mt-3 flex justify-end">
        <button className="text-sm text-indigo-600 hover:text-indigo-900" onClick={handleToggleBlockedActivities}>Voir</button>
      </div>
      {toggleBlockedActivities && (
      <>
      {renderActivityList(blockedActivities, toggleBlockedActivities)}
      </>
      )}
      </div>
      <div className="border border-slate-500 rounded-md p-4 m-4">
      <div className="mt-3">
        <h2><b>Postes vus :</b></h2>
      </div>
      <div className="mt-3 flex justify-end">
        <button className="text-sm text-indigo-600 hover:text-indigo-900" onClick={handleToggleViewedActivities}>Voir</button>
      </div>
      {toggleViewedActivities && (
      <>
      {renderActivityList(viewedActivities, toggleViewedActivities)}
      </>
      )}
      </div>
    </div>
  );
};

export default UserActivityList;
