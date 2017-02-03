import React, { PropTypes } from "react";

class SlideArrow extends React.Component {
  static propTypes = {
    triggerXPosition: PropTypes.number.isRequired,
    onReachedTriggerPosition: PropTypes.func,
  }

  state = {
    held: false,
    holdPosition: 0,
  };

  handleDown = (event) => {
    const clientX = event.clientX || event.touches[0].clientX;
    this.holdOffset = clientX - this.rect.left;
    this.setState({
      held: true,
    });
    this.addDownListeners();
  };

  handleUp = () => {
    this.removeDownListeners();
    this.setState({ held: false });
    this.holdOffset = null;

    // Wait a tick before setting holdPosition so that
    // transition gets set, so that we slide back into
    // place slowly instead of instantly
    setTimeout(() => {
      if (!this._isMounted) { return; }
      this.setState({
        holdPosition: 0,
      });
    }, 0);
  };

  handleMove = (event) => {
    const clientX = event.clientX || event.touches[0].clientX;
    const holdPosition = clientX - this.rect.left - this.holdOffset;

    if (holdPosition < 0) { return; }
    if (holdPosition + this.rect.width > this.props.triggerXPosition) {
      if (this.props.onReachedTriggerPosition) {
        this.props.onReachedTriggerPosition();
      }
      this.handleUp();
      return;
    }

    this.setState({ holdPosition });

    if (this.props.onPositionChanged) {
      this.props.onPositionChanged(holdPosition);
    }
  };

  addDownListeners() {
    document.body.addEventListener("mousemove", this.handleMove);
    document.body.addEventListener("touchmove", this.handleMove);
    document.body.addEventListener("mouseup", this.handleUp);
    document.body.addEventListener("touchend", this.handleUp);
    document.body.addEventListener("touchcancel", this.handleUp);
  }

  removeDownListeners() {
    document.body.removeEventListener("mousemove", this.handleMove);
    document.body.removeEventListener("touchmove", this.handleMove);
    document.body.removeEventListener("mouseup", this.handleUp);
    document.body.removeEventListener("touchend", this.handleUp);
    document.body.removeEventListener("touchcancel", this.handleUp);
  }

  calculateBoundingRect = () => {
    this.rect = this.el.getBoundingClientRect();
  };

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener("resize", this.calculateBoundingRect);
    this.calculateBoundingRect();
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("resize", this.calculateBoundingRect);
    if (this.state.held) {
      this.removeDownListeners();
    }
  }

  render() {
    const {
      held,
      holdPosition,
    } = this.state;

    return (
      <div
        ref={(el) => this.el = el}
        style={{
          height: 32,
          lineHeight: "32px",
          textAlign: "center",
          width: 48,
          fontSize: 24,
          borderRadius: 8,
          backgroundColor: held ? "rgb(130, 130, 130)" : "rgb(169, 169, 169)",
          color: held ? "rgb(65, 65, 65)" : "rgb(84, 84, 84)",
          position: "absolute",
          transition: held ? "" : "left 0.5s ease-out",
          cursor: "pointer",
          left: holdPosition,
        }}
        onMouseDown={this.handleDown}
        onTouchStart={this.handleDown}
      >
        {">"}
      </div>
    );
  }
}

export default class SlideToUnlock extends React.Component {
  static propTypes = {
    onSlide: PropTypes.func,
  };

  state = {
    triggerXPosition: 99999,
  };

  componentDidMount() {
    window.addEventListener("resize", this.calculateTriggerXPosition);
    this.calculateTriggerXPosition();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.calculateTriggerXPosition);
  }

  calculateTriggerXPosition = () => {
    if (!this.arrowHolder) { return; }
    this.setState({
      triggerXPosition: this.arrowHolder.getBoundingClientRect().width,
    });
  };

  render() {
    const { onSlide } = this.props;
    const { triggerXPosition } = this.state;

    return (
      <div
        style={{
          color: "white",
          backgroundColor: "rgba(55, 55, 55, 0.5)",
          fontSize: 16,
          height: 64,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
        }}
      >
        <div
          ref={(el) => this.arrowHolder = el}
          style={{
            height: 32,
            lineHeight: "32px",
            width: "calc(100% - 32px)",
            maxWidth: "400px",
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderRadius: 8,
            position: "relative",
          }}
        >
          <SlideArrow
            triggerXPosition={triggerXPosition}
            onReachedTriggerPosition={onSlide}
          />
          Slide to unlock
        </div>
      </div>
    );
  }
}