import React, { useState } from "react";
import { create } from "./api-user";

const Signup = () => {
  const styles = useStyles();
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handelSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };
    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };

  return (
    <div>
      {/* <Grid container spacing="4" justify="center" alignItems="center">
        <Grid item xs={12} sm={6} md={6}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h6">Sign Up</Typography>
              <TextField
                id="name"
                label="Name"
                value={values.name}
                onChange={handleChange("name")}
                margin="normal"
              />
              <br />
              <TextField
                id="email"
                label="Email"
                value={values.email}
                onChange={handleChange("email")}
                margin="normal"
              />
              <br />
              <TextField
                id="password"
                label="Password"
                value={values.password}
                onChange={handleChange("password")}
                margin="normal"
              />
              <br />
              {values.error && (
                <Typography component="p" color="error">
                  <Icon color="error">error</Icon>
                  {values.error}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                onClick={handelSubmit}
              >
                Submit
              </Button>
            </CardActions>
          </Card>
          <Dialog
            open={values.open}
            disableBackdropClick={true}
            className={styles.dialog}
          >
            <DialogTitle>New Account</DialogTitle>
            <DialogContentText>
              New Account Successfully created
            </DialogContentText>
            <DialogActions>
              <Link to="/signin">
                <Button
                  color="primary"
                  autoFocus="autoFocus"
                  variant="contained"
                >
                  Sign In
                </Button>
              </Link>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid> */}
    </div>
  );
};

export default Signup;
