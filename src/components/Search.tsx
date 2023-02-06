import React, { useEffect } from "react";
import { getAllUsers } from "../services/user.service";
import UserType from "../types/user.type";
import Navbar from "./Navbar";

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
            <Navbar />
            <table className="border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th className="border border-slate-600">Name</th>
                        <th className="border border-slate-600">LastName</th>
                        <th className="border border-slate-600">Email</th>
                        <th className="border border-slate-600">ZipCode</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map(user =>
                      <tr key={user.name}>
                            <td className="border border-slate-700">{user.lastName}</td>
                            <td className="border border-slate-700">{user.lastName}</td>
                            <td className="border border-slate-700">{user.email}</td>
                            <td className="border border-slate-700">{user.zipCode}</td>
                      </tr>
                  )}
                </tbody>
            </table>
        </>
    )
}

export default Search;