


const questionsM = require("../../models/questions.model");
const answersM = require("../../models/answers.model");



exports.get = async (req,res)=> {

    const questions = await questionsM.getAll()
    let dataArr =questions.map(await async function() {
        return{
            question: q.question_context,
            answers: await answersM.getFor(q.id),
            answersCount: this.answers.length
        }
    });

    res.render("dashboard",{
        dataArray: dataArr
    })


}