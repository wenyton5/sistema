import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid"; 
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { versionSystem } from "../../../package.json";
import { i18n } from "../../translate/i18n";
import { nomeEmpresa } from "../../../package.json";
import { AuthContext } from "../../context/Auth/AuthContext";
import logo from "../../assets/logo.png";

const websiteUrl = 'https://wa.me/5519971395449?text=Informa%C3%A7%C3%B5es+sobre+o+sistema';
const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center" style={{ color: 'white' }}>
      {/* Coloque o texto de copyright desejado abaixo */}
      &copy; {new Date().getFullYear()} Core Sistemas. Todos os direitos reservados.
    </Typography>
  );
};

const customStyle = {
    borderRadius: 0,
    boxShadow: "none", 
    backgroundColor: '#755ace',
    color: 'white',
    fontSize: '12px',
};

const customStyle2 = {
    borderRadius: 0,
    boxShadow: "none", 
    backgroundColor: '#fe8d80',
    color: 'white',
    fontSize: '12px',

};

const customStyle3 = {
    borderRadius: 0,
    boxShadow: "none", 
    backgroundColor: '#06a2ab',
    color: 'white',
    fontSize: '12px',

};

const useStyles = makeStyles(theme => ({
	root: {
		width: "100vw",
		height: "100vh",
		//background: "linear-gradient(to right, #76EE00 , #76EE00 , #458B00)",
		background: "linear-gradient(to right, #006cd9 0%, #8c10cf 100%)", /* Fundo gradiente */
		backgroundRepeat: "no-repeat",
		backgroundSize: "100% 100%",
		backgroundPosition: "center",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
	},
	paper: {
                background: "linear-gradient(135deg, #ffffff, #ffffff)", /* Fundo gradiente */
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "55px 30px",
                borderRadius: "30px 5px 30px 5px", /* Borda personalizada: superior esquerdo, superior direito, inferior direito, inferior esquerdo */
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", /* Sombra */
                fontFamily: "Arial, sans-serif", /* Fonte */
                color: "#fff", /* Cor do texto */

	},
	avatar: {
		margin: theme.spacing(1),  
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	powered: {
		color: "white"
	}
}));

const Login = () => {
	const classes = useStyles();

	const [user, setUser] = useState({ email: "", password: "" });

	const { handleLogin } = useContext(AuthContext);

	const handleChangeInput = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handlSubmit = e => {
		e.preventDefault();
		handleLogin(user);
	};

	return (
		<div className={classes.root}>
		<Container component="main" maxWidth="xs">
			<CssBaseline/>
			<div className={classes.paper}>
				<div>
					<img style={{ margin: "0 auto", width: "100%" }} src={logo} alt="Whats" />
				</div>
				{/*<Typography component="h1" variant="h5">
					{i18n.t("login.title")}
				</Typography>*/}
				<form className={classes.form} noValidate onSubmit={handlSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label={i18n.t("login.form.email")}
						name="email"
						value={user.email}
						onChange={handleChangeInput}
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label={i18n.t("login.form.password")}
						type="password"
						id="password"
						value={user.password}
						onChange={handleChangeInput}
						autoComplete="current-password"
					/>
					
					<Grid container justify="flex-end">
					  <Grid item xs={6} style={{ textAlign: "right" }}>
						<Link component={RouterLink} to="/forgetpsw" variant="body2">
						  Esqueceu sua senha?
						</Link>
					  </Grid>
					</Grid>
					
					<Button
				type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                                style={customStyle} // Apply the custom style
                                                >
                                                {i18n.t("login.buttons.submit")}

					</Button>
<Button //botao de registrar
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                component={RouterLink}
                                                style={customStyle2} // Apply the custom style
                                                to="/signup"
                                                >
                                                {i18n.t("login.buttons.register")}
                                        </Button>
<Button
						href={websiteUrl} // Define o link do botão
                                                target="_blank"   // Abre o link em uma nova aba
                                                rel="noopener"    // Ajuda a evitar ataques de phishing
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                                style={customStyle3} // Aplica o estilo personalizado
                                                >
                                                Maiores informações
					</Button>
					{ <Grid container>
						<Grid item>
					
						</Grid>
					</Grid> }
				</form>
			
			</div>
			
		</Container>
		</div>
	);
};

export default Login;
