const Grades = require('../models/Grades');

const GradesController = {
    findAll: async (req,res)=>{
        try{
            const grades = await Grades.find();
            res.json(grades);
        }catch(err){
            res.json({message:err})
        }
    },
    findByAlbum : async (req,res)=>{
        try{
            const studentGrades = await Grades.find({studentAlbum: req.params.studentAlbum});
            res.json(studentGrades);
        }catch(err){
            res.json({message:err})
        }
    },
    addGrade: async (req,res) =>{
        const grade = new Grades({
            studentAlbum: req.body.studentAlbum,
            grade : req.body.grade,
            subject: req.body.subject
        });

        try{
            const savedGrade = await grade.save();
            res.json(savedGrade);
        }catch(err){
            res.json({message:err});
        }
    },
    findLatest: async(req, res) =>{
        try{
            const latestGrade = await Grades.findOne({albumNo: req.param.albumNo}).sort({date: -1}).limit(1);
            res.json(latestGrade)
        }catch(err){
            res.json(err);
        }
    }
}
module.exports = GradesController;