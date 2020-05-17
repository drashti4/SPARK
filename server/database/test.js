const db = require('./database');

db.query("select * from playlist")
    .then(response => response.rows)
    .then(rows => console.log(rows))
.catch(error => console.log(error));

db.getAllTracks();

db.insertTrack(1, 'Drashti', 'http:',123);