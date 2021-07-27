//Base router to update one of the users in the app
const users = require('../models/userModels.js')

//Updating a user
exports.updateUser = (req, res) => {
    let userId = Number(req.params.id);
    let body = req.body;

    //finding specific user by id
    let user = users.find((user) => user.id === userId);

    //get the position of the the user in the user array
    let indexOfUser = users.indexOf(user);
    if (!user) {
        res.status(404).send(`User ${userId} not found`)
    } else {
        //update old user with the new changes
        let updateUser = { ...user, ...body };
        users[indexOfUser] = updateUser;
        return res.json(updateUser)
    }
}