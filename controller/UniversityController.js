const University = require('../models/University');

const UniversityController = {
    findAll: async (req, res) => {
        try {
            const universities = await University.find();
            res.json(universities);
        } catch (err) {
            res.json({message: err})
        }
    },
    addUniversity: async (req, res) => {
        const university = new University({
            universityName: req.body.universityName
        });

        try {
            const savedUniversity = await university.save();
            res.status(201).send(savedUniversity);
        } catch (err) {
            res.json({message: err});
        }
    },
    findById: async (req, res) => {
        try {
            const university = await University.findById(req.params.universityId);
            res.status(200).send(university);
        } catch (err) {
            res.json({message: err})
        }
    },
    editUniversityData: async (req, res) => {
        try {
            const university = await University.findOne({universityName: req.body.universityName});
            if (!university) {
                const updatedUniversity = await University.findOneAndUpdate(
                    {_id: req.body.universityId},
                    {universityName: req.body.universityName},
                    {useFindAndModify: false});
                res.status(200).send(updatedUniversity);
            } else {
                res.status(409).send(`University with name ${req.body.universityName} already exists!`);
            }
        } catch (err) {
            res.status(400).send({message: err})
        }
    }
}

module.exports = UniversityController;