import json
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Charger les donnees depuis les fichiers JSON
with open("lignes_ddd.json", "r", encoding="utf-8") as f:
    lignes = json.load(f)

# ÉTAPE 3 : Chargement du fichier arrets.json [cite: 100, 101]
with open("arrets.json", "r", encoding="utf-8") as f:
    arrets = json.load(f)

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

# ÉTAPE 3 : Endpoint pour la carte Leaflet 
@app.route("/arrets")
def get_arrets():
    return jsonify(arrets)

@app.route("/stats")
def get_stats():
    nb_lignes = len(lignes)
    total_arrets = sum(ligne["arrets"] for ligne in lignes)
    ligne_max = max(lignes, key=lambda l: l["arrets"])
    return jsonify({
        "nombre_total_lignes": nb_lignes,
        "nombre_total_arrets": total_arrets,
        "ligne_la_plus_longue": ligne_max["numero"]
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)