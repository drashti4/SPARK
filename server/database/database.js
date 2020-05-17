const {Pool} = require('pg');
const PG_HOST = 'localhost';
const PG_PORT = 5432;
const PG_DATABASE = 'intelli-player';
const PG_USER  ='postgres';
const PG_PASSWORD = 'postgres';

const pool = new Pool({
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USER,
    password: PG_PASSWORD
});

const playlistTable = 'playlist';
const trackTable = 'track';
const selectTracksCommand = `select * from ${trackTable}`;

module.exports = {

    isValidUser: (request, response) => {
        let flag = false
        pool.query("SELECT * from users")
            .then(result => {
                if (result.rows.length > 0) {

                    if (result) {
                        result.rows.forEach((row) => {
                            console.log("Row email "+row.email)
                            console.log("Row pwd "+row.password)
                            if(row.email === request.body.email && row.password === request.body.pwd){
                                flag = true
                                console.log("Flag is true")
                            }
                        });
                    }
                }
                if(flag){
                    response.status(200).json({
                        msg: 'valid user'
                    })
                }else{
                    response.status(201).json({
                        msg: 'Invalid user'
                    })
                }
            }) .catch(e => console.error(e.stack));
    },

    getAllTracks: (request, response) => {
        pool.query(selectTracksCommand)
            .then(result => response.status(200).json(result.rows))
            .catch(e => console.error(e.stack));
    },

    insertTrack:(request, response)=>{
        let genre = request.body.genres[0];

        pool.query("SELECT * FROM "+playlistTable+" WHERE title=($1)", [genre])
            .then(result => {
                if (result.rows.length > 0) {
                    if (result) {
                        result.rows.forEach((row) => {
                            module.exports.addExistingTrack(request, response, row.id);
                        });
                    }
                } else {
                    module.exports.addExistingTrack(request, response, 1);
                }
            }) .catch(e => console.error(e.stack));
    },


    addExistingTrack: (request, response, id) => {

        console.log(`inserted with ${request.body.title} with id ${id}`);

        pool.query(`INSERT INTO ${trackTable} (playlist_id, title, uri, master_id)` +
            `VALUES (${parseInt(id)},'${request.body.title}',
               '${request.body.uri}',${parseInt(request.body.master_id)})`, function(err) {
            if (err) {
                return console.error(err.message);
            }
        })
    },

    deleteTrackById: (request, response) => {
        pool.query(`DELETE FROM ${trackTable} WHERE id=${request.params.id}`, function(err) {
            if (err) {
                return console.error(err.message);
            }
            response.status(200).json({
                msg: 'track deleted'
            })
        })
    }

}
