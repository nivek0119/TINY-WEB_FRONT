import React, { useState, useContext} from "react";
import { Button, Container} from "reactstrap";

import UserContext from "../../context/UserContext";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});






function SectionNucleoIcons() {

  const classes = useStyles();
  const { userData, setUserData } = useContext(UserContext);

  return (
    <>
      {userData.user.myLinks ? (
        <div>
          <div className="section section-dark section-nucleo-icons">


            <Container>

              <h1>YOUR SHORTENED LINKS</h1>
              <br />
              <br />

              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Full URL</TableCell>
                      <TableCell align="right">Short URL</TableCell>
                      <TableCell align="right">No. Of Clicks</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {userData.user.myLinks.map((row) => (
                      <TableRow key={row.full}>
                        <TableCell component="th" scope="row">
                          {row.full}
                        </TableCell>
                        <TableCell align="right">{row.short}</TableCell>
                        <TableCell align="right">{row.clicks}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <br />
              <br />
              
              <Button onClick={() => {
                window.location.reload();
              }} color="primary" type="submit">
                Re-Fresh
                </Button>


            </Container>
          </div>{" "}



        </div>
      ) : (
          <>
            <div className="section section-dark section-nucleo-icons">

              <Container>

                <h1>YOUR SHORTENED LINKS</h1>
                <br />
                
                <br />
                <br />

                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Full URL</TableCell>
                        <TableCell align="right">Short URL</TableCell>
                        <TableCell align="right">No. Of Clicks</TableCell>
                      </TableRow>
                    </TableHead>




                  </Table>
                </TableContainer>
                <br />
                <Button onClick={() => {
                  window.location.reload();
                }} color="primary" type="button">
                  Re-Fresh
                </Button>
              </Container>
            </div>{" "}

          </>
        )}

    </>
  );
}

export default SectionNucleoIcons;
