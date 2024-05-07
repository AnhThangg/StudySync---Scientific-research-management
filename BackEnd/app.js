const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const { accountRoute } = require('./src/routes/account.route');
const { authRoute } = require('./src/routes/auth.route');
const { infoRoute } = require('./src/routes/info.route')
const { studentRoute } = require('./src/routes/student.route');
const { mentorRoute } = require('./src/routes/mentor.route');
const { topicRoute } = require('./src/routes/topic.route');
const { unitVietNamRoute } = require('./src/routes/unitVietNam.route')
const { univerRoute } = require('./src/routes/univer.route');
const { facultyRoute } = require('./src/routes/faculty.route');
const { proposeIdea } = require('./src/routes/proposeIdea.route')
const {status} = require('./src/util/checkStatus.util')

app.use("/account", accountRoute);
app.use("/auth", authRoute);
app.use("/info", infoRoute);
app.use("/student", studentRoute);
app.use("/mentor", mentorRoute);
app.use("/topic", topicRoute);
app.use("/unitvietnam", unitVietNamRoute);
app.use("/univer", univerRoute);
app.use("/faculty", facultyRoute);
app.use("/proposeIdea", proposeIdea);
app.get('/', (req, res) => {
    res.json('Study-Sync')
})

module.exports = app;