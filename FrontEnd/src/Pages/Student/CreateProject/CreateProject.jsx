import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  TextareaAutosize,
  Snackbar,
  Alert,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import "./CreateProject.scss";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getInfo, getNameMentor } from "../../../api/infoApi";
import { getStudent } from "../../../api/studentApi";
import { v4 as uuid } from "uuid";
import { createTopic } from "../../../api/topicsApi";
function CreateProject() {
  const InfoItem = ({ label, value }) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        marginBottom: "5px",
        width: "50%",
      }}
    >
      <Typography className="txtcel1" sx={{ fontWeight: "bold" }}>
        {label}:
      </Typography>
      <Typography className="txtcel2" sx={{ marginLeft: "10px" }}>
        {value}
      </Typography>
    </Box>
  );

  const [topicName, setTopicName] = useState("");
  const [topicDescription, setTopicDescription] = useState("");
  const [goalOfSubject, setGoalOfSubject] = useState("");
  const [researchProducts, setResearchProducts] = useState("");
  const [member, setMember] = useState();
  const [members, setMembers] = useState([undefined]);
  const [leader, setLeader] = useState();
  const [listMentor, setListMentor] = useState([]);
  const [mentor, setMentor] = useState("");
  const [startDate, setStartDate] = useState(dayjs().add(7, "day"));
  const [endDate, setEndDate] = useState(dayjs().add(3, "month").add(7, "day"));
  const [message, setMessage] = useState("");
  const [isCheckAlert, setIsCheckAlert] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [openDialog, setOpenDialog] = useState(false);
  const [key, setKey] = useState(uuid());
  useEffect(() => {
    getInfo()
      .then((data) => {
        setLeader(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    getNameMentor(leader?.facultyCode)
      .then((data) => {
        setListMentor(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [leader]);

  const onSearchMember = async (id, index) => {
    const res = await getStudent(id);
    if (res.status === "success") {
      if (
        members.find((item) => item?.studentCode === res.student.studentCode)
      ) {
        setMessage("This student is already on the member list");
        setAlertType("error");
        setIsCheckAlert(true);
        setTimeout(() => {
          setIsCheckAlert(false);
        }, 4000);
      } else if (res.student.studentCode === leader.studentCode) {
        setMessage("You are the Leader, do not enter your Student Code");
        setAlertType("error");
        setIsCheckAlert(true);
        setTimeout(() => {
          setIsCheckAlert(false);
        }, 4000);
      } else {
        const newMembers = [...members];
        newMembers[index] = res.student;
        setMembers(newMembers);
      }
    } else {
      const newMembers = [...members];
      newMembers[index] = undefined;
      setMembers(newMembers);
    }
  };

  const onDeleteMember = async (index) => {
    if (members.length > 1) {
      const newMembers = [...members];
      newMembers.splice(index, 1);
      setMembers(newMembers);
      setKey(uuid());
    }
  };

  const onAddMember = () => {
    if (members[members.length - 1]) {
      setMembers([...members, undefined]);
    }
  };
  const onCreateTopic = () => {
    if (endDate.diff(startDate, "month") < 3) {
      setMessage("The duration of the project must be more than 3 months");
    }
    !researchProducts && setMessage("Applicability cannot be left blank");
    !goalOfSubject && setMessage("Goal Of The Subject cannot be left blank");
    !topicDescription && setMessage("Description cannot be left blank");
    !mentor && setMessage("Please choose a mentor to guide you");
    !members[0] && setMessage("must have at least one member");
    !topicName && setMessage("TopicName cannot be left blank");
    if (
      !researchProducts ||
      !goalOfSubject ||
      !topicName ||
      endDate.diff(startDate, "month") < 3 ||
      !mentor ||
      !topicDescription ||
      !members[0]
    ) {
      setAlertType("error");
      setIsCheckAlert(true);
      setTimeout(() => {
        setIsCheckAlert(false);
      }, 4000);
    } else {
      setOpenDialog(true);
    }
  };

  const fortmartDate = (year, month, date) => {
    const formattedMonth = month < 9 ? `0${month + 1}` : month + 1;
    const formattedDate = date < 10 ? `0${date}` : date;
    return `${year}-${formattedMonth}-${formattedDate}`;
  };

  const onSubmitTopic = async () => {
    const listMember = members.map((member) => member.studentCode);
    const res = await createTopic({
      topicName,
      topicDescription,
      topicGoalSubject: goalOfSubject,
      topicExpectedResearch: researchProducts,
      topicDateStart: fortmartDate(
        startDate?.$y,
        startDate?.$d.getMonth(),
        startDate?.$D
      ),
      topicDateEnd: fortmartDate(
        endDate?.$y,
        endDate?.$d.getMonth(),
        endDate?.$D
      ),
      facultyCode: leader.facultyCode,
      mentorCode: mentor.code,
      leader: leader.studentCode,
      listMember,
    });
    if (res.status === 200) {
      setOpenDialog(false);
      setAlertType("success");
      setMessage(res.data);
    } else {
      setOpenDialog(false);
      setAlertType("error");
      setMessage("Thêm không thành công");
    }
    setIsCheckAlert(true);
    setTimeout(() => {
      setIsCheckAlert(false);
    }, 4000);
  };

  return (
    <Box sx={{ margin: "50px 0 0 50px" }}>
      <Box
        sx={{
          borderBottom: "1.5px solid #707070",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#D82C2C",
            fontWeight: "bold",
          }}
        >
          Create Project
        </Typography>
      </Box>

      <Box>
        <TextField
          size="medium"
          label="Topic Name"
          value={topicName}
          onChange={(e) => {
            setTopicName(e.target.value);
          }}
          sx={{
            marginTop: "50px",
            width: "95%",
          }}
        ></TextField>

        <Box>
          <Box
            sx={{
              margin: "20px 0 0 10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#818181",
              }}
            >
              Leader
            </Typography>
          </Box>
          <Box
            sx={{
              margin: "10px 50px 20px 20px",
              color: "#818181",
            }}
          >
            <InfoItem label="Full Name" value={leader?.studentFullname} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "5px",
              }}
            >
              <InfoItem label="Student Code" value={leader?.studentCode} />
              <InfoItem label="Class" value={leader?.studentClass} />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "5px",
              }}
            >
              <InfoItem label="Phone" value={leader?.studentPhone} />
              <InfoItem label="Email" value={leader?.studentEmail} />
            </Box>
            <InfoItem label="Department" value={leader?.facultyName} />
            <InfoItem label="Address" value={leader?.studentAddress} />
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              margin: "20px 0 0 10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#818181",
              }}
            >
              Team Members
            </Typography>
          </Box>
          {members.map((item, index) => (
            <Box className="member" key={key + item?.studentCode}>
              <Box
                className="id_student"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "20px",
                  gap: "10px",
                }}
              >
                <TextField
                  className="textFieldMember"
                  type="number"
                  size="small"
                  disabled={index < members.length - 1 ? true : false}
                  defaultValue={item ? item.studentCode : ""}
                  onChange={(e) => {
                    if (e.target.value.length > 11) {
                      e.target.value = e.target.value.slice(0, -1);
                    }
                    onSearchMember(e.target.value, index);
                  }}
                  sx={{
                    width: "170px",
                    '& .MuiInputBase-input[type="number"]::-webkit-inner-spin-button, & .MuiInputBase-input[type="number"]::-webkit-outer-spin-button':
                    {
                      "-webkit-appearance": "none",
                      margin: 0,
                    },
                    '& .MuiInputBase-input[type="number"]': {
                      "-moz-appearance": "textfield",
                    },
                  }}
                />
                <IconButton onClick={() => onDeleteMember(index)}>
                  <Delete />
                </IconButton>
              </Box>
              {item && (
                <Box
                  className="infoMember"
                  sx={{
                    margin: "10px 50px 20px 20px",
                    color: "#818181",
                  }}
                >
                  <InfoItem label="Full Name" value={item.studentFullname} />
                  <InfoItem label="Student Code" value={item.studentCode} />
                  <InfoItem label="Class" value={item.studentClass} />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "5px",
                    }}
                  ></Box>
                  <InfoItem label="Department" value={item.facultyName} />
                </Box>
              )}
            </Box>
          ))}
          <Box
            className="addMember"
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "20px",
            }}
          >
            <Button
              sx={{
                marginTop: "10px",
                borderRadius: "10px",
                border: "2px solid #818181",
                width: "150px",
                height: "40px",
                color: "#818181",
                fontWeight: "bold",
                fontSize: "16px",
                textTransform: "none",
              }}
              onClick={onAddMember}
            >
              + Add Member
            </Button>
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              margin: "20px 0 0 10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#818181",
                paddingBottom: "10px",
              }}
            >
              Mentor
            </Typography>
          </Box>
          <Box
            className="nameMentor"
            sx={{
              marginLeft: "20px",
              width: "20%",
            }}
          >
            <TextField
              size="small"
              select
              label="Select Mentor"
              sx={{
                width: "100%",
              }}
            >
              {listMentor.map((option) => (
                <MenuItem
                  key={option.mentorCode}
                  value={option.mentorCode}
                  onClick={() => {
                    setMentor({
                      code: option.mentorCode,
                      name: option.mentorScientificName,
                    });
                  }}
                >
                  {option.mentorScientificName}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          <Box
            sx={{
              margin: "10px 50px 20px 20px",
              color: "#818181",
            }}
          >
            {member && (
              <>
                <InfoItem label="Full Name" value={"mentor.mentorName"} />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "5px",
                  }}
                >
                  <InfoItem
                    label="Scientific Name"
                    value={"mentor.scientificName"}
                  />
                  <InfoItem label="Degree" value={"mentor.degree"} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "5px",
                  }}
                >
                  <InfoItem label="Phone" value={"mentor.mentorPhone"} />
                  <InfoItem label="Email" value={"mentor.mentorEmail"} />
                </Box>
                <InfoItem
                  label="Department"
                  value={"mentor.mentorDepartment"}
                />
                <InfoItem label="Address" value={"mentor.mentorAddress"} />
              </>
            )}
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              margin: "20px 0 0 10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#818181",
              }}
            >
              Description
            </Typography>
          </Box>
          <Box
            sx={{
              height: "auto",
              margin: "10px 50px 20px 10px",
            }}
          >
            <TextareaAutosize
              value={topicDescription}
              onChange={(e) => {
                setTopicDescription(e.target.value);
              }}
              style={{
                width: "850px",
                height: "250px",
                border: "2px solid #999",
                borderRadius: "10px",
                padding: "10px",
                fontSize: "20px",
              }}
            />
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              margin: "20px 0 0 10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#818181",
              }}
            >
              The Goal Of The Subject
            </Typography>
          </Box>
          <Box
            sx={{
              height: "auto",
              margin: "10px 50px 20px 10px",
            }}
          >
            <TextareaAutosize
              value={goalOfSubject}
              onChange={(e) => {
                setGoalOfSubject(e.target.value);
              }}
              style={{
                width: "850px",
                height: "250px",
                border: "2px solid #999",
                borderRadius: "10px",
                padding: "10px",
                fontSize: "20px",
              }}
            />
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              margin: "20px 0 0 10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#818181",
              }}
            >
              Expected research products of the topic and applicability
            </Typography>
          </Box>
          <Box
            sx={{
              height: "auto",
              margin: "10px 50px 20px 10px",
            }}
          >
            <TextareaAutosize
              value={researchProducts}
              onChange={(e) => {
                setResearchProducts(e.target.value);
              }}
              style={{
                width: "850px",
                height: "250px",
                border: "2px solid #999",
                borderRadius: "10px",
                padding: "10px",
                fontSize: "20px",
              }}
            />
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              margin: "20px 0 0 10px",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#818181",
              }}
            >
              Time to conduct scientific research
            </Typography>
          </Box>
          <Box
            sx={{
              margin: "10px 50px 20px 20px",
              color: "#818181",
              width: "50%",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateRangePicker
                calendars={3}
                value={[startDate, endDate]}
                onChange={(newDates) => {
                  setStartDate(newDates[0]);
                  setEndDate(newDates[1]);
                }}
                minDate={dayjs().add(7, "day")}
                maxDate={dayjs().add(1, "year")}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <Box
          className="btnCreate"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "10px 0 20px 0",
          }}
        >
          <Button
            onClick={onCreateTopic}
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
                backgroundColor: "#818181",
                color: "#000",
              },
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
      <Dialog
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              className="dialogContain"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Topic Name */}
              <Box>
                <Typography sx={{ fontWeight: "bold", color: "#D82C2C" }}>
                  Topic Name:{" "}
                </Typography>
                <Typography sx={{ marginLeft: "10px", fontWeight: "bold" }}>
                  {topicName}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: "bold", color: "#D82C2C" }}>
                  Faculty:{" "}
                </Typography>
                <Typography sx={{ marginLeft: "10px", fontWeight: "bold" }}>
                  {leader?.facultyName}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: "bold", color: "#D82C2C" }}>
                  Leader:{" "}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "10px",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Full Name:{" "}
                  </Typography>
                  <Typography sx={{ marginLeft: "10px" }}>
                    {leader?.studentFullname}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "10px",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    Student Code:{" "}
                  </Typography>
                  <Typography sx={{ marginLeft: "10px" }}>
                    {leader?.studentCode}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "10px",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>Class: </Typography>
                  <Typography sx={{ marginLeft: "10px" }}>
                    {leader?.studentClass}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "10px",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>Faculty: </Typography>
                  <Typography sx={{ marginLeft: "10px" }}>
                    {leader?.facultyName}
                  </Typography>
                </Box>
              </Box>

              {/* team member */}
              <Box>
                <Typography sx={{ fontWeight: "bold", color: "#D82C2C" }}>
                  Team Members:{" "}
                </Typography>
                {members.map((item, index) => (
                  <Box sx={{ marginLeft: "10px" }}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        marginTop: "5px",
                        color: "#ff6666",
                      }}
                    >
                      + Member {index + 1}
                    </Typography>
                    <Box sx={{ marginLeft: "10px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          marginLeft: "10px",
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Full Name:{" "}
                        </Typography>
                        <Typography sx={{ marginLeft: "10px" }}>
                          {item?.studentFullname}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          marginLeft: "10px",
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Student Code:{" "}
                        </Typography>
                        <Typography sx={{ marginLeft: "10px" }}>
                          {item?.studentCode}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          marginLeft: "10px",
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Class:{" "}
                        </Typography>
                        <Typography sx={{ marginLeft: "10px" }}>
                          {item?.studentClass}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          marginLeft: "10px",
                        }}
                      >
                        <Typography sx={{ fontWeight: "bold" }}>
                          Faculty:{" "}
                        </Typography>
                        <Typography sx={{ marginLeft: "10px" }}>
                          {item?.facultyName}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Instructor Name */}
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography sx={{ fontWeight: "bold", color: "#D82C2C" }}>
                  Instructor:{" "}
                </Typography>
                <Typography sx={{ marginLeft: "10px", fontWeight: "bold" }}>
                  {mentor.name}
                </Typography>
              </Box>

              {/* Goal Of The Subject */}
              <Box>
                <Typography sx={{ fontWeight: "bold", color: "#D82C2C" }}>
                  The Goal Of The Subject:
                </Typography>
                <Typography sx={{ marginLeft: "10px", whiteSpace: "pre-line" }}>
                  {goalOfSubject}
                </Typography>
              </Box>

              {/* Expected research products */}
              <Box>
                <Typography sx={{ fontWeight: "bold", color: "#D82C2C" }}>
                  Expected research products of the topic and applicability:
                </Typography>
                <Typography sx={{ marginLeft: "10px", whiteSpace: "pre-line" }}>
                  {researchProducts}
                </Typography>
              </Box>
              {/* Topic Date Start */}
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography sx={{ fontWeight: "bold", color: "#D82C2C" }}>
                  Topic Date Start:{" "}
                </Typography>
                <Typography sx={{ marginLeft: "10px" }}>
                  {startDate?.$D +
                    "/" +
                    (startDate?.$d.getMonth() + 1) +
                    "/" +
                    startDate?.$y}
                </Typography>
              </Box>

              {/* Topic Date End */}
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Typography sx={{ fontWeight: "bold", color: "#D82C2C" }}>
                  Topic Date End:{" "}
                </Typography>
                <Typography sx={{ marginLeft: "10px" }}>
                  {endDate?.$D +
                    "/" +
                    (endDate.$d.getMonth() + 1) +
                    "/" +
                    endDate?.$y}
                </Typography>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Disagree</Button>
          <Button autoFocus onClick={onSubmitTopic}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={isCheckAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert variant="filled" severity={alertType}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CreateProject;
