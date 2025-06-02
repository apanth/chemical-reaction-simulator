import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import './ReactionInfo.css';

const ReactionInfo = ({ info }) => {
  if (!info) return null;

  return (
    <Paper elevation={3} className="reaction-info">
      <Typography variant="h5" gutterBottom>
        Reaction Information
      </Typography>
      
      <Box className="info-grid">
        <div className="info-item">
          <Typography variant="subtitle1" color="textSecondary">
            Reaction Energy
          </Typography>
          <Typography variant="h6">
            {info.energy.toFixed(2)} kJ/mol
          </Typography>
        </div>

        <div className="info-item">
          <Typography variant="subtitle1" color="textSecondary">
            Temperature
          </Typography>
          <Typography variant="h6">
            {info.conditions.temperature} K
          </Typography>
        </div>

        <div className="info-item">
          <Typography variant="subtitle1" color="textSecondary">
            Pressure
          </Typography>
          <Typography variant="h6">
            {info.conditions.pressure} atm
          </Typography>
        </div>

        <div className="info-item full-width">
          <Typography variant="subtitle1" color="textSecondary">
            Reaction Mechanism
          </Typography>
          <Typography variant="body1">
            {info.mechanism}
          </Typography>
        </div>
      </Box>
    </Paper>
  );
};

export default ReactionInfo; 