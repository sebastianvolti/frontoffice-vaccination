import React, { useEffect, useCallback, memo } from "react";

// Libs
import axios from "axios";

// Redux
import { flush } from "./../redux/index";

// Services
import { AuthVerify } from "./../services/auth";

/**
 * Auth security interceptor
 * @type {HTMLElement}
 * @type {JSX.Element}
 * Props
 * @param {object} props Component props
 * @param {HTMLElement|JSX.Element} props.children
 * @param {UpdateCallback} props.update
 */
function Authorization({ children }) {
  const verify = useCallback(async () => {
    try {
      await AuthVerify();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    axios.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
        if ([401, 403, 500].indexOf(error.response.status) !== -1) {
          // Auto Logout if 401 Unauthorized or 403 Forbidden response
          flush();
          window.location.replace("http://vacunas07.web.elasticloud.uy/inicio");
        } else {
          return Promise.reject(error);
        }
      }
    );
    verify();
  }, [verify]);

  return <>{children}</>;
}

export default memo(Authorization);
