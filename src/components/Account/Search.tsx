import React, { useEffect } from "react";
import { getAllUsers } from "../../services/user.service";
import UserType from "../../types/user.type";
import Navbar from "../Navbar";

let Search: React.FC = () => {

    let [users, setUsers] = React.useState<UserType[]>([]);
    useEffect(()=> {
      handleGetUsers();
    }, []);

    const handleGetUsers = React.useCallback(async () => {
        setUsers(await getAllUsers());
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
                {users && users.map(user =>
                    <div key={user.name} className="border border-slate-500 p-4 rounded-md">
                        <h3 className="font-bold text-lg">{user.name} {user.lastName}</h3>
                        <p className="text-gray-700">{user.email}</p>
                        <a href={`users/${user.id}`} className="text-blue-500 hover:underline">Voir le profil</a>
                    </div>
                )}
            </div>
        </>
    )
}

export default Search;
