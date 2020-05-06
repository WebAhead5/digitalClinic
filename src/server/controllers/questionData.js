
const answerM = require("../../models/answers.model")
const questionM = require("../../models/questions.model")
const validator = require("../../models/validator")


exports.get = async (req,res,next)=>{

    if (isNaN(req.params.question_id))
        return res.redirect("/dashboard")

    let questionId = parseInt(req.params.question_id);

    //load data
    try {
        var answers = await answerM.getFor(questionId)
        answers.sort((a,b)=> a.id - b.id)
        var questionData = await questionM.getById(questionId)



    } catch (e) {
        next(e)
    }

    //if no question was found
    if(!questionData)
        res.redirect("/dashboard")



    //render
    res.render("questionData",{
        answers,
        questionData
    })

}



exports.post = async (req,res,next)=> {

    const {context}=req.body;
    //validate context field
    if (validator.isEmptyString(context))
        return res.redirect("/dashboard");

    //check if the provided id in the route is a number
    if (isNaN(req.params.question_id))
        return res.redirect("/dashboard")
    let questionId = parseInt(req.params.question_id);

    //validate if question exists
    try {
        var questionData = await questionM.getById(questionId)
        if (!questionData)
            throw new Error("question does not exist")

    } catch (e) {
        next(e)
    }


    await answerM.add(res.locals.user.id, questionId ,context)
    res.redirect(req.path)

}