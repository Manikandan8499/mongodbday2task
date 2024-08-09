
//Question 1). Finding all topics and tasks taught in October.
db.topics.find({
    date: {
      $gte: "2020-10-01T00:00:00Z",
      $lt: "2020-11-01T00:00:00Z"
    }
  });
  
  // Tasks taught in October
  db.tasks.find({
    assigned_date: {
      $gte: "2020-10-01T00:00:00Z",
      $lt: "2020-11-01T00:00:00Z"
    }
  });


//Question 2). Finding all company drives between October 15 and October 31, 2020.

db.company_drive.find( {date : {$gte: "2020-10-15T00:00:00Z" , $lt : "2020-11-01T00:00:00Z"}});



//Question 3). Finding company drives and students who appeared for placement.

db.company_drive.find({ students: { $ne: [] } });


//Question 4). Finding the number of problems solved by users in Codekata.

db.codecata.aggregate([ { $group : {_id : "66b5bbd0569923f0d293ba83", totalnumberproblemsolved : { $sum : "$problems_solved"}}}])


//Question 5). Finding mentors with more than 15 mentees.

db.mentors.find({ $where: "this.mentees.length > 15" })


//Question 6). Finding users who were absent and didn't submit tasks between October 15 and October 31, 2020.

// Find users absent between the specified dates
let absentUsers = db.attendance.find({
    date: {
      $gte:"2020-10-15T00:00:00Z",
      $lt: "2020-11-01T00:00:00Z"
    },
    status: "absent"
  }).map(doc => doc.user_id);
  
  // Find users who did not submit tasks between the specified dates
  let noTaskUsers = db.tasks.find({
    submission_date: {
      $gte: "2020-10-15T00:00:00Z",
      $lt: "2020-11-01T00:00:00Z"
    },
    user_id: { $nin: absentUsers }
  }).map(doc => doc.user_id);
  
  // Combine and count the users
  let usersCount = db.users.find({
    _id: { $in: absentUsers, $nin: noTaskUsers }
  }).count();
  