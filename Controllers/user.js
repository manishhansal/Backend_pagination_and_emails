const userModel = require('../Models/user');
const { default: mongoose } = require('mongoose');
const emailService = require('../Notification/emailService');

async function getAllUser(req, res, next) {
    try {
        // const skip = req.query.skip || 0;
        const pageNo = req.query.pageNo;
        const pageSize = req.query.pageSize;
        const skip = ((pageNo - 1) * pageSize) || 0;
        const limit = req.query.limit || 10;

        console.log("skip and limit", skip, limit);

        let response = await userModel.find({}).skip(skip).limit(limit);

        res.json(response);

    } catch (error) {
        res.status(500).json(error);
    }
}

async function createUser(req, res, next) {
    //fetch info from request body
    try {
        console.log("req.body", req.body);
        let userDetail = req.body;
        let response = await userModel.insertMany([userDetail]);
        res.json(response);

    } catch (error) {
        res.json(error);
    }
}

async function sendEmail(req, res, next) {
    const message = req.body.message;

        // send mail with defined transport object
    let response = await emailService.sendMail({
        from: '"Manish Kumar" <manishhansalmeh@gmail.com>', // sender address
        to: "manishkumarmeh007@gmail.com", // list of receivers
        subject: "Hello World from Manish", // Subject line
        text: "Hello world", // plain text body
        html: `<b>${message}</b>`, // html body
    });

    console.log(response);
    res.send(true);
}


module.exports = {
    getAllUser,
    createUser,
    sendEmail
}


