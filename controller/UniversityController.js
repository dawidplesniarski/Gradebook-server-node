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
    }
}

module.exports = UniversityController;