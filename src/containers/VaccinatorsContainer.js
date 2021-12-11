import React, { useEffect, useCallback, memo } from "react";

import Authorization from "./authorization"

// Redux
import { connect } from "react-redux";

function VaccinatorsContainer({ auth, history }) {
  return (
    <Authorization>
      <div>
        <span>Redirect to vaccinators endpoint</span>
      </div>
    </Authorization>
  );
}


function mapStateToProps({ auth }) {
  return { auth };
}


export default memo(connect(mapStateToProps, null)(VaccinatorsContainer));
