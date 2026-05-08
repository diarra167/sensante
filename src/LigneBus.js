import './LigneBus.css';

function LigneBus({ ligne, estSelectionnee }) {
  // On extrait les propriétés de l'objet ligne pour plus de clarté
  const { numero, depart, arrivee, arrets, listeArrets } = ligne;

  return (
    <div className={`ligne-bus ${estSelectionnee ? 'selectionnee' : ''}`}>
      <div className="ligne-header">
        <span className="numero-badge">{numero}</span>
        <div className="trajet">
          <strong>{depart}</strong> 
          <span className="fleche"> → </span> 
          <strong>{arrivee}</strong>
        </div>
      </div>

      <div className="infos-secondaires">
        <p>{arrets} arrêts au total</p>
      </div>

      {/* Affichage conditionnel de la liste des arrêts si la ligne est sélectionnée */}
      {estSelectionnee && (
        <div className="liste-arrets-details">
          <h4>Détail des arrêts :</h4>
          <ul>
            {listeArrets.map((arret, index) => (
              <li key={index}>{arret}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LigneBus;