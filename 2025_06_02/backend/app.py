from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import json

app = Flask(__name__)
CORS(app)

def parse_chemical_formula(formula):
    """Parse a chemical formula into its elements and counts"""
    elements = {}
    current_element = ""
    current_count = ""
    
    for char in formula:
        if char.isupper():
            if current_element:
                count = int(current_count) if current_count else 1
                elements[current_element] = count
            current_element = char
            current_count = ""
        elif char.islower():
            current_element += char
        elif char.isdigit():
            current_count += char
    
    if current_element:
        count = int(current_count) if current_count else 1
        elements[current_element] = count
    
    return elements

def balance_equation(reactants, products):
    """Simple equation balancing (this is a simplified version)"""
    # In a real application, you would implement proper equation balancing
    return {
        "reactants": reactants,
        "products": products,
        "coefficients": [1] * len(reactants + products)
    }

def calculate_reaction_products(reactants, conditions):
    """
    Calculate reaction products based on reactants and conditions
    """
    try:
        # Parse reactants
        parsed_reactants = [parse_chemical_formula(r) for r in reactants]
        
        # Simple reaction simulation
        # This is a very basic simulation that just returns the input molecules
        # In a real application, you would implement proper chemical reaction rules
        products = reactants  # For now, just return the reactants as products
        
        # Calculate some basic properties
        temperature = conditions.get('temperature', 298)  # Default to room temperature
        pressure = conditions.get('pressure', 1)  # Default to 1 atm
        
        # Calculate a simple reaction energy (this is just a placeholder)
        reaction_energy = np.random.uniform(-50, 50)  # Random energy between -50 and 50 kJ/mol
        
        return {
            "status": "success",
            "products": products,
            "reaction_energy": reaction_energy,
            "reaction_mechanism": "Basic reaction simulation",
            "conditions": {
                "temperature": temperature,
                "pressure": pressure
            }
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

@app.route('/api/simulate', methods=['POST'])
def simulate_reaction():
    data = request.json
    reactants = data.get('reactants', [])
    conditions = data.get('conditions', {})
    
    result = calculate_reaction_products(reactants, conditions)
    return jsonify(result)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    app.run(debug=True, port=5001) 