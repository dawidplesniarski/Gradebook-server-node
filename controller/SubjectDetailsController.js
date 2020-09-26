const SubjectDetails = require('../models/SubjectDetails');

const SubjectDetailsController = {
    findBySubjectName: async (req, res) => {
        try {
            const subjectDetails = await SubjectDetails({subjectName : req.params.subjectName});
            res.status(200).send(subjectDetails);
        } catch (err) {
            res.status(404).send({message: "Error"});
        }
    },
    addSubjectDetails: async (req, res) => {
        const subjectDetails = new SubjectDetails({
            ects: req.body.ects,
            hours: req.body.hours,
            type: req.body.type,
            subjectName: req.body.subjectName
        });
        try{
            const savedSubjectDetails = await subjectDetails.save();
            res.status(201).send(savedSubjectDetails);
        }catch(err){
            res.status(404).send('Error');
        }
    }
};

module.exports = SubjectDetailsController;