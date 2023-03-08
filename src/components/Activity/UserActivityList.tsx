import React, { useEffect, useState } from "react";
import { getUserActivity } from "../../services/activity.service";
import { UserActivity } from "../../types/activity.type";

const UserActivityList: React.FC = () => {
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [createdActivities, setCreatedActivities] = useState<UserActivity[]>([]);
  const [likedActivities, setLikedActivities] = useState<UserActivity[]>([]);
  const [sharedActivities, setSharedActivities] = useState<UserActivity[]>([]);
  const [blockedActivities, setBlockedActivities] = useState<UserActivity[]>([]);

  useEffect(() => {
    handleGetUserActivity();
  }, []);

  const handleGetUserActivity = async () => {
    try {
      const activities = await getUserActivity();
      const createdActivities: UserActivity[] = [];
      const likedActivities: UserActivity[] = [];
      const sharedActivities: UserActivity[] = [];
      const blockedActivities: UserActivity[] = [];

      activities.forEach((userActivity) => {
        if (userActivity.created) {
          createdActivities.push(userActivity);
        }
        if (userActivity.liked) {
          likedActivities.push(userActivity);
        }
        if (userActivity.shared) {
          sharedActivities.push(userActivity);
        }
        if (userActivity.blocked) {
          blockedActivities.push(userActivity);
        }
      });

      setUserActivities(activities);
      setCreatedActivities(createdActivities);
      setLikedActivities(likedActivities);
      setSharedActivities(sharedActivities);
      setBlockedActivities(blockedActivities);
    } catch (error) {
      console.error(error);
    }
  };

  const renderActivityList = (activities: UserActivity[], activityType: string) => {
    if (activities.length === 0) {
      return null;
    }

    return (
      <>
        <h2><b>Posts {activityType}:</b></h2>
        <ul>
          {activities.map((activity) => (
            <li key={activity.id}>
              <p>{activity.resource.value}</p>
              <p>Categorie: {activity.resource.catalogue[0].category}</p>
            </li>
          ))}
        </ul>
      </>
    );
  };

  return (
    <div className="container">
      <br />
      <br />
      {renderActivityList(createdActivities, "créés")}
      {renderActivityList(likedActivities, "likés")}
      {renderActivityList(sharedActivities, "partagés")}
      {renderActivityList(blockedActivities, "bloqués")}
    </div>
  );
};

export default UserActivityList;
