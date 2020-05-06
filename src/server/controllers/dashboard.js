const questionsM = require("../../models/questions.model");
const answersM = require("../../models/answers.model");
const validator = require("../../models/validator")


exports.get = async (req,res,next)=> {

    try {
        const questions = await questionsM.getAll()
        let dataArr = [];
        for(let i = 0; i<questions.length; i++){

            let temp = {
                questionData: questions[i],
                answers:  await answersM.getFor(questions[i].id),
            }
            temp.answersCount = temp.answers.length;
            dataArr.push(temp)
        }


        res.render("dashboard",{
            dataArray: dataArr,
            title: "dashboard"
        })

    }
    catch (e) {
        next(e)
    }


}


exports.post = async (req,res)=> {

    const {context}=req.body;
    if (validator.isEmptyString(context))
       return res.redirect("/dashboard");

    await questionsM.add(res.locals.user.id,context)
    res.redirect("/dashboard")

}