import { Provider } from 'react-redux';
import { CssBaseline, Container, Typography } from '@mui/material';
import { store } from './store';
import { GameCanvas } from './components/game/GameCanvas';
import { DialogInput } from './components/ui/DialogInput';

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          對話測試範例
        </Typography>
        <GameCanvas />
        <DialogInput />
      </Container>
    </Provider>
  );
}

export default App;
