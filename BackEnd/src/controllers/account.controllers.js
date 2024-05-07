const { v4: uuid } = require('uuid');
const bcrypt = require("bcrypt")
const { AccountUser, Univer, Faculty, Mentor, Student, sequelize } = require('../database/database');

const getAccount = async (req, res) => {
    try {
        const { id: categoryAccount } = req.params;
        if (categoryAccount === "all") {
            const listAccount = await sequelize.query(`
                WITH result AS (
                    SELECT studentCode AS roleCode, accountId FROM students
                    UNION
                    SELECT mentorCode AS roleCode, accountId FROM mentors
                    UNION
                    SELECT univerCode AS roleCode, accountId FROM univers
                    UNION
                    SELECT facultyCode AS roleCode, accountId FROM faculties
                )
                SELECT * FROM result
                INNER JOIN accountUsers ON result.accountId = accountUsers.accountId;`,
                { type: sequelize.QueryTypes.SELECT });
            return res.status(200).json(listAccount);
            const memoryListAccount = listAccount.map(account => {
                const { password, ...data } = account
                return data
            });
            res.status(200).send(memoryListAccount)

        } else if (categoryAccount === "univer") {
            const listAccount = await AccountUser.findAll({
                where: {
                    role: 'univer'
                },
                raw: true
            })
            const memoryListAccount = listAccount.map(account => {
                const { password, ...data } = account
                return data
            });
            res.status(200).send(memoryListAccount)
        } else if (categoryAccount === "faculty") {
            const listAccount = await AccountUser.findAll({
                where: {
                    role: 'faculty'
                },
                raw: true
            })
            const memoryListAccount = listAccount.map(account => {
                const { password, ...data } = account
                return data
            });
            res.status(200).send(memoryListAccount)
        } else if (categoryAccount === "mentor") {
            const listAccount = await AccountUser.findAll({
                where: {
                    role: 'mentor'
                },
                raw: true
            })
            const memoryListAccount = listAccount.map(account => {
                const { password, ...data } = account
                return data
            });
            res.status(200).send(memoryListAccount)
        } else if (categoryAccount === "student") {
            const listAccount = await AccountUser.findAll({
                where: {
                    role: 'student'
                },
                raw: true
            })
            const memoryListAccount = listAccount.map(account => {
                const { password, ...data } = account
                return data
            });
            res.status(200).send(memoryListAccount)
        } else {
            res.status(404).json("Role do not exist");
        }
    } catch (e) {
        console.log(e);
    }
}

const findRoleCode = async (role, roleCode, code) => {
    let findRole = await role.findOne({
        where: {
            [roleCode]: code,
        }
    });
    return findRole;
}

