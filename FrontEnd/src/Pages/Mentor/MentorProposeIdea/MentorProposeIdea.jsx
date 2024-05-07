import {
  Box,
  Icon,
  Typography,
  Input,
  IconButton,
  Button,
  TextareaAutosize,
  TextField,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import { React, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ListAlt, NoteAdd, CancelPresentation } from "@mui/icons-material"
import { createProposeIdea } from '../../../api/proposeIdeaApi'


const MentorProposeIdea = () => {
  const [ideaName, setIdeaName] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [ideaGoalSubject, setIdeaGoalSubject] = useState('');
  const [ideaExpectedResearch, setIdeaExpectedResearch] = useState('');
  const [otherNotes, setOtherNotes] = useState('');
  const [message, setMessage] = useState('');
  const [isCheckAlert, setIsCheckAlert] = useState(false);
  const [alertType, setAlertType] = useState('error');
  const [openDialog, setOpenDialog] = useState(false);

  const onOpenDialog = () => {
    setMessage('Please fill in the Other Notes field');
    (!otherNotes) && setMessage(`Please fill in the field "Other Notes"`);
    (!ideaExpectedResearch) && setMessage(`please fill in the field "Idea expected research products of the topic and applicability"`);
    (!ideaGoalSubject) && setMessage(`please fill in the field "Idea Goal Of The Subject"`);
    (!ideaDescription) && setMessage(`please fill in the field "Idea Description"`);
    (!ideaName) && setMessage(`please fill in the field "Idea Name"`);
    if (!ideaName || !ideaDescription || !ideaGoalSubject || !ideaExpectedResearch || !otherNotes) {
      setAlertType('error');
      setIsCheckAlert(true);
      setTimeout(() => {
        setIsCheckAlert(false);
      }, 4000)
    } else {
      setOpenDialog(true);
    }
  }

  const onCreateProposeIdea = async () => {
    const res = await createProposeIdea({
      ideaName: ideaName,
      ideaDescription: ideaDescription,
      ideaGoalSubject: ideaGoalSubject,
      ideaExpectedResearch: ideaExpectedResearch,
      otherNotes: otherNotes,
    })
    if (res.status === 200) {
      console.log(res);
      setOpenDialog(false);
      setAlertType('success');
      setMessage(res.data);
      setIdeaName('');
      setIdeaDescription('');
      setIdeaGoalSubject('');
      setIdeaExpectedResearch('');
      setOtherNotes('');
    } else {
      setOpenDialog(false)
      setAlertType('error');
      setMessage(res.data);
    }
    setIsCheckAlert(true);
    setTimeout(() => {
      setIsCheckAlert(false);
    }, 4000)
  }

  const formatContent = (text) => {
    if (typeof text !== 'string') {
      return [];
    }

    const lines = text.split('\n').map((line, index) => {
      return (
        <div key={index} style={{ textIndent: `20px`, marginBottom: `10px` }}>
          {line}
        </div>
      );
    });

    return lines;
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '50px'
    }}>
      <Box sx={{
        flex: '1'
      }}>
        <Typography sx={{
          marginLeft: '50px',
          marginTop: '56px',
          fontSize: '30px',
          fontWeight: 'bold',
          color: '#D82C2C'
        }}>
          Create ProposeIdea
        </Typography>
      </Box>
      <Box className="proposeIdeaContain" sx={{
        flex: '5',
        display: 'flex',
        flexDirection: 'row'
      }}>
        <Box className="postIdea" sx={{
          flex: '1.5',
          display: 'flex',
          flexDirection: 'column',
          margin: "0 50px 0 70px",
          gap: '30px'
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#D82C2C",
                marginTop: "50px"
              }}
            >
              Idea Name
            </Typography>
            <TextField
              size="small"
              value={ideaName}
              onChange={(e) => { setIdeaName(e.target.value) }}
              sx={{
                width: "95%",
                '& input': {
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1e385d',
                  border: '1px solid #999',
                  borderRadius: '5px'
                },
              }}
            />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#D82C2C",
              }}
            >
              Idea Description
            </Typography>
            <TextareaAutosize
              value={ideaDescription}
              onChange={(e) => { setIdeaDescription(e.target.value) }}
              style={{
                width: "95%",
                height: "250px",
                border: "1px solid #999",
                borderRadius: "5px",
                padding: "10px",
                fontSize: "20px",
              }}
            />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#D82C2C"
              }}
            >
              Idea Goal Of The Subject
            </Typography>
            <TextareaAutosize
              value={ideaGoalSubject}
              onChange={(e) => { setIdeaGoalSubject(e.target.value) }}
              style={{
                width: "95%",
                height: "250px",
                border: "1px solid #999",
                borderRadius: "5px",
                padding: "10px",
                fontSize: "20px",
              }}
            />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#D82C2C"
              }}
            >
              Idea expected research products of the topic and applicability
            </Typography>
            <TextareaAutosize
              value={ideaExpectedResearch}
              onChange={(e) => { setIdeaExpectedResearch(e.target.value) }}
              style={{
                width: "95%",
                height: "250px",
                border: "1px solid #999",
                borderRadius: "5px",
                padding: "10px",
                fontSize: "20px",
              }}
            />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#D82C2C"
              }}
            >
              Other notes
            </Typography>
            <TextareaAutosize
              value={otherNotes}
              onChange={(e) => { setOtherNotes(e.target.value) }}
              style={{
                width: "95%",
                height: "50px",
                border: "1px solid #999",
                borderRadius: "5px",
                padding: "10px",
                fontSize: "20px",
              }}
            />
          </Box>
        </Box>
        <Box className="proposedProjects" sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1'
        }}>
          <Box className="nameProjects" sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
            height: '633px',
            background: '#F6E6E6',
            borderRadius: '20px',
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              margin: '20px 0 0 30px',
              gap: '20px'
            }}>
              <ListAlt fontSize="large" sx={{ color: '#707070' }} />
              <Typography sx={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#707070'
              }}>
                Proposed Projects
              </Typography>
            </Box>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              margin: '30px 0 0 50px',
              gap: '40px'
            }}>

              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '20px'
              }}>
                <Typography sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#707070'
                }}>
                  1
                </Typography>
                <Typography sx={{
                  fontSize: '20px',
                  color: '#707070'
                }}>
                  Baby vaccine tracker
                </Typography>
              </Box>

              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '20px'
              }}>
                <Typography sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#707070'
                }}>
                  2
                </Typography>
                <Typography sx={{
                  fontSize: '20px',
                  color: '#707070'
                }}>
                  ETickets - QR code for coaches tickets
                </Typography>
              </Box>

              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '20px'
              }}>
                <Typography sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#707070'
                }}>
                  3
                </Typography>
                <Typography sx={{
                  fontSize: '20px',
                  color: '#707070'
                }}>
                  SyncStudy
                </Typography>
              </Box>

              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '20px'
              }}>
                <Typography sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#707070'
                }}>
                  4
                </Typography>
                <Typography sx={{
                  fontSize: '20px',
                  color: '#707070'
                }}>
                  Open Al
                </Typography>
              </Box>

              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '20px'
              }}>
                <Typography sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#707070'
                }}>
                  5
                </Typography>
                <Typography sx={{
                  fontSize: '20px',
                  color: '#707070'
                }}>
                  Quick Exam
                </Typography>
              </Box>

              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '20px'
              }}>
                <Typography sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#707070'
                }}>
                  6
                </Typography>
                <Typography sx={{
                  fontSize: '20px',
                  color: '#707070'
                }}>
                  Easy CV - Create a smart CV
                </Typography>
              </Box>

              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '20px'
              }}>
                <Typography sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#707070'
                }}>
                  7
                </Typography>
                <Typography sx={{
                  fontSize: '20px',
                  color: '#707070'
                }}>
                  Traveloka - Smart travel
                </Typography>
              </Box>

            </Box>
          </Box>
          <Box className="proposeButton" sx={{
            display: 'flex',
            flexDirection: 'row',
            margin: '50px 0 0 0',
            alignItems: "center",
            justifyContent: "center",
            gap: '30px'
          }}>
            <Button
              onClick={onOpenDialog}
              sx={{
                backgroundColor: "#fff",
                border: "5px solid #D82C2C",
                borderRadius: "15px",
                width: "150px",
                height: "50px",
                color: "#000",
                fontWeight: "bold",
                fontSize: "20px"
              }}>
              Add
            </Button>

            <Button sx={{
              backgroundColor: "#D9D9D9",
              border: "5px solid #D82C2C",
              borderRadius: "20px",
              width: "150px",
              height: "50px",
              color: "#000",
              fontWeight: "bold",
              fontSize: "20px"
            }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog sx={{
        '& .MuiDialog-paper': {
          width: '80%',
          maxWidth: 'lg',
        },
      }}
        open={openDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: '#D82C2C', fontWeight: 'bold', fontSize: '25px' }}>
          {`Read the information carefully before creating "Propose Idea!"`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box className="dialogContain" sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}>
              {/* Idea Name */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d', textDecoration: 'underline', fontSize: '20px' }}>Idea Name: </Typography>
                <Typography sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#D82C2C', fontSize: '17px' }}>{ideaName}</Typography>
              </Box>

              {/* Idea Description */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d', textDecoration: 'underline', fontSize: '20px' }}>Idea Description: </Typography>
                <Typography sx={{ marginLeft: '10px', color: '#718199', fontSize: '17px' }}>{formatContent(ideaDescription)}</Typography>
              </Box>

              {/* Idea Goal Of The Subject */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d', textDecoration: 'underline', fontSize: '20px' }}>Idea Goal Of The Subject: </Typography>
                <Typography sx={{ marginLeft: '10px', color: '#718199', fontSize: '17px' }}>{formatContent(ideaGoalSubject)}</Typography>
              </Box>

              {/* Idea expected research products of the topic and applicability */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d', textDecoration: 'underline', fontSize: '20px' }}>Idea expected research products of the topic and applicability: </Typography>
                <Typography sx={{ marginLeft: '10px', color: '#718199', fontSize: '17px' }}>{formatContent(ideaExpectedResearch)}</Typography>
              </Box>

              {/* Other notes */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Typography sx={{ fontWeight: 'bold', color: '#1e385d', textDecoration: 'underline', fontSize: '20px' }}>Other notes: </Typography>
                <Typography sx={{ marginLeft: '10px', color: '#718199', fontSize: '17px' }}>{formatContent(otherNotes)}</Typography>
              </Box>


            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ gap: '10px' }}>
          <Button sx={{
            textTransform: 'none',
            fontSize: '17px',
            gap: '5px',
            border: '1px solid #1e385d',
            width: '100px',
            background: '#1e385d',
            color: '#fff',
            '&:hover': {
              background: '#fff',
              color: '#1e385d',
              borderColor: '#1e385d',
            },
          }} onClick={() => setOpenDialog(false)}>
            <CancelPresentation />Cancel
          </Button>
          <Button
            sx={{
              textTransform: 'none',
              fontSize: '17px',
              gap: '5px',
              border: '1px solid #D82C2C',
              width: '150px',
              background: '#D82C2C',
              color: '#fff',
              '&:hover': {
                background: '#fff',
                color: '#D82C2C',
                borderColor: '#D82C2C',
              },
            }}
            autoFocus onClick={onCreateProposeIdea}>
            <NoteAdd /> Create Idea
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={isCheckAlert} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert variant="filled" severity={alertType}>{message}</Alert>
      </Snackbar>
    </Box>
  )
}

export default MentorProposeIdea

