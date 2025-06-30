export const queryKeys = {
    users: {
        authors: {
            get: "getAuthor",
            post: "postAuthor",
            put: "putAuthor",
            getList: "getAuthors",
        },
        reader: {
            /// this is for the normal users
            get: "getReader",
            post: "postReader",
            put: "putReader",
            getList: "getReaders",
        },
        admins: {
            /// this is for the admin users
            get: "getAdmin",
            post: "postAdmin",
            put: "putAdmin",
            getList: "getAdmins",
        },
        allUsers: {
            /// this is for the admin users
            get: "getUser",
            post: "postUser",
            put: "putUser",
            getList: "getUsers",
        },
    },
};
