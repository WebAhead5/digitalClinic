

const questionsM =require("../../models/questions.model")


exports.get = async (req,res,next)=>{



    try {
        let questions = await questionsM.getAll()
        res.json(questions)

    } catch (e) {
        next(e);
    }


}