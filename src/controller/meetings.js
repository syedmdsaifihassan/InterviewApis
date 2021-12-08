const mysql = require('mysql');

var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "interview_meetings"
});
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


exports.addMeeting = (req, res) => {
    console.log(req)
    var meet_id=-1;
    var sql = `INSERT INTO interview_meetings (subject, start_time,end_time) VALUES ('${req.body.agenda}', '${req.body.start_time}','${req.body.end_time}')`;
    con.query(sql, function (err, result) {
        console.log(result)
        if (err){
            console.log('error adding interview meeting');
            res.status(400).send('error creating meeting')
        }
        console.log("added interview meeting")
    });
  
    con.query("SELECT meet_id FROM interview_meetings WHERE meet_id = ( SELECT MAX(meet_id) FROM interview_meetings )", function (err, result, fields) {
        if (err){
            console.log('unable to get meet_id')
        };
        meet_id=result[0].meet_id;

        var users=req.body.users;
        var usersArr=users.split(",");
        usersArr.forEach(user_id => {
            var sql = `INSERT INTO interviews_schedule (user_id, meet_id) VALUES ('${user_id}', '${meet_id}')`;
            con.query(sql, function (err, result) {
                if (err){
                    console.log('error creating meeting');
                    res.status(400).send('error creating meeting')
                }
            console.log("Meeting Created Successfully")
            }); 
        });
    });
  
    res.status(200).send("Meeting Created Successfully");
};

exports.allMeeting = (req, res) => {
  
    var sql = "SELECT * FROM interview_meetings";
    con.query(sql, function (err, result) {
        if (err){
            console.log('unable to get meetings')
        };
        res.status(200).send(result);
    });
  
};
