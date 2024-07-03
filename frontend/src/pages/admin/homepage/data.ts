import { Pagination } from "@/types";

const users = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@gmail.com",
        role: "admin",
        status: "active",
        createdAt: "2021-01-01",
    },
    {
        id: 2,
        name: "Jane Doe",
        email: "jane.doe@gmail.com",
        role: "user",
        status: "active",
        createdAt: "2021-01-01",
    },
    {
        id: 3,
        name: "Tom Doe",
        email: "tom.doe@gmail.com",
        role: "user",
        status: "inactive",
        createdAt: "2021-01-01",
    },
    {
        id: 4,
        name: "Jerry Doe",
        email: "jerry.doe@yahoo.com",
        role: "user",
        status: "active",
        createdAt: "2021-01-01",
    },
    {
        id: 5,
        name: "Anne Doe",
        email: "anne.doe@email.com",
        role: "user",
        status: "active",
        createdAt: "2021-01-01",
    },
    {
        id: 6,
        name: "Alice Doe",
        email: "alice@hotmail.com",
        role: "user",
        status: "active",
        createdAt: "2021-01-01",
    },
];

const pagination: Pagination = {
    page: 1,
    per_page: 5,
    total_count: 6,
    total_pages: 2,
};

const getUserById = (id: number) => {
    return users.find((user) => user.id === id);
};

export { users, pagination, getUserById };
