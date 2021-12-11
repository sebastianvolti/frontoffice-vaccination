import React, { useEffect, useCallback } from "react";
import { withRouter } from 'react-router-dom';

import AppFrame from './../components/AppFrame';
import Card from './../components/commons/Card'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from './../components/commons/Table'

// Redux
import { connect } from "react-redux";
import { Agendas } from './../services/agendas'
import { updateAgendaData } from "../redux/actions";

function HomeContainer({ agendas, update }) {

  const classes = makeStyles((theme) => ({
      root: {
          flexGrow: 1,
      },
      paper: {
          padding: theme.spacing(2),
          textAlign: 'center',
          color: theme.palette.text.secondary,
      },
      card: {
        maxWidth: "none"
      }
  }));

  const fetchAgendas= useCallback(
    async () => {
      try {
        const { data } = await Agendas();
        update({ data });
      } catch (error) {
        console.warn(error);
      }
    },
    [update]
  );

  useEffect(() => {
    if (agendas.length == 0){
      fetchAgendas().then();
    }
  }, [agendas, fetchAgendas]);

  return (
     <div>
        <AppFrame
            header="Bienvenido al Portal de Vacunación"
            body={
                <div>
                 <div className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item lg={3} sm={6} xs={12}>
                          <Paper className={classes.paper}>
                              <Card title="" data="56.700" info="Personas vacunadas" des="Enfermedad Covid19"></Card>
                          </Paper>
                        </Grid>
                        <Grid item lg={3} sm={6} xs={12}>
                            <Paper className={classes.paper}>
                              <Card title="" data="100.500" info="Dosis disponibles" des="Enfermedad Covid19"></Card>
                            </Paper>
                        </Grid>
                        <Grid item lg={3} sm={6} xs={12}>
                          <Paper className={classes.paper}>
                              <Card title="" data="23.700" info="Personas cursando enfermedad" des="Enfermedad Covid19"></Card>
                          </Paper>
                        </Grid>
                        <Grid item lg={3} sm={6} xs={12}>
                          <Paper className={classes.paper}>
                              <Card title="" data="49.300" info="Personas recuperadas" des="Enfermedad Covid19"></Card>
                          </Paper>
                        </Grid>
                    </Grid>
                    </div>

                    <div>
                        <br></br>
                        <div className="app-subh">
                            <h3 className="page-title">Agendas disponibles:</h3>
                            <br></br>
                            <Table rows={agendas}></Table>
                        </div> 
                    </div>
                </div>
            }
        >
        </AppFrame>   
    </div>
  );

  
}


function mapStateToProps({ agendas }) {
  return { agendas };
}

function mapDispatchToProps(dispatch) {
  return {
    update: payload => dispatch(updateAgendaData(payload))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));
