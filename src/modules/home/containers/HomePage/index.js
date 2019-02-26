import { withStyles } from "@material-ui/core/styles";
import cn from "classnames";
import { UpsertModal } from "commons/components";
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
import { drawCard, loadDeck, revealAllCard, startGame } from "../../actions";
import GameOver from "../../components/GameOver";
import { FEATURE_NAME, THREE_FIRST, THREE_FIRST_TEXT } from "../../constants";
import reducer from "./../../reducers/home";
import saga from "./../../sagas/home";
import {
  selectAllPlayers,
  selectCurrentRound,
  selectDrawStatus,
  selectIsGameOver,
  selectShuffled,
  selectShuffleLoading
} from "./../../selectors";
import styles from "./styles";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.handleDraw = this.handleDraw.bind(this);
    this.handleRevealAll = this.handleRevealAll.bind(this);
    this.handleCloseModalGameOver = this.handleCloseModalGameOver.bind(this);
  }

  componentDidMount() {
    const { loadDeck } = this.props;
    if (loadDeck) {
      loadDeck();
    }
  }

  handleCloseModalGameOver() {
    window.location.reload();
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

  handleRevealAll() {
    const { revealAllCard } = this.props;
    if (revealAllCard) {
      revealAllCard();
    }
  }

  renderScoreTable() {
    const { classes, isShuffled, isDrawing, isGameOver, isShuffleLoading } = this.props;
    const players = this.getPlayers();
    let xhtml = null;
    xhtml = (
      <div className={classes.wrapperTopRight}>
        <div className={classes.wrapperActionButton}>
          <EnhancedButton
            disabled={isShuffled || isGameOver || isShuffleLoading}
            loading={isShuffleLoading}
            onClick={this.handleStartGame}
          >
            Shuffle
          </EnhancedButton>
          <EnhancedButton
            className="marginTop10px"
            disabled={!isShuffled || isDrawing || isGameOver || isShuffleLoading}
            onClick={this.handleDraw}
          >
            Draw
          </EnhancedButton>
          <EnhancedButton
            className="marginTop10px"
            disabled={!isShuffled || !isDrawing || isGameOver || isShuffleLoading}
            onClick={this.handleRevealAll}
          >
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
    const players = this.getPlayers();
    let renderCard = null;
    if (players[0] && players[0].point > 0) {
      renderCard = (
        <>
          {players[0].cards.length > 0 &&
            players[0].cards[0].isFaceDown &&
            this.renderCardFaceDown()}
          {players[0].cards.length > 0 &&
            players[0].cards[0].isFaceDown === false &&
            this.renderCardFaceUp(players[0])}
        </>
      );
    }
    let xhtml = null;
    xhtml = (
      <div className={classes.topPlayer}>
        <div className={cn(classes.faceSmall, classes.faceTopPlayer)} />
        <span className={classes.playerName}>{players[0].name}</span>
        {renderCard}
      </div>
    );
    return xhtml;
  }

  renderRightPlayer() {
    const { classes } = this.props;
    const players = this.getPlayers();
    let xhtml = null;
    let renderCard = null;
    if (players[1] && players[1].point > 0) {
      renderCard = (
        <>
          {players[1].cards.length > 0 &&
            players[1].cards[0].isFaceDown &&
            this.renderCardFaceDown()}
          {players[1].cards.length > 0 &&
            players[1].cards[0].isFaceDown === false &&
            this.renderCardFaceUp(players[1])}
        </>
      );
    }
    xhtml = (
      <div className={classes.rightPlayer}>
        <div className={cn(classes.faceSmall, classes.faceRightPlayer)} />
        <span className={classes.playerName}>{players[1].name}</span>
        {renderCard}
      </div>
    );
    return xhtml;
  }

  renderBottomPlayer() {
    const { classes } = this.props;
    let xhtml = null;
    const players = this.getPlayers();
    xhtml = (
      <div className={classes.bottomPlayer}>
        <div className={cn(classes.faceSmall, classes.faceBottomPlayer)} />
        <span className={classes.playerName}>{players[2].name}</span>
        {this.renderMyCards()}
      </div>
    );
    return xhtml;
  }

  renderLeftPlayer() {
    const { classes } = this.props;
    let xhtml = null;
    const players = this.getPlayers();
    let renderCard = null;
    if (players[3] && players[3].point > 0) {
      renderCard = (
        <>
          {players[3].cards.length > 0 &&
            players[3].cards[0].isFaceDown &&
            this.renderCardFaceDown()}
          {players[3].cards.length > 0 &&
            players[3].cards[0].isFaceDown === false &&
            this.renderCardFaceUp(players[3])}
        </>
      );
    }
    xhtml = (
      <div className={classes.leftPlayer}>
        <div className={cn(classes.faceSmall, classes.faceLeftPlayer)} />
        <span className={classes.playerName}>{players[3].name}</span>
        {renderCard}
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
          className={cn(
            classes.card,
            i === 1 ? classes.marginHorizontal5px : ""
          )}
          key={i}
          src="https://ic.pics.livejournal.com/dailyafirmation/691132/529371/529371_original.jpg"
        />
      );
    }
    return <div className={classes.wrapperCard}>{xhtml}</div>;
  }

  renderCardFaceUp(player) {
    const { classes } = this.props;
    let xhtml = [];
    if (player && player.cards && player.cards.length > 0) {
      for (let i = 0; i < 3; i++) {
        xhtml.push(
          <img
            alt=""
            className={cn(
              classes.card,
              i === 1 ? classes.marginHorizontal5px : ""
            )}
            key={i}
            src={player.cards[i].image}
          />
        );
      }
    }
    return (
      <div className={classes.wrapperCard}>
        {this.renderPoint(player)}
        {xhtml}
      </div>
    );
  }

  renderPoint(player) {
    const { classes } = this.props;
    let xhtml = null;
    if (player && player.value) {
      let point = player.value;
      if (point === THREE_FIRST) {
        xhtml = <span className={classes.point}>{THREE_FIRST_TEXT}</span>;
      } else if (point === "0") {
        xhtml = <span className={cn(classes.point, classes.bu)}>Bù</span>;
      } else {
        xhtml = <span className={classes.point}>{point} Điểm</span>;
      }
    }
    return xhtml;
  }

  getPlayers() {
    let players = [];
    if (this.props.players instanceof Array) {
      players = this.props.players;
    } else {
      players = this.props.players.toJS();
    }
    return players;
  }

  renderMyCards() {
    const { classes } = this.props;
    const players = this.getPlayers();
    const me = players.find(player => player.isMine === true);
    let xhtml = [];
    if (me && me.cards && me.cards.length > 0) {
      for (let i = 0; i < 3; i++) {
        xhtml.push(
          <img
            alt=""
            className={cn(
              classes.card,
              i === 1 ? classes.marginHorizontal5px : ""
            )}
            key={i}
            src={me.cards[i].image}
          />
        );
      }
    }
    if (me.point > 0) {
      return (
        <div className={classes.wrapperCard}>
          {xhtml}
          {this.renderPoint(me)}
        </div>
      );
    } else {
      return null;
    }
  }

  renderAllPlayers() {
    const { classes, currentRound } = this.props;
    const players = this.getPlayers();
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
    const { classes, players, isGameOver } = this.props;
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
        <UpsertModal
          content={
            <GameOver
              onHandleRestartGame={this.handleCloseModalGameOver}
              players={players}
            />
          }
          isShow={isGameOver}
          onClose={this.handleCloseModalGameOver}
          title="Game Over"
        />
      </HomeLayout>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  players: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  currentRound: PropTypes.number.isRequired,
  loadDeck: PropTypes.func,
  startGame: PropTypes.func,
  drawCard: PropTypes.func,
  revealAllCard: PropTypes.func,
  isShuffled: PropTypes.bool,
  isDrawing: PropTypes.bool,
  isGameOver: PropTypes.bool,
  isShuffleLoading: PropTypes.bool
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
    },
    revealAllCard: () => {
      dispatch(revealAllCard());
    }
  };
};

const mapStateToProps = createStructuredSelector({
  players: selectAllPlayers(),
  currentRound: selectCurrentRound(),
  isShuffled: selectShuffled(),
  isDrawing: selectDrawStatus(),
  isGameOver: selectIsGameOver(),
  isShuffleLoading: selectShuffleLoading()
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
