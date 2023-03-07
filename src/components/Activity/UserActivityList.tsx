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

  const renderActivityTable = (activities: UserActivity[], activityType: string) => {
    if (activities.length === 0) {
      return null;
    }

    return (
      <>
        <p>Posts {activityType}</p>
        <table className="border-collapse border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-600">Id</th>
              <th className="border border-slate-600">Categorie</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td className="border border-slate-700">{activity.resource.value}</td>
                <td className="border border-slate-700">{activity.resource.catalogue[0].category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <>
      <br />
      <br />
      {renderActivityTable(createdActivities, "créés")}
      {renderActivityTable(likedActivities, "likés")}
      {renderActivityTable(sharedActivities, "partagés")}
      {renderActivityTable(blockedActivities, "bloqués")}
    </>
  );
};

export default UserActivityList;
