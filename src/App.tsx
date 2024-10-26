import { ThemeProvider, createTheme, styled } from "@mui/material";
import UserForm from "./components/UserForm";

const AppContainer = styled("div")`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
`;

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <UserForm />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
