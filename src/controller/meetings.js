const mysql = require('mysql');

var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "interview_meetings",
});
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


exports.addMeeting = (req, res) => {
    console.log('request body', req)
    var meet_id=-1;
    var sql = `INSERT INTO interview_meetings (subject,start_time,end_time) VALUES ('${req.body.agenda}', '${req.body.start_time}','${req.body.end_time}')`;
    con.query(sql, function (err, result) {
        if (result){
            con.query("SELECT meet_id FROM interview_meetings WHERE meet_id = ( SELECT MAX(meet_id) FROM interview_meetings )", function (err, result, fields) {
                if (err){
                    // console.log('unable to get meet_id')
                };
                meet_id=result[0].meet_id;

                var users = req.body.users;
                // var usersArr = users.split(",");

                // console.log("--------------------",req.body);

                users.split(",").forEach(user_id => {
                    var sql = `INSERT INTO interviews_schedule (user_id, meet_id) VALUES ('${user_id}', '${meet_id}')`;
                    con.query(sql, function (err, result) {
                        if (err){
                            console.log('error creating meeting', err);
                            obj={status: false};

                            res.status(400).send(obj);
                        }
                    // console.log("Meeting Created Successfully")
                    }); 
                    
                });
                obj={status: true};

                res.status(400).send(obj);
            });
        }
        // console.log("added interview meeting")
    });
    
};

exports.allMeeting = (req, res) => {
  
    var sql = "SELECT * FROM interview_meetings";
    con.query(sql, function (err, result) {
        if (err){
            // console.log('unable to get meetings')
        };
        res.status(200).send(result);
    });
  
};

exports.scheduleMeeting = (req, res) => {
  
   
    var data = [];
    var data1 = null;
    var data2 = null;
    var data3 = null;

    var table1 = "SELECT * FROM interview_users";
    var table2 = "SELECT * FROM interviews_schedule";
    var table3 = "SELECT * FROM interview_meetings";
    
    con.query(table1, function (err, result) {
        try{
            if(result){
               data.push(result);
               con.query(table2, function (err, result) {
                try{
                    if(result){
                        // console.log("Updated!");
                        data.push(result);
                        con.query(table3, function (err, result) {
                            try{
                                if(result){
                                    // console.log("Updated!");
                                    data.push(result);
                                    con.query(table2, function (err, result) {
                                        try{
                                            if(result){
                                                // console.log("Updated!");
                                                data.push(result);
                                                res.status(200).send(data);
                                            }else{
                                                // console.log("Updation Problem!");
                                                obj={status: false};
                                                res.status(400).send(obj);
                                            }
                                        }catch(err){
                                            // console.log(err);
                                        }
                                    });
                                    
                                }else{
                                    // console.log("Updation Problem!");
                                    obj={status: false};
                                    res.status(400).send(obj);
                                }
                            }catch(err){
                                // console.log(err);
                            }
                        });
        
                    }else{
                        // console.log("Updation Problem!");
                        obj={status: false};
                        res.status(400).send(obj);
                    }
                }catch(err){
                    // console.log(err);
                }
            });
            }else{
                // console.log("Updation Problem!");
                obj={status: false};
                res.status(400).send(obj);
            }
        }catch(err){
            // console.log(err);
        }
    });

    
};

exports.updateMeeting = (req, res) => {

    var start_time = req.body.start_time;
    var end_time = req.body.end_time;
    var subject = req.body.agenda;
    var meet_id = req.body.meet_id;
  
    var sql = `UPDATE interview_meetings SET start_time = "${start_time}", end_time = "${end_time}", subject = "${subject}" WHERE meet_id ="${meet_id}"`;

    con.query(sql, function (err, result) {
        try{
            if(result){
                // console.log("Updated!");
                obj={status: true};
                res.status(200).send(obj);
            }else{
                // console.log("Updation Problem!");
                obj={status: false};
                res.status(400).send(obj);
            }
        }catch(err){
            // console.log(err);
        }
    });

};

exports.deleteMeeting = (req, res) => {
  
    var meet_id = req.body.meet_id;
    var sql = `DELETE FROM interview_meetings WHERE meet_id="${meet_id}"`;

    con.query(sql, function (err, result) {
        if(result){
            // console.log("Deleted!");
            obj={status: true};
            res.status(200).send(obj);
        }else{
            // console.log("Not Deleted!!!");
            obj={status: false};
            res.status(400).send(obj);
        }
    });

};

exports.users = (req, res) => {

    var sql = `SELECT * FROM interview_users`;

    con.query(sql, function (err, result) {
        obj={status: true};
        res.status(200).send(obj);
        // res.status(200).send(result);
    });

};