import React, { Component } from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { getMaxPoint } from "../../../../helpers/CommonHelper";
import EnhancedButton from "../../../../commons/components/EnhancedButton";

class GameOver extends Component {
  render() {
    const { players, classes } = this.props;
    const maxPoint = getMaxPoint(players.map(player => player.point));
    const listPlayerWinners = players.filter(
      player => player.point === maxPoint
    );
    return (
      <div className={classes.wrapper}>
        <h1>Congratulation the winner is.....</h1>
        <table border={1}>
          <thead>
            <tr>
              <td>Người Chơi</td>
              <td>Điểm</td>
            </tr>
          </thead>
          <tbody>
            {listPlayerWinners.map(player => {
              return (
                <tr key={player.id}>
                  <td>{player.name}</td>
                  <td>{Math.round(player.point)} Điểm</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={classes.wrapperButton}>
          <EnhancedButton
            onClick={this.props.onHandleRestartGame}
            type="primary"
          >
            Chơi Lại
          </EnhancedButton>
        </div>
      </div>
    );
  }
}

GameOver.propTypes = {
  players: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  classes: PropTypes.object.isRequired,
  onHandleRestartGame: PropTypes.func
};

export default withStyles(styles)(GameOver);
