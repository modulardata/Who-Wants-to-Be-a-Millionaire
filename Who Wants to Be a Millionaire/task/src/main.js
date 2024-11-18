(() => {
    /**
     * @type {{ question: string, A: string, B: string, C: string, D: string, answer: string }[]}
     */
    let questions;
    const container = document.getElementById('container')


    /**
     * @return {{question: string, A: string, B: string, C: string, D: string, answer: string}}
     */
    function getRandomQuestion() {
        const idx = Math.floor(Math.random() * questions.length)
        return questions.splice(idx)[0]
    }

    /**
     * @param { string } choice
     * @param { string } answer
     * @param { number } currentLevel
     * @return { (event: MouseEvent) => void }
     */
    function makeClickHandler(choice, answer, currentLevel) {
        return (e) => {
            if (choice === answer) {
                return start(++currentLevel)
            }
            container.innerHTML = '<p>You Lose!</P>'
        }
    }

    /**
     * @param {{question: string, A: string, B: string, C: string, D: string, answer: string}} question
     * @param { number } level
     */
    function displayQuestion(question, level) {
        console.log(question)
        container.innerHTML = `
            <p>${level}. ${question.question}</P>
            <ol>
                <li id="a"">${question.A}</li>
                <li id="b">${question.B}</li>
                <li id="c">${question.C}</li>
                <li id="d">${question.D}</li>
            </ol>
        `
        document.getElementById('a').onclick = makeClickHandler('A', question.answer, level)
        document.getElementById('b').onclick = makeClickHandler('B', question.answer, level)
        document.getElementById('c').onclick = makeClickHandler('C', question.answer, level)
        document.getElementById('d').onclick = makeClickHandler('D', question.answer, level)
    }

    function startGame() {
        return start(1)
    }

    /**
     * @param { number } level
     */
    function start(level) {
        if (level === 15) {
            container.innerHTML = '<p>Winner!</P>'
            return
        }
        const question = getRandomQuestion()
        displayQuestion(question, level)
    }

    const game = async (uri) => {
        fetch(uri)
            .then(r => r.json())
            .then(q => questions = q)
            .then(startGame)
    }

    game('http://127.0.0.1:8080/question.json');
})()