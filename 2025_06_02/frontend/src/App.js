import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';
import MoleculeViewer from './components/MoleculeViewer';
import ReactionInfo from './components/ReactionInfo';
import './App.css';

function App() {
  const [reactants, setReactants] = useState(['']);
  const [products, setProducts] = useState([]);
  const [reactionInfo, setReactionInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReactantChange = (index, value) => {
    const newReactants = [...reactants];
    newReactants[index] = value;
    setReactants(newReactants);
  };

  const addReactant = () => {
    setReactants([...reactants, '']);
  };

  const removeReactant = (index) => {
    const newReactants = reactants.filter((_, i) => i !== index);
    setReactants(newReactants);
  };

  const simulateReaction = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5001/api/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reactants: reactants.filter(r => r.trim() !== ''),
          conditions: {
            temperature: 298, // Room temperature in Kelvin
            pressure: 1 // 1 atm
          }
        }),
      });

      const data = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.message);
      }

      setProducts(data.products);
      setReactionInfo({
        energy: data.reaction_energy,
        mechanism: data.reaction_mechanism,
        conditions: data.conditions
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" className="app-container">
      <Typography variant="h3" component="h1" gutterBottom>
        Chemical Reaction Simulator
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Reactants
        </Typography>
        {reactants.map((reactant, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label={`Reactant ${index + 1}`}
              value={reactant}
              onChange={(e) => handleReactantChange(index, e.target.value)}
              placeholder="Enter chemical formula (e.g., H2O)"
              fullWidth
            />
            {reactants.length > 1 && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeReactant(index)}
              >
                Remove
              </Button>
            )}
          </Box>
        ))}
        <Button
          variant="outlined"
          onClick={addReactant}
          sx={{ mr: 2 }}
        >
          Add Reactant
        </Button>
        <Button
          variant="contained"
          onClick={simulateReaction}
          disabled={loading || reactants.every(r => r.trim() === '')}
        >
          {loading ? 'Simulating...' : 'Simulate Reaction'}
        </Button>
      </Paper>

      {error && (
        <Paper elevation={3} sx={{ p: 2, mb: 3, bgcolor: '#ffebee' }}>
          <Typography color="error">{error}</Typography>
        </Paper>
      )}

      {products.length > 0 && (
        <>
          <MoleculeViewer molecules={products} />
          <ReactionInfo info={reactionInfo} />
        </>
      )}
    </Container>
  );
}

export default App; 