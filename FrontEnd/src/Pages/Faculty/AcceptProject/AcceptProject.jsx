import React, { useRef, useState } from "react";
import { Box, Icon, Typography, Button, TextareaAutosize } from "@mui/material";
import {
  Person2,
  Person,
  Groups,
  AccessTime,
  DataSaverOff,
} from "@mui/icons-material";

function AcceptProject() {
  const InfoItem = ({ label, value }) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        marginBottom: "5px",
        // width: "50%",
      }}
    >
      <Typography className="txtcel1" sx={{ fontWeight: "bold", fontSize:'20px' }}>
        {label}
      </Typography>
      <Typography className="txtcel2" sx={{ marginLeft: "10px" }}>
        {value}
      </Typography>
    </Box>
  );

  const fileInputRef = useRef(null);

  const project = {
    faculty: "Khoa Công Nghệ Phần Mềm",
    projectName:
      "StudySync Manage scientific research projects for students in Duy Tan University",
    procjectCode: "PJ01SA",
  };
  const mentor = {
    mentorName: "Dr. Tran Thi Thuy Trinh",
    mentorEmail: "ttthuytrinh@dtu.edu.vn",
    mentorPhone: "09133350642",
  };

  const leader = {
    leaderName: "Nguyen Tran Anh Thang",
    leaderEmail: "anhthang2529@gmail.com",
    leaderPhone: "0869132529",
  };

  const members = {
    membersOne: "Nguyen Hoang Quoc Anh",
    membersTwo: "Duong Nguyen Cong Luan",
    membersThree: "Nguyen Quoc Nhat",
  };
  const startTime = "24/02/2024";
  const trangThai = "In progess";

  const goal = {
    goalOfSubject:
      "The goal of the research project management topic is not only to develop project management skills but also includes promoting the ability to analyze, organize information, and implement research methods. effective rescue. Through this process, students will have the opportunity to practice planning skills, time management, interact with the academic community, and build self-study ability and autonomy in carrying out research projects. mine. The ultimate goal is to help students become confident researchers, capable of applying knowledge and skills into practice, while contributing to the development of themselves and the academic community.",
  };
  const topic = {
    topicProject:
      "The goal of the research project management topic is to develop project management skills, research abilities, and in-depth understanding of the research project implementation process. Some expected research products of this topic include detailed research reports, presentations, and abstracts or reports announcing the results. In addition, the project management skills and research methods gained from this subject can be widely applied in many different fields, from academic research to industry and business. These knowledge and skills can be used to create real value and applied to projects and problems in the community and society.",
  };
  return (
    <Box sx={{ margin: "50px 50px 0 50px", color: "#818181" }}>
      <Box
        className="header"
        sx={{ display: "flex", flexDirection: "row", marginBottom: "20px" }}
      >
        <Box className="header_left" sx={{ width: "100%" }}>
          <Typography
            variant="h5"
            sx={{
              color: "#D82C2C",
              fontWeight: "bold",
              //   width:'100%'
            }}
          >
            {project.faculty}
          </Typography>
          <Box>
            <InfoItem label="Project code" value={project.procjectCode} />
          </Box>
        </Box>
        <Box
          className="header_right"
          sx={{ display: "flex", flexDirection: "row" }}
        >
          <Typography sx={{ fontSize: "24px" }}>
            {project.projectName}
          </Typography>
        </Box>
      </Box>

      <Box
        className="container"
        sx={{
          //   width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box className="contLeft" sx={{ width: "70%" }}>
          <Box className="Goal" sx={{ marginBottom: "20px" }}>
            <InfoItem label="The Goal Of The Subject" />
            <Typography sx={{fontSize:"20px", marginRight:"50px", textAlign: "justify"}}>{goal.goalOfSubject}</Typography>
          </Box>
          <Box className="Topic" sx={{ marginBottom: "20px" }}>
            <InfoItem label="Expected research products of the topic and applicability" />
            <Typography sx={{fontSize:"20px", marginRight:"50px", textAlign: "justify"}}>{topic.topicProject}</Typography>
          </Box>
        </Box>

        <Box
          className="contRight"
          sx={{
            backgroundColor: "#F6E8E8",
            width: "360px",
            height: "570px",
            borderRadius: "20px",
          }}
        >
          <Box
            sx={{
              margin: "20px 10px ",
            }}
          >
            <Box
              className="mentor"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <Icon sx={{ fontSize: 60 }}>
                <Person2 fontSize="large" />
              </Icon>
              <Box sx={{ marginTop: "20px" }}>
                <InfoItem label="Mentor" />
                <Typography>{mentor.mentorName}</Typography>
                <Typography>{mentor.mentorEmail}</Typography>
                <Typography>{mentor.mentorPhone}</Typography>
              </Box>
            </Box>
            <Box
              className="leader"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <Icon sx={{ fontSize: 60 }}>
                <Person fontSize="large" />
              </Icon>
              <Box sx={{ marginTop: "20px" }}>
                <InfoItem label="Leader" />
                <Typography>{leader.leaderName}</Typography>
                <Typography>{leader.leaderEmail}</Typography>
                <Typography>{leader.leaderPhone}</Typography>
              </Box>
            </Box>
            <Box
              className="group"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <Icon sx={{ fontSize: 60 }}>
                <Groups fontSize="large" />
              </Icon>
              <Box sx={{ marginTop: "20px" }}>
                <InfoItem label="Group members" />
                <Typography>{members.membersOne}</Typography>
                <Typography>{members.membersTwo}</Typography>
                <Typography>{members.membersThree}</Typography>
              </Box>
            </Box>
            <Box
              className="startTime"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <Icon sx={{ fontSize: 60 }}>
                <AccessTime fontSize="large" />
              </Icon>
              <Box sx={{ marginTop: "20px" }}>
                <InfoItem label="Start" />
                <Typography>{startTime}</Typography>
              </Box>
            </Box>
            <Box
              className="startTime"
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <Icon sx={{ fontSize: 60 }}>
                <DataSaverOff fontSize="large" />
              </Icon>
              <Box sx={{ marginTop: "20px" }}>
                <InfoItem label="Status" />
                <Typography>{trangThai}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        className="btn"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          margin: "20px 90px 20px 0",
        //   minHeight: "100%"
        }}
      >
        <Button
          sx={{
            backgroundColor: "#D82C2C",
            borderRadius: "10px",
            width: "150px",
            height: "40px",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "20px",
            textTransform: "none",
            marginRight:'10px',
            "&:hover": {
              background: "#fff",
              color: "#D82C2C",
              border: "1px solid #999",
            },
          }}
        >
          Refuse
        </Button>
        <Button
          sx={{
            backgroundColor: "#D82C2C",
            borderRadius: "10px",
            width: "150px",
            height: "40px",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "20px",
            textTransform: "none",
            "&:hover": {
              background: "#fff",
              color: "#D82C2C",
              border: "1px solid #999",
            },
          }}
        >
          Accept
        </Button>
      </Box>
    </Box>
  );
}

export default AcceptProject;
