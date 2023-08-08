const textElement = document.getElementById('text-animation');
const inputElement = document.querySelector('.terminal-input');
const outputElement = document.querySelector('.terminal-output');
const text = "Are you ready for the quiz ? (Y / N)";
const wordsPerSecond = 10;
const delayInSeconds = 0.5;

let currentProblemIndex = 0;
const problems = [ // Cho de cau hoi
    {
        prompt: "Bài 1: Hãy tìm và sửa 2 lỗi sai trong đoạn code sau",
        code: `def division_by_repeated_subtraction(dividend, divisor):
   if divisor == 0:
       raise ValueError("Cannot divide by zero")
  
   quotient = 0
   remainder = dividend
  
   while remainder >= divisor:
       remainder -= divisor
       quotient += 1
   return quotient, remainder`
    },
    {
        prompt: "Bài 2: Implement the custom_fizzbuzz function:",
        code: `def custom_fizzbuzz(n):
   custom_divisors = {3: "Fizz", 5: "Buzz", 7: "Bizz"}
  
   for i in range(1, n + 1):
       output = ""
       for divisor, word in custom_divisors.items():
           if i % divisor == 0:
               output += word
       print(output)`
    }
    // Add more problems here if needed
];

function animateText() {
    let words = text.split(' ');
    let currentIndex = 0;

    function printNextWord() {
        if (currentIndex < words.length) {
            textElement.textContent += words[currentIndex] + ' ';
            currentIndex++;
            setTimeout(printNextWord, 1000 / wordsPerSecond);
        } else {
            inputElement.style.display = 'inline';
            inputElement.addEventListener('keydown', handleUserInput);
        }
    }

    setTimeout(printNextWord, delayInSeconds * 1000);
}

function handleUserInput(event) {
    if (event.key === 'Enter') {
        const userInput = inputElement.value.trim().toUpperCase();

        if (userInput === 'Y') {
            displayProblem();
            if (inputElement.tagName == 'TEXTAREA') {
                // If the user pressed Enter, submit their code
                submitUserCode(inputElement.value);
            } else {
                // Otherwise, check the user input
                checkUserCode(userInput);
            }
            
        } else if (userInput === 'N') {
            window.close();
        }
        inputElement.value = '';
    } else {
        usercode = inputElement.value;
    }
}

function displayProblem() {
    outputElement.innerHTML = problems[currentProblemIndex].prompt + '<br><br>';
    outputElement.innerHTML += '<pre>' + problems[currentProblemIndex].code + '</pre>';

    const newInputElement = document.createElement('textarea');
    newInputElement.className = 'terminal-input';
    newInputElement.style.padding = "10px";
    newInputElement.placeholder = 'Type your solution...';
    outputElement.appendChild(newInputElement);

    inputElement.removeEventListener('keydown', handleUserInput);
    inputElement.style.display = 'none';
}

function submitUserCode(userCode) { // Code loi o cho nay
    // You can add code checking logic here
    // For now, let's assume userCode is correct

    outputElement.innerHTML += "Congratulations! You solved the problem! 🎉<br>";
    outputElement.innerHTML += "Moving on to the next problem...<br><br>";

    currentProblemIndex++;
    if (currentProblemIndex < problems.length) {
        displayProblem();
    } else {
        outputElement.innerHTML += "You have completed all the problems. Well done!";
    }
}

animateText();
