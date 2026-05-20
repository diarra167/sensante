import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Recherche from './Recherche';
import LigneBus from './LigneBus';
import DetailLigne from './DetailLigne';
import Carte from './Cartes'; // [cite: 288]

function App() {
  const [lignes, setLignes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);

  const chargerDonnees = () => {
    setChargement(true);
    setErreur(null);
    fetch('http://localhost:5000/api/lignes')
      .then(response => {
        if (!response.ok) throw new Error("Erreur serveur : " + response.status);
        return response.json();
      })
      .then(data => {
        setLignes(data);
        setChargement(false);
      })
      .catch(error => {
        setErreur(error.message);
        setChargement(false);
      });
  };

  useEffect(() => {
    chargerDonnees();
  }, []);

  const lignesFiltrees = lignes.filter(l =>
    l.depart.toLowerCase().includes(recherche.toLowerCase()) ||
    l.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
    l.numero.includes(recherche)
  );

  function handleClickLigne(ligne) {
    if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
      setLigneSelectionnee(null);
    } else {
      fetch(`http://localhost:5000/api/lignes/${ligne.id}`)
        .then(response => {
          if (!response.ok) throw new Error("Détails non trouvés");
          return response.json();
        })
        .then(data => setLigneSelectionnee(data))
        .catch(err => {
          console.error("Erreur chargement détails:", err);
          setLigneSelectionnee(ligne);
        });
    }
  }

  if (chargement) return <div className="App"><Header /><main className="contenu"><p>Chargement...</p></main></div>;

  if (erreur) return <div className="App"><Header /><main className="contenu"><p>{erreur}</p><button onClick={chargerDonnees}>Réessayer</button></main></div>;

  return (
    <div className="App">
      <Header />
      <main className="contenu">
        <div className="actions-bar">
          <Recherche valeur={recherche} onChange={setRecherche} />
          <button onClick={chargerDonnees} className="btn-recharger">Recharger</button>
        </div>

        <div className="lignes-grid">
          {lignesFiltrees.map(ligne => (
            <LigneBus
              key={ligne.id}
              numero={ligne.numero}
              depart={ligne.depart}
              arrivee={ligne.arrivee}
              arrets={ligne.arrets}
              estSelectionnee={ligneSelectionnee && ligneSelectionnee.id === ligne.id}
              onClick={() => handleClickLigne(ligne)}
            />
          ))}
        </div>

        {ligneSelectionnee && <DetailLigne ligne={ligneSelectionnee} />}
        
        {/* Intégration correcte de la Carte [cite: 292] */}
        <Carte /> 

      </main>
      <Footer />
    </div>
  );
}

export default App;