// src/Recherche.js
import './Recherche.css';

function Recherche({ valeur, onChange }) {
  return (
    <div className="recherche-container">
      <div className="recherche">
        <input
          type="text"
          className="recherche-input"
          placeholder="Rechercher une ligne (depart, arrivee)..."
          value={valeur}
          onChange={(e) => onChange(e.target.value)}
        />
        {/* Exercice 1 : Bouton pour effacer */}
        {valeur && (
          <button 
            className="recherche-clear" 
            onClick={() => onChange("")}
          >
            Effacer
          </button>
        )}
      </div>
    </div>
  );
}

export default Recherche;