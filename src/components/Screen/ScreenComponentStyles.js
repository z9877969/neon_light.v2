const styles = {
  container: ({ isMobile, isTablet, isDesktop, selectedBackground }) => ({
    width: isMobile
      ? "100%"
      : isTablet
      ? "704px"
      : isDesktop
      ? "742px"
      : "335px",
    height: isTablet ? "640px" : "420px",
    backgroundImage: selectedBackground ? `url(${selectedBackground})` : "",
    backgroundColor: selectedBackground ? "" : "#121417",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "10px",
    position: "relative",
  }),
  radioGroup: (isTablet) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: isTablet ? "flex-end" : "flex-start",
    position: "absolute",
    bottom: "16px",
    right: "16px",
    gap: "8px",
  }),
  icon: (isTablet) => ({
    height: isTablet ? "64px" : "40px",
    width: isTablet ? "64px" : "40px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    cursor: "pointer",
    borderRadius: "6px",
  }),
  text: (isTablet) => ({
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "18px",
    letterSpacing: "0em",
    textAlign: "right",
    color: "#FFFFFF",
    position: "absolute",
    bottom: isTablet ? "88px" : "64px",
    right: "24px",
  }),
  canvasContainer: {
    position: "relative",
  },
  canvasHeight: (isTablet) => ({
    position: "absolute",
    color: "rgba(255, 255, 255, 0.5)",
    top: isTablet ? "45px" : "33px",
    bottom: isTablet ? "5px" : "-5px",
    left: isTablet ? "-45px" : "-25px",
    fontSize: "14px",
    borderRight: "1px solid #fff",
    display: "flex",
    alignItems: "center",
    paddingRight: "10px",
    width: isTablet ? "37px" : "17px",
    boxSizing: "content-box",
    textAlign: "right",
  }),
  canvasWidth: {
    position: "absolute",
    color: "rgba(255, 255, 255, 0.5)",
    bottom: "-45px",
    fontSize: "14px",
    left: "15px",
    right: "-15px",
    borderTop: "1px solid #fff",
    paddingTop: "10px",
    textAlign: "center",
  },
  canvasWrapper: (isTablet) => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
    height: isTablet ? "85%" : "75%",
    wordWrap: "break-word",
    fontWeight: 400,
  }),
  customSwitchMobile: {
    position: "absolute",
    top: "18px",
    right: "14px",
  },
  customSwitchTablet: {
    position: "absolute",
    top: "24px",
    right: "24px",
  },
  price: (isTablet) => ({
    position: "absolute",
    top: isTablet ? 24 : 18,
    left: isTablet ? 24 : 14,

    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: "16px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "6px",
    padding: 12,
  }),
};

export default styles;
