import React, { useEffect, useCallback, memo } from "react";

import Authorization from "./../containers/authorization"
import ConfirmationForm from "./../components/Confirmation/ConfirmationForm"

// Redux
import { connect } from "react-redux";

function ConfirmationContainer({ auth, history }) {
  return (
    <Authorization>
      <ConfirmationForm />      
    </Authorization>
  );
}


function mapStateToProps({ auth }) {
  return { auth };
}


export default memo(connect(mapStateToProps, null)(ConfirmationContainer));
