import React from 'react'
import {
    Box,
    Icon,
    Typography,
    Input,
    IconButton,
    Button,
} from "@mui/material";
import { FileUpload, RecentActors } from "@mui/icons-material";
const MentorInformation = () => {
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
                    Profile
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    color: "#D82C2C",
                    padding: "20px 0 0 20px",
                }}
            >
                <RecentActors fontSize="large" />
                <Typography
                    sx={{
                        marginLeft: "5px",
                        fontWeight: "bold",
                        fontSize: "30px",
                    }}
                >
                    PERSONAL INFORMATION
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    padding: "30px 50px 20px 60px",
                }}
            >
                <Box
                    className="Information_User"
                    sx={{
                        display: "flex",
                        marginLeft: "70px",
                    }}
                >
                    <Box
                        className="Infor_Left"
                        sx={{
                            textAlign: "right",
                        }}
                    >
                        <Typography sx={{ fontWeight: "bold" }}>User name:</Typography>
                        <Typography sx={{ fontWeight: "bold" }}>Mentor code:</Typography>
                        <Typography sx={{ fontWeight: "bold" }}>Sex:</Typography>
                        <Typography sx={{ fontWeight: "bold" }}>Date of birth:</Typography>
                        <Typography sx={{ fontWeight: "bold" }}>Email(DTU):</Typography>
                    </Box>
                    <Box
                        className="Infor_Right"
                        sx={{
                            paddingLeft: "20px",
                        }}
                    >
                        <Typography sx={{ fontWeight: "bold" }}>
                            Vũ Như Cẩn
                        </Typography>
                        <Typography>DTU1235678</Typography>
                        <Typography>Male</Typography>
                        <Typography>07/04/1989</Typography>
                        <Typography>vunhucan@dtu.edu.vn</Typography>
                    </Box>
                </Box>
                <Box
                    className="Avatar_User"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginLeft: "auto",
                        paddingRight: "15%",
                    }}
                >
                    <Box
                        sx={{
                            border: "5px solid #D82C2C",
                            alignItems: "center",
                            width: "155px",
                            height: "147px",
                            backgroundColor: "#D9D9D9",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <label htmlFor="upload-file">
                            <IconButton
                                component="span"
                                aria-label="upload-picture"
                                sx={{
                                    width: "100px",
                                    height: "100px",
                                }}
                            >
                                <FileUpload fontSize="large" />
                            </IconButton>
                        </label>
                        <Input id="upload-file" type="file" sx={{ display: "none" }} />
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    borderBottom: "1.5px solid #707070",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        color: "#D82C2C",
                        fontWeight: "bold",
                        paddingLeft: "20px",
                    }}
                >
                    Current Address:
                </Typography>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    padding: "30px 50px 20px 60px",
                }}
            >
                <Box
                    className="Information_User"
                    sx={{
                        display: "flex",
                    }}
                >
                    <Box
                        className="Infor_Left"
                        sx={{
                            textAlign: "right",
                        }}
                    >
                        <Typography sx={{ fontWeight: "bold" }}>
                            Address/Group/Village:
                        </Typography>
                        <Typography sx={{ fontWeight: "bold" }}>Wards:</Typography>
                        <Typography sx={{ fontWeight: "bold" }}>District:</Typography>
                        <Typography sx={{ fontWeight: "bold" }}>City:</Typography>
                        <Typography sx={{ fontWeight: "bold" }}>Nation:</Typography>
                        <Typography sx={{ fontWeight: "bold" }}>Phone:</Typography>
                        <Typography sx={{ fontWeight: "bold" }}>Email(Orther):</Typography>
                    </Box>
                    <Box
                        className="Infor_Right"
                        sx={{
                            paddingLeft: "20px",
                        }}
                    >
                        <Typography>
                            Thôn Cành Lá, xã Cành Cây, huyện Trên Mây, tỉnh Dưới Đất
                        </Typography>
                        <Typography>Cành Cây</Typography>
                        <Typography>Trên Mây</Typography>
                        <Typography>Dưới Đất</Typography>
                        <Typography>Sounth Korea</Typography>
                        <Typography>0329270501</Typography>
                        <Typography>vunhucan247@gmail.com</Typography>
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Button
                    sx={{
                        backgroundColor: "#D9D9D9",
                        border: "5px solid #D82C2C",
                        borderRadius: "20px",
                        width: "150px",
                        height: "50px",
                        color: "#000",
                        fontWeight: "bold",
                        fontSize: "20px",
                    }}
                >
                    Update
                </Button>
            </Box>
        </Box>
    );
}

export default MentorInformation
