const Job = require("../models/job.model")

class JobController {
   //create job 
  createJob = async (req,res) =>{
     const job = Job(req.body)
     job.save()
     .then ((savedJob) => res.status(200).json(savedJob))
     .catch((err)=> res.status(500).json(err))
  }
   
  //UpdateJob
  updateJob = async (req,res) => {
    const job = await Job.findById({_id:req.params.id})
     if ( job.username === req.body.username){

          await Job.findByIdAndUpdate({_id:req.params.id},req.body , {new:true})

         .then((updatedjob)=> res.status(200).json(updatedjob))
         .catch((err) => res.status(500).json(err))
     }
     
    else {
        res.status(401).json('Sorry you can update only your job ')
     }
  }

   //Delete job
  deletejob = async(req,res) =>{
    if (Job.username === req.body){

      await Job.deleteOne({_id: req.params.id})
     .then((deleteConfirmation) => res.status(200).json(deleteConfirmation))
     .catch((err) => res.status(500).json(err))
    }
    else {
        res.status(401).json('Sorry you can delete only your job ')
    }
}

   //GetJob
  getAllJob = async (req,res) =>{
      username = req.query.username 
      cat = req.query.cat
      title = req.query.title
        .then(async () => { 
            let jobs
             if (username){
                jobs = await Job.find({username})
             }
             else if (categories){
                 jobs = await Job.find({categories: $in [cat]})
             }
             else if (title){
                 jobs = await Job.find({title})
             }
             else {
                 jobs = await Job.find()
             }
             res.status(200).json(job)
        })
        .catch((err) => { 
            res.status(500).json(err)
        })  

  }
  
}  module.exports = new JobController();