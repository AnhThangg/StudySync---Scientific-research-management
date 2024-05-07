const mysql = require('mysql2');
const { Sequelize, DataTypes } = require('sequelize');
const { accountUserModel } = require('../models/accountUser.model');
const { univerModel } = require('../models/univer.model');
const { facultyModel } = require('../models/faculty.model');
const { mentorModel } = require('../models/mentor.model');
const { studentModel } = require('../models/student.model');
const { teamModel } = require('../models/team.model');
const { student_teamModel } = require('../models/student_team.model');
const { documentModel } = require('../models/document.model');
const { topicModel } = require('../models/topic.model');
const {proposeIdeaModel} = require('../models/proposeIdea.model');

const host = 'localhost';
const port = 3306;
const user = 'root';
const password = '123456';

const databaseName = 'studysync';

const pool = mysql.createPool({ host, port, user, password });
pool.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
const sequelize = new Sequelize(databaseName, user, password, {
    host,
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    define: {
        raw: true,
    },
})
const AccountUser = accountUserModel(sequelize, DataTypes);
const Univer = univerModel(sequelize, DataTypes);
const Faculty = facultyModel(sequelize, DataTypes);
const Mentor = mentorModel(sequelize, DataTypes);
const Student = studentModel(sequelize, DataTypes);
const Team = teamModel(sequelize, DataTypes);
const StudentTeam = student_teamModel(sequelize, DataTypes);
const Document = documentModel(sequelize, DataTypes);
const Topic = topicModel(sequelize, DataTypes);
const ProposeIdea = proposeIdeaModel(sequelize, DataTypes);

sequelize.sync({
    force: false,
})
// accountUserModel 1-1 to univerModel, facultyModel, studentModel, mentorModel
Univer.belongsTo(AccountUser, { foreignKey: "accountId" });
Faculty.belongsTo(AccountUser, { foreignKey: "accountId" });
Student.belongsTo(AccountUser, { foreignKey: "accountId" });
Mentor.belongsTo(AccountUser, { foreignKey: "accountId" });
//univerModel 1-n to facultyModel
Univer.hasMany(Faculty, { foreignKey: "univerCode" });
Faculty.belongsTo(Univer, { foreignKey: "univerCode" });

// facultyModel 1-n to mentorModel, studentModel, topicModel
Faculty.hasMany(Mentor, { foreignKey: "facultyCode" });
Mentor.belongsTo(Faculty, { foreignKey: "facultyCode" });
Faculty.hasMany(Student, { foreignKey: "facultyCode" });
Student.belongsTo(Faculty, { foreignKey: "facultyCode" });
Faculty.hasMany(Topic, { foreignKey: "facultyCode" });
Topic.belongsTo(Faculty, { foreignKey: "facultyCode" });

// mentorModel 1-n to topicModel
Mentor.hasMany(Topic, { foreignKey: "mentorCode" });
Topic.belongsTo(Mentor, { foreignKey: "mentorCode" });

//studentModel 1-n to topicModel
Student.hasMany(Topic, { foreignKey: "leader" });
Topic.belongsTo(Student, { foreignKey: "leader" });

//student 1-n to student_teamModel
Student.hasMany(StudentTeam, { foreignKey: "studentCode" });
StudentTeam.belongsTo(Student, { foreignKey: "studentCode" });

//teamModel 1-n to student_teamModel 
Team.hasMany(StudentTeam, { foreignKey: "teamCode" });
StudentTeam.belongsTo(Team, { foreignKey: "teamCode" });

// teamModel 1-1 to topicModel
Topic.belongsTo(Team, { foreignKey: "teamCode" });

//  to topicModel 1-n documentModel
Topic.hasMany(Document, { foreignKey: "topicCode" });
Document.belongsTo(Topic, { foreignKey: "topicCode" });

// mentorModel 1-n to proposeIdea
Mentor.hasMany(ProposeIdea, { foreignKey: "mentorCode" });
ProposeIdea.belongsTo(Mentor, { foreignKey: "mentorCode" });

module.exports = {
    sequelize,
    AccountUser,
    Univer,
    Faculty,
    Mentor,
    Student,
    Team,
    StudentTeam,
    Document,
    Topic,
    ProposeIdea
};