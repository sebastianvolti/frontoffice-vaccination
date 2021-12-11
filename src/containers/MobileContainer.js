import React, { useEffect, useCallback, memo } from "react";

import Authorization from "./authorization"

// Redux
import { connect } from "react-redux";

function MobileContainer({ auth, history }) {
  return (
    <Authorization>
      <div>
        <span>Redirect to mobile endpoint</span>
      </div>
    </Authorization>
  );
}


function mapStateToProps({ auth }) {
  return { auth };
}


export default memo(connect(mapStateToProps, null)(MobileContainer));
