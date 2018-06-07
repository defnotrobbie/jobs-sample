import React from "react";
import { CircularProgress } from 'material-ui/Progress';

const Loading = () => (
  <div style={{ display: "block", margin: "auto", marginTop: 40,textAlign: "center" }}>
    <CircularProgress />
  </div>
);

export default Loading;
