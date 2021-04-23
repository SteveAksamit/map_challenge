import React, { forwardRef } from "react";
import { ReactComponent as Svg } from "../map.svg";

const MapSvg = forwardRef((props, ref) => {
  return <Svg ref={ref} />;
});

export default MapSvg;
