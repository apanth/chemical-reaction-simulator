# Chemical Reaction Simulator

An interactive web application for simulating chemical reactions, built with React and Flask.

## Features

- Input chemical formulas for reactants
- Simulate chemical reactions
- View reaction products and information
- Real-time reaction energy calculations
- Temperature and pressure conditions

## Tech Stack

- Frontend: React, Material-UI
- Backend: Flask, NumPy
- Development: Python 3.9, Node.js

## Setup

### Backend Setup

1. Create a virtual environment:
```bash
python -m venv my-venv
source my-venv/bin/activate  # On Windows: my-venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run the Flask server:
```bash
cd backend
python app.py
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm start
```

## Usage

1. Open your browser to `http://localhost:3000`
2. Enter chemical formulas for reactants (e.g., "H2O", "CO2")
3. Click "Simulate Reaction" to see the results

## Contributing

Feel free to submit issues and enhancement requests! 