import axios from "axios"
import { useEffect, useState } from "react"
import type { ReqResUserListResponse, User } from "../interfaces";

const loadUsers = async (): Promise<User[]> => {
    try {
        const { data } = await axios.get<ReqResUserListResponse>('https://reqres.in/api/users');
        return data.data;
        // .then(resp => console.log(resp.data.total_pages));
    } catch (error) {
        console.log(error);
        return [];
    }

}

export const UsersPage = () => {

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {

        loadUsers()
            // .then(users => setUsers(users));
            .then(setUsers);

        // const { data } = axios.get<ReqResUserListResponse>('https://reqres.in/api/users?page=2')
        // .then(resp => console.log(resp.data.total_pages));

        // fetch('https://reqres.in/api/users?page=2')
        //     .then(resp => resp.json())
        //     .then(data => console.log(data));
    }, [])

    return (
        <>
            <h3>Usuarios:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Nombre</th>
                        <th>Email</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        users.map(user => (
                            <UserRow key={user.id} user={user} />
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

interface Props {
    user: User;
}


export const UserRow = ({ user }: Props) => {

    const { avatar, first_name, last_name, email } = user;
    return (
        <tr key={user.id}>
            <td><img style={{ width: '50px' }} src={avatar} alt="user avatar" /></td>
            <td>{first_name} {last_name}</td>
            <td>{email}</td>
        </tr>
    )
}
