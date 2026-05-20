import './LigneBus.css';

function LigneBus({ ligne, estSelectionnee, onClick }) {
  const { numero, depart, arrivee, arrets } = ligne;

  return (
    <div
      className={`ligne-bus ${estSelectionnee ? 'ligne-bus-active' : ''}`}
      onClick={onClick}
    >
      <div className="ligne-numero">{numero}</div>
      <div className="ligne-info">
        <span className="ligne-trajet">
          {depart} &rarr; {arrivee}
        </span>
        <span className="ligne-arrets">{arrets} arrêts</span>
      </div>
    </div>
  );
}

export default LigneBus;