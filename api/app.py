import json
from flask import Flask, jsonify
from flask_cors import CORS
from flask import Flask, jsonify, request

app = Flask(__name__)
CORS(app)

# Charger les donnees depuis le fichier JSON
with open("lignes_ddd.json", "r") as f:
    lignes = json.load(f)

@app.route("/lignes")
def accueil():
    return jsonify({
        "message": "Bienvenue sur l’API SenTransport !",
        "endpoints": ["/lignes", "/lignes/<id>", "/arrets"]
    })

@app.route("/api/lignes")
def get_lignes():
    return jsonify(lignes)

@app.route("/api/lignes/<int:ligne_id>")
def get_ligne(ligne_id):
    ligne = next(
        (l for l in lignes if l["id"] == ligne_id),
        None
    )
    
    if ligne is None:
        return jsonify({"erreur": "Ligne non trouvee"}), 404
    return jsonify(ligne)
@app.route("/stats")
def get_stats():
    # Nombre total de lignes
    nb_lignes = len(lignes)
    
    # Nombre total d'arrêts (somme du champ "arrets" de chaque ligne)
    total_arrets = sum(ligne["arrets"] for ligne in lignes)
    
    # Numéro de la ligne ayant le plus d'arrêts
    ligne_max = max(lignes, key=lambda l: l["arrets"])
    numero_ligne_max = ligne_max["numero"]
    
    return jsonify({
        "nombre_total_lignes": nb_lignes,
        "nombre_total_arrets": total_arrets,
        "ligne_la_plus_longue": numero_ligne_max
    })
@app.route("/lignes/recherche")
def recherche_lignes():
    # Récupérer le paramètre de requête 'q' (ex: ?q=Pikine)
    query = request.args.get("q", "").lower()
    
    # Filtrer si le départ ou l'arrivée contient le texte recherché
    resultats = [
        l for l in lignes 
        if query in l["depart"].lower() or query in l["arrivee"].lower()
    ]
    
    return jsonify(resultats)
@app.route("/arrets")
def get_arrets():
    tous_les_arrets = []
    for ligne in lignes:
        # On récupère les éléments de listeArrets
        tous_les_arrets.extend(ligne["listeArrets"])
    
    # Utilisation de set() pour éliminer les doublons
    # Puis conversion en liste avec list() 
    arrets_uniques = list(set(tous_les_arrets))
    
    return jsonify(arrets_uniques)
if __name__ == "__main__":
    app.run(debug=True, port=5000)