const createAccount = async (req, res) => {
    try {
        const { id: categoryAccount } = req.params;
        const { body: info } = req;
        const accountId = uuid();
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(info.password, salt);
        const findUserName = await AccountUser.findOne({
            where: {
                userName: info.userName
            }
        });
        if (findUserName) {
            return res.status(400).json('Username Has Existed')
        }
        switch (categoryAccount) {
            case "univer": {
                if (await findRoleCode(Univer, "univerCode", info.univerCode)) {
                    return res.status(400).json('Univer Code Has Existed!');
                }
                const newInfoAccount = await AccountUser.create({
                    accountId,
                    userName: info.userName,
                    password: hash,
                    role: 'univer'
                });
                if (newInfoAccount) {
                    try {
                        const newInfoUniver = await Univer.create({
                            univerCode: info.univerCode,
                            univerName: info.univerName,
                            univerPhone: info.univerPhone,
                            univerEmail: info.univerEmail,
                            univerAvatar: 'avatarDefault.png',
                            univerAddress: info.univerAddress,
                            accountId,
                        });
                        if (newInfoUniver) {
                            return res.status(200).json('Account Create Successully');
                        }
                    } catch (e) {
                        await newInfoAccount.destroy();
                        return res.status(500).json(e);
                    }

                }

                break;
            }
            case "faculty": {
                if (await findRoleCode(Faculty, "facultyCode", info.facultyCode)) {
                    return res.status(400).json('Faculty Code Has Existed!');
                }
                const newInfoAccount = await AccountUser.create({
                    accountId,
                    userName: info.userName,
                    password: hash,
                    role: 'faculty'
                });
                if (newInfoAccount) {
                    try {
                        const newInfoFaculty = await Faculty.create({
                            facultyCode: info.facultyCode,
                            facultyName: info.facultyName,
                            facultyPhone: info.facultyPhone,
                            facultyEmail: info.facultyEmail,
                            facultyAddress: info.facultyAddress,
                            facultyAvatar: 'avatarDefault.png',
                            univerCode: info.univerCode,
                            accountId,
                        });
                        if (newInfoFaculty) {
                            return res.status(200).json('Account Create Successully');
                        }
                    } catch (e) {
                        await newInfoAccount.destroy();
                        return res.status(500).json(e);
                    }

                }
                break;
            }
            case "mentor": {
                if (await findRoleCode(Mentor, "mentorCode", info.mentorCode)) {
                    return res.status(400).json('Mentor Code Has Existed!');
                }
                const newInfoAccount = await AccountUser.create({
                    accountId,
                    userName: info.userName,
                    password: hash,
                    role: 'mentor'
                });
                if (newInfoAccount) {
                    try {
                        const newInfoMentor = await Mentor.create({
                            mentorCode: info.mentorCode,
                            mentorFullname: info.mentorFullname,
                            mentorSex: info.mentorSex,
                            mentorBirthday: info.mentorBirthday,
                            mentorPhone: info.mentorPhone,
                            mentorEmail: info.mentorEmail,
                            mentorDegree: info.mentorDegree,
                            mentorScientificName: info.mentorScientificName,
                            mentorAvatar: 'avatarDefault.png',
                            mentorAddress: info.mentorAddress,
                            facultyCode: info.facultyCode,
                            accountId,
                        });
                        if (newInfoMentor) {
                            return res.status(200).json('Account Create Successully');
                        }
                    } catch (e) {
                        await newInfoAccount.destroy();
                        return res.status(500).json(e);
                    }

                }

                break;
            }
            case "student": {
                if (await findRoleCode(Student, "studentCode", info.studentCode)) {
                    return res.status(400).json('Student Code Has Existed!');
                }
                const newInfoAccount = await AccountUser.create({
                    accountId,
                    userName: info.userName,
                    password: hash,
                    role: 'student'
                });
                if (newInfoAccount) {
                    try {
                        const newInfoStudent = await Student.create({
                            studentCode: info.studentCode,
                            studentClass: info.studentClass,
                            studentFullname: info.studentFullname,
                            studentSex: info.studentSex,
                            studentBirthday: info.studentBirthday,
                            studentEmail: info.studentEmail,
                            studentAddress: info.studentAddress,
                            studentAvatar: 'avatarDefault.png',
                            studentPhone: info.studentPhone,
                            facultyCode: info.facultyCode,
                            accountId,
                        });
                        if (newInfoStudent) {
                            return res.status(200).json('Account Create Successully');
                        }
                    } catch (e) {
                        await newInfoAccount.destroy();
                        return res.status(500).json(e);
                    }

                }
                break;
            }
        }
        return res.json('Account Creation Failed ')
    } catch (e) {
        return res.status(500).json(e.errors)
    }
}

const editAccount = async (req, res) => {
    try {
        const { id: accountId } = req.params;
        const { body: info } = req;
        const existingAccount = await AccountUser.findOne({
            where: {
                accountId: accountId
            }
        });
        if (!existingAccount) {
            return res.status(404).json('Account not found');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(info.password, salt);
        existingAccount.userName = info.userName;
        existingAccount.password = hash;
        await existingAccount.save();
        return res.status(200).json('Account edit successfully');

    } catch (e) {
        return res.status(500).json(e.errors)
    }
}

const deleteAccount = async (req, res) => {
    try {
        const { id: accountId } = req.params;
        const existingAccount = await AccountUser.findOne({
            where: {
                accountId: accountId
            }
        });

        if (!existingAccount) {
            return res.status(404).json('Account not found');
        }
        if (existingAccount.role === 'univer') {
            await Univer.destroy({
                where: {
                    accountId: accountId
                }
            });
        }
        if (existingAccount.role === 'faculty') {
            await Faculty.destroy({
                where: {
                    accountId: accountId
                }
            })
        }
        if (existingAccount.role === 'mentor') {
            await Mentor.destroy({
                where: {
                    accountId: accountId
                }
            })
        }
        if (existingAccount.role === 'student') {
            await Student.destroy({
                where: {
                    accountId: accountId
                }
            })
        }
        await AccountUser.destroy({
            where: {
                accountId: accountId
            }
        });

        return res.status(200).json('Account deleted successfully');
    } catch (e) {
        return res.status(500).json(e);
    }
}


module.exports = {
    getAccount,
    createAccount,
    editAccount,
    deleteAccount,
}