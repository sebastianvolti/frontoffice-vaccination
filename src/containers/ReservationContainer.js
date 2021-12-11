import React, { useEffect, useCallback, memo } from "react";

import Authorization from "./../containers/authorization"
import ReservationForm from "./../components/Reservation/ReservationForm"

// Redux
import { connect } from "react-redux";

function ReservationContainer({ auth, history }) {
  return (
    <Authorization>
      <ReservationForm />      
    </Authorization>
  );
}


function mapStateToProps({ auth }) {
  return { auth };
}


export default memo(connect(mapStateToProps, null)(ReservationContainer));
