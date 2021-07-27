//Base router to delete one of the users in the app
const users = require('../models/userModels.js')

//Delete a user
exports.deleteUser = (req, res) => {
    let userId = Number(req.params.id);
    let deleteUser = users.filter((user) => user.id !== userId);
    if (!deleteUser) {
        return res.status(404).send(`User ${userId} not found`);
    } else {
        //return only the remaining users
        users = deleteUser;
        return res.json(users);
    }
}