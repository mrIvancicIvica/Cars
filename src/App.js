import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import Routes from './Routes';
// import SimpleList from './components/SimpleList';



const theme = createMuiTheme({
  palette: {
    type:'dark',
    primary: {
      main: "#282c34",

    },
    secondary: {
      main: '#fefefe',
    },
    buttonColor:{
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    }
  },
});



function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Routes />
      </div>
    </ThemeProvider>
  );
}

export default App;
