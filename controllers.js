let users = require('./pseudoDB');

const getUsers = () => users;

const saveUser = user => {
    user.id = Date.now();
    users.push(user);
    return users;
}

const deleteUser = id => {
    const numberOfUsers = users.length;
    users = users.filter(user => user.id != id);

    return users.length !== numberOfUsers ? users : {error: "There is no user with this id."};
}

const updateUser = (id, userData) => {
    let isUser = false;
    users = users.map(user => {
        if (user.id == id) {
            isUser = true;
            return {id: user.id, ...userData};
        }
        return user
    });

    return isUser ? users : {error: "There is no user with this id."};
}

const UserControllers = {
    getUsers, saveUser, deleteUser, updateUser
}

module.exports = UserControllers;