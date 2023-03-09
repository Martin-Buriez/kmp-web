import React, { useEffect, useState } from "react";
import { getLikedByUserId, getSharedByUserId, getUserActivity, getUserBlocked, getUserLike, getUserShare, getUserViews } from "../../services/activity.service";
import { UserActivity } from "../../types/activity.type";

const UserByIdActivityList: React.FC = () => {
  const [likedActivities, setLikedActivities] = useState<UserActivity[]>([]);
  const [sharedActivities, setSharedActivities] = useState<UserActivity[]>([]);
  const [toggleLikedActivities, setToggleLikedActivities] = useState<boolean>(false);
  const [toggleSharedActivities, setToggleSharedActivities] = useState<boolean>(false);
  const [toggleBlockedActivities, setToggleBlockedActivities] = useState<boolean>(false);
  const [toggleViewedActivities, setToggleViewedActivities] = useState<boolean>(false);

  const url = window.location.pathname;
  const userId = parseInt(url.substring(url.lastIndexOf("/") + 1));

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
    handleGetUserShare();
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

  const renderActivityList = (activities: UserActivity[], toggleActivities: boolean) => {
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
    <div>
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
    </div>
  );
};

export default UserByIdActivityList;
