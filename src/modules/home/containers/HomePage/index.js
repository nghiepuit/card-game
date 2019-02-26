import { withStyles } from "@material-ui/core/styles";
import cn from "classnames";
import { HomeLayout } from "commons/layouts";
import injectReducer from "core/reducer/inject-reducer";
import injectSaga from "core/saga/inject-saga";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import EnhancedButton from "../../../../commons/components/EnhancedButton";
import { loadDeck, startGame, drawCard } from "../../actions";
import { FEATURE_NAME } from "../../constants";
import reducer from "./../../reducers/home";
import saga from "./../../sagas/home";
import {
  selectAllPlayers,
  selectCurrentRound,
  selectShuffled
} from "./../../selectors";
import styles from "./styles";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleDraw = this.handleDraw.bind(this);
  }

  componentDidMount() {
    const { loadDeck } = this.props;
    if (loadDeck) {
      loadDeck();
    }
  }

  handleStartGame() {
    const { startGame } = this.props;
    if (startGame) {
      startGame();
    }
  }

  handleDraw() {
    const { drawCard } = this.props;
    if (drawCard) {
      drawCard();
    }
  }

  renderScoreTable() {
    const { classes, isShuffled } = this.props;
    let players = [];
    if (this.props.players instanceof Array) {
      players = this.props.players;
    } else {
      players = this.props.players.toJS();
    }
    let xhtml = null;
    xhtml = (
      <div className={classes.wrapperTopRight}>
        <div className={classes.wrapperActionButton}>
          <EnhancedButton disabled={isShuffled}
            onClick={this.handleStartGame}>
            Shuffle
          </EnhancedButton>
          <EnhancedButton
            className="marginTop10px"
            disabled={!isShuffled}
            onClick={this.handleDraw}
          >
            Draw
          </EnhancedButton>
          <EnhancedButton className="marginTop10px"
            disabled={!isShuffled}>
            Reveal
          </EnhancedButton>
        </div>
        <table border={1}
          className="marginLeft10px">
          <thead>
            <tr>
              <td className={classes.tablePadding10px}>Player</td>
              <td className={classes.tablePadding10px}>Point</td>
            </tr>
          </thead>
          <thead>
            {players.map(player => {
              return (
                <tr key={player.id}>
                  <td className={classes.tablePadding10px}>
                    {player.name} {player.isMine ? "(me)" : ""}
                  </td>
                  <td className={classes.tablePadding10px}>
                    {player.point} point
                  </td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>
    );
    return xhtml;
  }

  renderTopPlayer() {
    const { classes } = this.props;
    let players = [];
    if (this.props.players instanceof Array) {
      players = this.props.players;
    } else {
      players = this.props.players.toJS();
    }
    let xhtml = null;
    xhtml = (
      <div className={classes.topPlayer}>
        <div className={cn(classes.faceSmall, classes.faceTopPlayer)} />
        <span className={classes.playerName}>{players[0].name}</span>
        {players[0].cards.length > 0 &&
          players[0].cards[0].isFaceDown &&
          this.renderCardFaceDown()}
      </div>
    );
    return xhtml;
  }

  renderRightPlayer() {
    const { classes } = this.props;
    let players = [];
    if (this.props.players instanceof Array) {
      players = this.props.players;
    } else {
      players = this.props.players.toJS();
    }
    let xhtml = null;
    xhtml = (
      <div className={classes.rightPlayer}>
        <div className={cn(classes.faceSmall, classes.faceRightPlayer)} />
        <span className={classes.playerName}>{players[1].name}</span>
        {players[0].cards.length > 0 &&
          players[0].cards[0].isFaceDown &&
          this.renderCardFaceDown()}
      </div>
    );
    return xhtml;
  }

  renderBottomPlayer() {
    const { classes } = this.props;
    let xhtml = null;
    let players = [];
    if (this.props.players instanceof Array) {
      players = this.props.players;
    } else {
      players = this.props.players.toJS();
    }
    xhtml = (
      <div className={classes.bottomPlayer}>
        <div className={cn(classes.faceSmall, classes.faceBottomPlayer)} />
        <span className={classes.playerName}>{players[2].name}</span>
        {players[0].cards.length > 0 &&
          players[0].cards[0].isFaceDown &&
          this.renderCardFaceDown()}
      </div>
    );
    return xhtml;
  }

  renderLeftPlayer() {
    const { classes } = this.props;
    let xhtml = null;
    let players = [];
    if (this.props.players instanceof Array) {
      players = this.props.players;
    } else {
      players = this.props.players.toJS();
    }
    xhtml = (
      <div className={classes.leftPlayer}>
        <div className={cn(classes.faceSmall, classes.faceLeftPlayer)} />
        <span className={classes.playerName}>{players[3].name}</span>
        {players[0].cards.length > 0 &&
          players[0].cards[0].isFaceDown &&
          this.renderCardFaceDown()}
      </div>
    );
    return xhtml;
  }

  renderCardFaceDown() {
    const { classes } = this.props;
    let xhtml = [];
    for (let i = 0; i < 3; i++) {
      xhtml.push(
        <img
          alt=""
          className={classes.card}
          key={i}
          src="https://ic.pics.livejournal.com/dailyafirmation/691132/529371/529371_original.jpg"
        />
      );
    }
    return <div className={classes.wrapperCard}>{xhtml}</div>;
  }

  renderAllPlayers() {
    const { classes, currentRound } = this.props;
    let players = [];
    if (this.props.players instanceof Array) {
      players = this.props.players;
    } else {
      players = this.props.players.toJS();
    }
    let xhtml = null;
    if (players && players.length > 0) {
      xhtml = (
        <div className={classes.listPlayers}>
          {this.renderTopPlayer()}
          {this.renderRightPlayer()}
          {this.renderBottomPlayer()}
          {this.renderLeftPlayer()}
          <div className={classes.scoreTable}>{this.renderScoreTable()}</div>
          <div className={classes.round}>Round: {currentRound}</div>
        </div>
      );
    }
    return xhtml;
  }

  renderBoard() {
    const { classes } = this.props;
    let xhtml = null;
    xhtml = <div className={classes.board}>{this.renderAllPlayers()}</div>;
    return xhtml;
  }

  render() {
    const { classes } = this.props;
    return (
      <HomeLayout>
        <Helmet>
          <title>Card Game</title>
          <meta content="Card Game"
            name="Card Game" />
        </Helmet>
        <div className="marginTop20px">
          <h1 className={classes.title}>Card Game</h1>
          <div className={classes.container}>{this.renderBoard()}</div>
        </div>
      </HomeLayout>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  players: PropTypes.oneOfType(PropTypes.object, PropTypes.array),
  currentRound: PropTypes.number.isRequired,
  loadDeck: PropTypes.func,
  startGame: PropTypes.func,
  drawCard: PropTypes.func,
  isShuffled: PropTypes.bool
};

HomePage.defaultProps = {};

const mapDispatchToProps = dispatch => {
  return {
    loadDeck: () => {
      dispatch(loadDeck());
    },
    startGame: () => {
      dispatch(startGame());
    },
    drawCard: () => {
      dispatch(drawCard());
    }
  };
};

const mapStateToProps = createStructuredSelector({
  players: selectAllPlayers(),
  currentRound: selectCurrentRound(),
  isShuffled: selectShuffled()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: FEATURE_NAME, reducer });
const withSaga = injectSaga({
  key: FEATURE_NAME,
  saga
});

export default compose(
  withReducer,
  withSaga,
  withConnect
)(withStyles(styles)(HomePage));
