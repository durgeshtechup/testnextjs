import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const valueType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool,
]);

const propTypes = {
  labels: PropTypes.shape({
    left: {
      title: PropTypes.string.isRequired,
      value: valueType,
    },
    center: {
      title: PropTypes.string.isRequired,
      value: valueType,
    },
    right: {
      title: PropTypes.string.isRequired,
      value: valueType,
    },
  }),
  onChange: PropTypes.func.isRequired,
  styles: PropTypes.object,
};

const defaultProps = {
  labels: {
    left: {
      title: "left",
      value: "left",
    },
    center: {
      title: "center",
      value: "center",
    },
    right: {
      title: "right",
      value: "right",
    },
  },
  onChange: (value) => console.log("value:", value),
};

class TripleToggleSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchPosition: "left",
      animation: null,
    };
  }

  getSwitchAnimation = (value) => {
    const { switchPosition } = this.state;
    let animation = null;
    if (value === "center" && switchPosition === "left") {
      animation = "left-to-center";
    } else if (value === "right" && switchPosition === "center") {
      animation = "center-to-right";
    } else if (value === "center" && switchPosition === "right") {
      animation = "right-to-center";
    } else if (value === "left" && switchPosition === "center") {
      animation = "center-to-left";
    } else if (value === "right" && switchPosition === "left") {
      animation = "left-to-right";
    } else if (value === "left" && switchPosition === "right") {
      animation = "right-to-left";
    }
    this.props.onChange(value);
    this.setState({ switchPosition: value, animation });
  };

  render() {
    const { labels } = this.props;

    return (
      <div className="main-container  my-1 ">
      <div
        className={`switch ${this.state.animation} ${this.state.switchPosition}-position`}
      ></div>
      <div>
        <div className="d-flex flex-row" style={{display:"flex"}}>

        <div className="d-flex">

      <input
        defaultChecked
        onChange={(e) => this.getSwitchAnimation(e.target.value)}
        name="map-switch"
        id="left"
        type="radio"
        value="left"
        style={{visibility:"hidden",display:"none",marginBottom:"-10px"}}
      />
      <label
        // className={`left-label mb-3  ${
        //   this.state.switchPosition === "left" && "black-font"
        // }`}
           className={` ${
          this.state.switchPosition === "left" && "black-font"
        }`}
       
        htmlFor="left"
        style={{marginBottom:"25px"}}
      >
        <h4>{labels.left.title}</h4>
      </label>
      </div>

      <div className="d-flex">



      <input
        onChange={(e) => this.getSwitchAnimation(e.target.value)}
        name="map-switch"
        id="center"
        type="radio"
        value="center"
        style={{visibility:"hidden",display:"none",marginBottom:"-10px"}}



      />
      <label
        className={`center-label ${
          this.state.switchPosition === "center" && "black-font"
        }`}
        htmlFor="center"
      >
        <h4>{labels.center.title}</h4>
      </label>
      </div>
      <div className="d-flex">

      <input
        onChange={(e) => this.getSwitchAnimation(e.target.value)}
        name="map-switch"
        id="right"
        type="radio"
        value="right"
        style={{visibility:"hidden",display:"none",marginBottom:"-10px"}}



      />
      <label
        className={`right-label ${
          this.state.switchPosition === "right" && "black-font"
        }`}
        htmlFor="right"
      >
        <h4>{labels.right.title}</h4>
      </label>
      </div>

      </div>
      </div>

  
 
    </div>

    );
  }
}

TripleToggleSwitch.propTypes = propTypes;
TripleToggleSwitch.defaultProps = defaultProps;

export default TripleToggleSwitch;
