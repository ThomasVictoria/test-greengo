Un collecteur a un lecteur de badge qui, lorsqu'un badge est lu, envoie des paquets de nombres décimaux à notre collecteur qui mis de bout en bout correspondent à:

<chaine de debut de lecture d'un badge><le numéro de badge><chaine de fin de lecture de badge>

Exemple:

```
[1, 2, 5, 45, 56, 34, 45, 56, 3, 4]
```

avec en rouge, la chaine de début de lecture,
en noir les numéros qui constitue le numéro de badge,
en vert, la chaine de fin de lecture de badge

Question: Pourquoi le lecteur de badge rajoute des nombres au début et à la fin du numéro de badge ?

Tous ces nombres sont envoyés sous forme de paquet de donnée qui peuvent avoir n’importe quel découpage.

Si on reprend l’exemple précédent, on pourrait recevoir les données sous ces formes:
[1] [2, 5] [45, 56, 34] [45, 56, 3, 4] 

[1, 2, 5] [45, 56] [34, 45, 56, 3] [4]

Chaque fois que des paquets sont envoyés, une fonction (callback) est appelée avec en entrée le paquet de nombre sous forme de tableau de nombre.

```
function getDataChunk(chunk: number[]){
....
}
```
Chaque nombre decimal à l’intérieur de ce tableau correspond à un caractère ASCII (tableau des correspondances: https://fr.wikipedia.org/wiki/American_Standard_Code_for_Information_Interchange).

Notre backoffice nous permet de configurer pour un collecteur spécifique quels sont les caractères ASCII de début de lecture d’un badge, et quels sont les caractères de fin de lecture. Supposons que nous avons déjà récupérer ces valeurs et qu’elles sont sous forme de tableau de string dans notre code:

```
startCharacters: string[];  // example: startCharacters = ["SOH", "STX"]
endCharacters: string[]; // example: endCharacters = ["EOT"]
```

À l’aide de ces éléments, comment organiseriez-vous votre code pour extraire le tableau qui correspond au badge. C’est-à-dire, si en entrée vous récupérai ceci:

```
[23,45, 1, 2, 5] [45, 56] [34, 45, 56, 3] [4, 24][4]
```

Il faut que vous puissiez en extraire [5, 45, 56, 34, 45, 56]
Pour l’envoyer à notre serveur.