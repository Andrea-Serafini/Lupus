# Lupus
Questo progetto nasce con l’obiettivo di creare una versione digitale del gioco Lupus, conosciuto anche come Mafia [1], un gioco conosciuto ormai da tutti, molto popolare tra i gruppi di universitari.
Il gioco prevede che ci siano almeno 6 giocatori e un narratore esterno che orchestri la partita. Prima di iniziare la partita, il narratore assegna casualmente un ruolo a ciascun giocatore. Generalmente questa assegnazione viene effettuata con l’ausilio di carte da gioco o token fisici, poiché è fondamentale per lo svolgimento che i ruoli rimangano segreti per tutta la partita. I ruoli presenti nel gioco possono variare a seconda del numero di giocatori o del tipo di partita che si vuole effettuare.
Durante lo svolgimento del gioco ci sarà un alternarsi di fasi diurne e notturne nelle quali i diversi personaggi potranno intraprendere azioni specifiche. Il narratore avrà il compito di supervisionare l’alternarsi delle fasi di gioco, tenere traccia delle decisioni dei giocatori e delle loro azioni.
Nella versione originale e più semplice del gioco i ruoli sono quelli di cittadino e mafioso, per cui si andranno a creare due squadre con obiettivi contrapposti, identificare i mafiosi e uccidere i cittadini. A ogni turno di notte il narratore dovrà chiedere ai mafiosi chi vogliono uccidere all’insaputa dei cittadini, mentre durante il turno di giorno tutti i giocatori dovranno decidere chi accusare di essere un mafioso, consapevoli però che i mafiosi cercheranno di influenzare a loro favore la decisione.
La partita termina nel momento in cui tutti i giocatori di una delle due squadre hanno la meglio sugli altri, avendo ucciso tutti i cittadini o imprigionato tutti i mafiosi. A questo punto sarà sufficiente distribuire nuovamente i ruoli per iniziare una nuova partita.

## Deployment
Per rendere il sistema operativo è necessario avviarne le due componenti, server e client.

Per avviare il server dopo essersi spostati all'interno dell'omonima cartella con il terminale bisognerà eseguire i seguenti comandi:
```
npm install
set LUPUS_SERVER_PORT=8081
node server.js
```

Il primo si occuperà di installare tutte le dipendenze necessarie, mentre l'ultimo avvierà effettivamente il server. Per quanto riguarda invece il secondo comando mostrato, il suo utilizzo è opzionale in quanto all'interno del progetto la variabile d'ambiente riportata viene impostata di default al valore ```8080```, perciò l'utilizzo dell'istruzione si riduce al solo caso in cui sia necessario utilizzare una porta diversa.

Ora per avviare il client bisognerà analogamente da un nuovo terminale spostarsi nella cartella corretta, poi eseguire i seguenti comandi:
```
npm install
set REACT_APP_SERVER_PORT=8081
npm run build
serve -s build
```

Dopo aver installato tutte le dipendenze sarà necessario eseguire il secondo comando per modificare la porta alla quale contattare il server solo nel caso si fosse modificata rispetto a quella di default ```8080```. I seguenti comandi si occuperanno di creare la build e rendere l'applicazione accessibile online.

### Docker

Per effettuare un deployment semplificato e indipendente dall'architettura della quale si dispone sono stati impostati i file necessari per l'utilizzo di Docker.
Una volta installata e avviata l'applicazione di Docker i comandi da eseguire da linea di comando saranno:
```
#Per avviare
    docker compose up --build

#Per terminare
    docker compose down
```

La struttura del progetto e dei conseguenti file ```docker-compose``` permette sia di avviare tutti i container insieme, che di avviare in maniera separata il client e la coppia server-database.