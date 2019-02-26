const styles = () => ({
  title: {
    textAlign: "center"
  },
  board: {
    
    backgroundColor: "#00a000",
    color: "#fff",
    padding: 10,
    border: "solid 3px #fff",
    boxShadow: "#000 0 0 5px",
    borderRadius: 30
  },
  listPlayers: {
    position: "relative",
    width: "100%",
    minHeight: 600,
  },
  topPlayer: {
    position: "absolute",
    top: 2,
    left: "40%",
    textAlign: "center",
    minWidth: 200
  },
  rightPlayer: {
    position: "absolute",
    top: "48%",
    right: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 200
  },
  bottomPlayer: {
    position: "absolute",
    bottom: 2,
    left: "40%",
    textAlign: "center",
    minWidth: 200
  },
  leftPlayer: {
    position: "absolute",
    top: "48%",
    left: 2,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    minWidth: 200
  },
  faceSmall: {
    width: 50,
    height: 50,
    position: "relative"
  },
  playerName: {
    paddingTop: 8
  },
  faceTopPlayer: {
    backgroundImage: "url(https://cardgames.io/shared/images/svg/face-2.svg)",
    backgroundPosition: " center !important",
    backgroundRepeat: "no-repeat",
    paddingLeft: "100%"
  },
  faceRightPlayer: {
    backgroundImage: "url(https://cardgames.io/shared/images/svg/face-3.svg)",
    backgroundPosition: " center !important",
    backgroundRepeat: "no-repeat"
  },
  faceBottomPlayer: {
    backgroundImage: "url(https://cardgames.io/shared/images/svg/face-0.svg)",
    backgroundPosition: " center !important",
    backgroundRepeat: "no-repeat",
    paddingLeft: "100%"
  },
  faceLeftPlayer: {
    backgroundImage: "url(https://cardgames.io/shared/images/svg/face-mike.svg)",
    backgroundPosition: " center !important",
    backgroundRepeat: "no-repeat",
    paddingLeft: "100%"
  },
  scoreTable: {
    position: "absolute",
    right: 2,
    top: 2
  },
  tablePadding10px: {
    padding: 10
  },
  wrapperActionButton: {
    display: "flex",
    flexDirection: "column"
  },
  wrapperTopRight: {
    display: "flex",
    alignItem: "center"
  },
  btnStartGame: {
    position: "absolute",
    top: "48%",
    left: "45%"
  },
  card: {
    height: 100
  }
});

export default styles;
