
const answerM = require("../../models/answers.model")
const questionM = require("../../models/questions.model")


exports.get = async (req,res,next)=>{

    if (isNaN(req.params.question_id))
        return res.redirect("/dashboard")

    let questionId = parseInt(req.params.question_id);

    //load data
    try {
        var answersArr = await answerM.getFor(questionId)
        var questionData = await questionM.getById(questionId)

    } catch (e) {
        next(e)
    }

    //if no question was found
    if(!questionData)
        res.redirect("/dashboard")



    //render
    res.render("questionData",{
        answersArr,

    })

}


exports.post = (req,res)=>{




}