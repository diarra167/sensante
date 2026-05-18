import { useState } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Recherche from './Recherche';
import LigneBus from './LigneBus';
import DetailLigne from './DetailLigne';


function App() {
  // --- ÉTATS (STATES) ---
  const [recherche, setRecherche] = useState("");
  const [ligneSelectionnee, setLigneSelectionnee] = useState(null);
  
  // Exercice 3 : État pour compter le nombre de recherches effectuées
  const [compteurRecherche, setCompteurRecherche] = useState(0);

  // --- DONNÉES ---
  const lignes = [
    { id: 1, numero: "1", depart: "Parcelles Assainies", arrivee: "Plateau", arrets: 14, listeArrets: ["Parcelles U14", "Parcelles U10", "Camberene", "Patte d'Oie", "Grand Dakar", "Colobane", "Ponty", "Plateau"] },
    { id: 2, numero: "7", depart: "Guediawaye", arrivee: "Place Obe", arrets: 18, listeArrets: ["Guediawaye", "Pikine", "Thiaroye", "Keur Massar", "Grand Yoff", "Parcelles", "Liberte 6", "Place Obe"] },
    { id: 3, numero: "15", depart: "Pikine", arrivee: "Medina", arrets: 12, listeArrets: ["Pikine Centre", "Thiaroye Gare", "Hann", "Colobane", "Fass", "Medina"] },
    { id: 4, numero: "23", depart: "Ouakam", arrivee: "Grand Dakar", arrets: 10, listeArrets: ["Ouakam Village", "Mermoz", "Fann", "Point E", "Liberte 5", "Grand Dakar"] },
    { id: 5, numero: "8", depart: "Almadies", arrivee: "Colobane", arrets: 16, listeArrets: ["Almadies", "Ngor", "Yoff", "Ouest Foire", "Liberte 6", "Colobane"] },
    { id: 6, numero: "12", depart: "Yoff", arrivee: "Sandaga", arrets: 11, listeArrets: ["Yoff Village", "Aeroport LSS", "Parcelles U17", "Grand Yoff", "HLM", "Sandaga"] },
  ];

  // --- LOGIQUE ---

  // Exercice 3 : Fonction qui gère la saisie et incrémente le compteur
  const handleRechercheChange = (nouvelleValeur) => {
    setRecherche(nouvelleValeur);
    setCompteurRecherche(compteurRecherche + 1);
  };

  // Filtrage des lignes
  const lignesFiltrees = lignes.filter(l =>
    l.depart.toLowerCase().includes(recherche.toLowerCase()) ||
    l.arrivee.toLowerCase().includes(recherche.toLowerCase()) ||
    l.numero.includes(recherche)
  );

  // Gestion du clic sur une ligne
  function handleClickLigne(ligne) {
    if (ligneSelectionnee && ligneSelectionnee.id === ligne.id) {
      setLigneSelectionnee(null);
    } else {
      setLigneSelectionnee(ligne);
    }
  }

  // --- RENDU ---
  return (
    <div className="App">
      <Header />
      
      <main className="container">
        
        {/* Exercice 3 : Affichage du compteur de recherches */}
        <div className="stats-recherche">
          <p>Vous avez effectué <strong>{compteurRecherche}</strong> recherche(s).</p>
        </div>

        <Recherche valeur={recherche} onChange={handleRechercheChange} />

        {/* Exercice 2 : Condition "Aucune ligne trouvée" */}
        {lignesFiltrees.length === 0 ? (
          <div className="message-vide">
            <p>Aucune ligne trouvée pour : <strong>"{recherche}"</strong></p>
          </div>
        ) : (
          <>
            <p className="results-count">
              {lignesFiltrees.length} ligne{lignesFiltrees.length > 1 ? 's' : ''} trouvée{lignesFiltrees.length > 1 ? 's' : ''}
            </p>

            <div className="lignes-grid">
              {lignesFiltrees.map(ligne => (
                <div key={ligne.id} onClick={() => handleClickLigne(ligne)}>
                  <LigneBus 
                    ligne={ligne} 
                    estSelectionnee={ligneSelectionnee?.id === ligne.id} 
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Détails de la ligne sélectionnée */}
        {ligneSelectionnee && (
          <DetailLigne ligne={ligneSelectionnee} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;