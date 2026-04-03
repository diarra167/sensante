"""
SenSante - Exploration du dataset patients_dakar.csv
Lab 1 : Git, Python et Structure Projet
"""
import pandas as pd
import os

# ===== CHARGER LES DONNEES =====
# Utilisation d'un chemin relatif propre
path = "data/patients_dakar.csv"

if not os.path.exists(path):
    # Si on lance le script depuis le dossier notebooks, on remonte d'un cran
    path = "../data/patients_dakar.csv"

df = pd.read_csv(path)

# ===== PREMIERS APERÇUS =====
print("=" * 50)
print(" SENSANTE - Exploration du dataset ")
print("=" * 50)

# Dimensions du dataset (Correction du \n)
print(f"\nNombre de patients : {len(df)}")
print(f"Nombre de colonnes : {df.shape[1]}")
print(f"Colonnes : {list(df.columns)}")

# Aperçu des 5 premières lignes
print(f"\n--- 5 premiers patients ---")
print(df.head())

# ===== STATISTIQUES DE BASE =====
print(f"\n--- Statistiques descriptives ---")
print(df.describe().round(2))

# ===== REPARTITION DES DIAGNOSTICS =====
print(f"\n--- Répartition des diagnostics ---")
diag_counts = df["diagnostic"].value_counts()
for diag, count in diag_counts.items():
    # Ligne indentée (4 espaces)
    pct = count / len(df) * 100
    print(f"{diag:12s} : {count:3d} patients ({pct:.1f}%)")

# ===== REPARTITION PAR REGION =====
print(f"\n--- Répartition par région (top 5) ---")
region_counts = df["region"].value_counts().head(5)
for region, count in region_counts.items():
    # Ligne indentée (4 espaces)
    print(f"{region:15s} : {count:3d} patients")

# ===== TEMPERATURE MOYENNE PAR DIAGNOSTIC =====
print(f"\n--- Température moyenne par diagnostic ---")
temp_by_diag = df.groupby("diagnostic")["temperature"].mean()
for diag, temp in temp_by_diag.items():
    # Ligne indentée (4 espaces)
    print(f"{diag:12s} : {temp:.1f} C")

# ===== EXERCICE 1 (Page 17) =====
print(f"\n--- Analyse par sexe et diagnostic ---")
print(df.groupby(["sexe", "diagnostic"]).size())

print(f"\n{'=' * 50}")
print(" Exploration terminée !")
print(" Prochain lab : entraîner un modèle ML")
print(f"{'=' * 50}")