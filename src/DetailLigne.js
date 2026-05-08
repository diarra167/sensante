import './DetailLigne.css';

function DetailLigne({ ligne }) {
  // Sécurité au cas où 'ligne' serait null ou undefined
  if (!ligne) return null;

  return (
    <div className="detail-ligne">
      <h2 className="detail-titre">
        Ligne {ligne.numero} : {ligne.depart} → {ligne.arrivee}
      </h2>
      
      <p className="detail-info">
        <strong>{ligne.arrets}</strong> arrêts sur ce trajet
      </p>

      <div className="arrets-section">
        <h3>Arrêts principaux :</h3>
        <ul className="arrets-liste">
          {ligne.listeArrets.map((arret, index) => (
            <li key={index} className="arret-item">
              <span className="arret-index">{index + 1}</span>
              <span className="arret-nom">{arret}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DetailLigne;