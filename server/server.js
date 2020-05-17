const express = require('express');
const cors= require('cors');
const httpHandler = require('./src/HTTPHandler');
const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

/*app.get('/tracks',httpHandler.getAllTracks);
app.delete('/track/:id',httpHandler.deleteTrackById);
app.post('/track',httpHandler.addTrackToList);*/

app.post('/isvaliduser',httpHandler.isValidUser)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));