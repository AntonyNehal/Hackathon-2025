import React from "react";
import gsap from "gsap";
import SwatchWrapper from "./swatchWrapper";
class Canvas extends React.Component {
  render() {
    const { activeData, swatchData, handleSwatchClick } = this.props;
    return (
      <div className="w-full h-3/5 relative z-10 lg:w-1/2 lg:h-full">
        <SwatchWrapper
          activeData={activeData}
          swatchData={swatchData}
          handleSwatchClick={handleSwatchClick}
        />
      </div>
    );
  }
}

export default Canvas;
