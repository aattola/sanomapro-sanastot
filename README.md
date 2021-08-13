# Sanomapro sanastoja

> Chrome lisäosana

Tulee chromen kauppaan lähipäivinä
nyt pystyy lataamaan ottamalla Sanastot.zip [tiedoston](https://github.com/jeffeeeee/sanomapro-sanastot/releases/latest) ja lisäämällä sen chromeen developer tilassa.

[Siitä](https://ui.vision/howto/install-chrome-extension-from-file) neuvot jos et osaa.

# Sanastot API

Sanoman sanastot applikaatio puhelimella hakee kaikki kirjat osoitteesta

[https://sanastot.sanomapro.fi/api/v1/materials](https://sanastot.sanomapro.fi/api/v1/materials)

Ja tietyn kirjan sanaston saa osoitteesta

[https://sanastot.sanomapro.fi/api/v1/material/KIRJAN_ID_TÄHÄN](https://sanastot.sanomapro.fi/api/v1/material/on_track_4)

Sanasto applikaatio käyttää myös sovelluksessa [firebasea](https://firebase.google.com/)

`https://sanoma-pro-sanastot.firebaseio.com`

Firebase vaatii authentikoimisen. Api avaimet löytyvät sanasto applikaation lähdekoodista

# Rakentaminen

1. Lataat repon koneelle
2. Avaat cmd
3. ` yarn install`
4. ` yarn start`
5. Lataat build kansion chromeen ja alat miettimään mitä vaihdat
