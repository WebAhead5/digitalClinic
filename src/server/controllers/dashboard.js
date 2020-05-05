


const questionsM = require("../../models/questions.model");
const answersM = require("../../models/answers.model");



exports.get = async (req,res,next)=> {

    try {
        const questions = await questionsM.getAll()
        let dataArr = [];
        for(let i = 0; i<questions.length; i++){

            let temp = {
                questionObj: questions[i],
                answers:  await answersM.getFor(questions[i].id),
            }
            temp.answersCount = temp.answers.length;
            dataArr.push(temp)
        }


        res.render("dashboard",{
            dataArray: dataArr
        })

    }
    catch (e) {
        next(e)
    }



1
}