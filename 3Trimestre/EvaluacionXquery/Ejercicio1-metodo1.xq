xquery version "1.0" encoding "UTF-8";

for $x in /pokeDAW/pokemon
where $x/genero = "Femenino" and $x/@tipo = "agua" 
return element {"pokemon_agua_femeninos"} {$x/*}