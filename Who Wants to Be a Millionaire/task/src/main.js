const URL = 'http://127.0.0.1:8080/question.json';
const jsonOutput = document.getElementById('container');

const game = async () => {
    // write your code here
    try {
        const response = await fetch(URL);
        const data = await response.json();
        jsonOutput.innerHTML = JSON.stringify(data);
    } catch (error) {
        console.error("Error fetching data", error);
        jsonOutput.innerHTML = 'Error fetching data';
    }

}

game();