import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';

import { flush } from "./../redux/index";

// Redux
import { connect } from "react-redux";

function LogoutCallback({ auth, history }) {

  useEffect(() => {
    flush();
    history.replace("/inicio")
  }, [history, auth]);

  return (
    <div>
      <span>Cargando...</span>
    </div>
  );
}


function mapStateToProps({ auth }) {
  return { auth };
}

export default withRouter(connect(mapStateToProps, null)(LogoutCallback));
