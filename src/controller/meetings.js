const mysql = require('mysql');

var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "interview_meetings"
});
  
con.connect(function(err) {
    if (err) throw err;
    // console.log("Connected!");
});


exports.addMeeting = (req, res) => {
    // console.log(req)
    var meet_id=-1;
    var sql = `INSERT INTO interview_meetings (subject,start_time,end_time) VALUES ('${req.body.agenda}', '${req.body.start_time}','${req.body.end_time}')`;
    con.query(sql, function (err, result) {
        // console.log(result)
        if (err){
            // console.log('error adding interview meeting');
            res.status(400).send('error creating meeting')
        }
        // console.log("added interview meeting")
    });
  
    con.query("SELECT meet_id FROM interview_meetings WHERE meet_id = ( SELECT MAX(meet_id) FROM interview_meetings )", function (err, result, fields) {
        if (err){
            // console.log('unable to get meet_id')
        };
        meet_id=result[0].meet_id;

        var users=req.body.users;
        var usersArr=users.split(",");
        usersArr.forEach(user_id => {
            var sql = `INSERT INTO interviews_schedule (user_id, meet_id) VALUES ('${user_id}', '${meet_id}')`;
            con.query(sql, function (err, result) {
                if (err){
                    // console.log('error creating meeting');
                    res.status(400).send('error creating meeting')
                }
            // console.log("Meeting Created Successfully")
            }); 
        });
    });
  
    res.status(200).send("Meeting Created Successfully");
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
  
    var table1 = "SELECT * FROM interview_users";
    var table2 = "SELECT * FROM interviews_schedule";
    var table3 = "SELECT * FROM interview_meetings";

    con.query(table1, function (err, result) {
        if (err){
            // console.log('unable to get user details')
        };
        res.status(200).send(result);
    });

    con.query(table2, function (err, result) {
        if (err){
            // console.log('unable to get scheduled')
        };
        res.status(200).send(result);
    });

    con.query(table3, function (err, result) {
        if (err){
            // console.log('unable to get meetings')
        };
        res.status(200).send(result);
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
                res.status(200).send(result);
            }else{
                // console.log("Updation Problem!");
                res.status(400).send('Updation Problem!');
            }
        }catch(err){
            // console.log(err);
        }
    });

};

exports.deleteMeeting = (req, res) => {
  
    var meet_id = req.body.meet_id;
    var sql = `DELETE FROM interview_meetings WHERE meet_id="${meet_id}"`;
    // var sql = "DELETE FROM interview_meetings WHERE meet_id=:meet_id";

    con.query(sql, function (err, result) {
        // console.log("Deleted!");
        res.status(200).send(result);
    });

};

exports.users = (req, res) => {

    var sql = `SELECT * FROM interview_users`;

    con.query(sql, function (err, result) {
        // console.log("Sent!");
        res.status(200).send(result);
    });

};