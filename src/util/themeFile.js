export default {
  palette: {
    primary: {
      light: "#4fb0c6",
      main: "#4f86c6",
      dark: "#D0B8AC",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#B8DFF5",
      main: "#ffaf85",
      dark: "#074F73",
      contrastText: "#FFFFFF",
    },
  },
  spread: {
    typography: {
      useNextVariants: true,
    },
    form: {
      textAlign: "Center",
    },
    pageTitle: {},
    button: {
      margin: "10px auto 10px auto",
      position: "relative",
    },
    textField: {
      margin: "10px auto 10px auto",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: "10px",
    },
    loadingSpinner: {
      position: "absolute",
    },
    invisibleSeparator: {
      border: "none",
      margin: "4",
    },
    profileTheme: {
      paper: {
        padding: 20,
      },
      profile: {
        "& .image-wrapper": {
          textAlign: "center",
          position: "relative",
          "& button": {
            position: "absolute",
            top: "80%",
            left: "70%",
          },
        },
        "& .profile-image": {
          width: 200,
          height: 200,
          objectFit: "cover",
          maxWidth: "100%",
          borderRadius: "50%",
        },
        "& hr": {
          border: "none",
          margin: "0 0 10px 0",
        },
        "& svg.button": {
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
      buttons: {
        textAlign: "center",
        "& a": {
          margin: "20px 10px",
        },
      },
    },
    barkDialogTheme: {
      profileImage: {
        maxWidth: 200,
        height: 200,
        //borderRadius: "50%",
        objectFit: "cover",
      },
      dialogContent: { padding: 20 },
      closeButton: { position: "absolute", left: "90%", top: "4%" },
      expandButton: { position: "absolute", left: "90%" },
      spinner: { textAlign: "center", marginTop: 50, marginBottom: 50 },
    },
    barkPostTheme: {
      card: {
        position: "relative",
        display: "flex",
        marginBottom: 20,
      },
      image: {
        minWidth: 150,
      },
      content: {
        padding: 25,
        objectFit: "cover",
      },
    },
    submitButton: {
      position: "relative",
      marginBottom: "10px",
      float: "right",
      marginTop: "10px",
    },
    progressSpinner: { position: "absolute" },
    closeButton: { position: "absolute", left: "90%", top: "6%" },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20,
    },
    barkSkeletonTheme : {
      card: { display: "flex", marginBottom: 20 },
      cardContent: {
        width: "100%",
        flexDirection: "column",
        padding: 25,
      },
      cover: {
        minWidth: 150,
        objectFit: "cover",
      },
      
      date: {
        width: 100,
        height: 15,
        marginBottom:10,
        backgroundColor: 'rgba(0,0,0,0.3)',
      },
      fullLine: {
        width: "90%",
        height: 15,
        marginBottom:10,
        backgroundColor: 'rgba(0,0,0,0.6)',
      },
      halfLine: {
        width: "45%",
        height: 15,
        marginBottom:10,
        backgroundColor: 'rgba(0,0,0,0.5)',
      },
    }
  },
  
};
