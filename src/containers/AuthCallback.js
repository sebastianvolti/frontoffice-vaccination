import React, { useEffect, useCallback, memo } from "react";
import { withRouter } from 'react-router-dom';

// Redux
import { connect } from "react-redux";
import { updateAuthData } from "../redux/actions";

// Services
import { AuthGateway } from "../services/auth";

function AuthCallback({ auth, location: { search }, history, update }) {

  const fetchGateway = useCallback(
    async code => {
      try {
        const { data } = await AuthGateway(code);
        update({ data });
      } catch (error) {
        console.warn(error);
        history.replace("/inicio");
      }
    },
    [update]
  );

  useEffect(() => {
    if (auth.data != null) {

      if (auth.data.email) {
        if (auth.data.new){
          history.replace("/confirmation")
        }
        else {
          history.replace("/inicio")
        }
      }
      else {
        history.replace("/mobile")
      }
    }
    else {
      const params = new URLSearchParams(search);
      const code = params.get("code");
      if (code) {
        fetchGateway(code).then().catch(() => history.replace("/inicio"));
      }
      else {
        history.replace("/inicio");
      }
    }
  }, [history, auth, fetchGateway, search]);

  return (
    <div>
      <span>Cargando...</span>
    </div>
  );
}


function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return {
    update: payload => dispatch(updateAuthData(payload))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthCallback));
