function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function sanitizeInteger(el) {
    el.value = el.value.replace(/[^0-9]/g, "");
}

function sanitizeSignedNumber(el) {
    el.value = el.value.replace(/[^0-9.\-]/g, "");
}

function fahrenheitToCelsius(f) {
    return (5 / 9) * (f - 32);
}

function celsiusToFahrenheit(c) {
    return (c * 9) / 5 + 32;
}

function onFahrenheitChange() {
    const fEl = document.getElementById("fahrenheit");
    sanitizeSignedNumber(fEl);

    if (fEl.value.trim() === "") return;

    const f = Number(fEl.value);
    if (isNaN(f)) return;

    document.getElementById("celsius").value = fahrenheitToCelsius(f).toFixed(2);
}

function onCelsiusChange() {
    const cEl = document.getElementById("celsius");
    sanitizeSignedNumber(cEl);

    if (cEl.value.trim() === "") return;

    const c = Number(cEl.value);
    if (isNaN(c)) return;

    document.getElementById("fahrenheit").value = celsiusToFahrenheit(c).toFixed(2);
}

let score2 = { correct: 0, total: 0 };
let current2 = { a: 0, b: 0, answer: 0 };

function generateTask2() {
    current2.a = randInt(1, 10);
    current2.b = randInt(1, 10);
    current2.answer = current2.a * current2.b;
}

function renderTask2() {
    document.getElementById("question2").textContent = `${current2.a} × ${current2.b} = `;
    document.getElementById("answer2").value = "";
    document.getElementById("result2").textContent = "";
    document.getElementById("result2").className = "result";
}

function nextTask2() {
    generateTask2();
    renderTask2();
}

function updateScore2() {
    const percent = score2.total ? Math.round((score2.correct / score2.total) * 100) : 0;
    document.getElementById("score2").textContent =
        `Загальний рахунок ${percent}% (${score2.correct} правильних відповідей з ${score2.total})`;
}

function checkAnswer2() {
    const el = document.getElementById("answer2");
    sanitizeInteger(el);

    const resultEl = document.getElementById("result2");

    if (el.value.trim() === "") {
        resultEl.textContent = "Введіть число!";
        resultEl.className = "result fail";
        return;
    }

    const value = Number(el.value);

    score2.total++;

    if (value === current2.answer) {
        score2.correct++;
        resultEl.textContent = "Правильно!";
        resultEl.className = "result ok";
    } else {
        resultEl.textContent = `Помилка, правильна відповідь «${current2.answer}»`;
        resultEl.className = "result fail";
    }

    updateScore2();
}

let score3 = { correct: 0, total: 0 };
let current3 = { a: 0, b: 0, answer: 0 };

function generateTask3() {
    current3.a = randInt(1, 10);
    current3.b = randInt(1, 10);
    current3.answer = current3.a * current3.b;
}

function generateOptions3(correct) {
    const options = new Set([correct]);
    while (options.size < 4) {
        const candidate = randInt(Math.max(1, correct - 10), correct + 10);
        options.add(candidate);
    }
    return shuffleArray([...options]);
}

function renderOptions3() {
    const container = document.getElementById("options3");
    container.innerHTML = "";

    const options = generateOptions3(current3.answer);

    options.forEach(value => {
        const label = document.createElement("label");

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "mult-answer";
        radio.value = value;
        radio.onclick = () => checkAnswer3(value);

        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + value));
        container.appendChild(label);
    });
}

function nextTask3() {
    generateTask3();
    document.getElementById("question3").textContent = `${current3.a} × ${current3.b} =`;
    renderOptions3();
    document.getElementById("result3").textContent = "";
    document.getElementById("result3").className = "result";
}

function updateScore3() {
    const percent = score3.total ? Math.round((score3.correct / score3.total) * 100) : 0;
    document.getElementById("score3").textContent =
        `Загальний рахунок ${percent}% (${score3.correct} правильних відповідей з ${score3.total})`;
}

function checkAnswer3(selected) {
    const radios = document.querySelectorAll('#options3 input[type="radio"]');
    radios.forEach(radio => { radio.disabled = true; });

    const resultEl = document.getElementById("result3");

    score3.total++;

    if (Number(selected) === current3.answer) {
        score3.correct++;
        resultEl.textContent = "Правильно!";
        resultEl.className = "result ok";
    } else {
        resultEl.textContent = `Помилка, правильна відповідь «${current3.answer}»`;
        resultEl.className = "result fail";
    }

    updateScore3();
}

function initPhotoRotator(containerId, images) {
    let index = 0;
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    const counter = document.createElement("p");
    counter.className = "counter";

    const row = document.createElement("div");
    row.className = "row";

    const backLink = document.createElement("a");
    backLink.href = "#";
    backLink.textContent = "Назад";

    const img = document.createElement("img");

    const nextLink = document.createElement("a");
    nextLink.href = "#";
    nextLink.textContent = "Вперед";

    const titleEl = document.createElement("p");
    titleEl.className = "title";

    const descEl = document.createElement("p");
    descEl.className = "description";

    function render() {
        const item = images[index];
        img.src = item.path;
        img.alt = item.title;
        titleEl.textContent = item.title;
        descEl.textContent = item.description;
        counter.textContent = `Фотографія ${index + 1} з ${images.length}`;
        backLink.style.visibility = index === 0 ? "hidden" : "visible";
        nextLink.style.visibility = index === images.length - 1 ? "hidden" : "visible";
    }

    backLink.onclick = function (e) {
        e.preventDefault();
        if (index > 0) {
            index--;
            render();
        }
    };

    nextLink.onclick = function (e) {
        e.preventDefault();
        if (index < images.length - 1) {
            index++;
            render();
        }
    };

    row.appendChild(backLink);
    row.appendChild(img);
    row.appendChild(nextLink);

    container.appendChild(counter);
    container.appendChild(row);
    container.appendChild(titleEl);
    container.appendChild(descEl);

    render();
}

let imagesArray = [
    { path: "1.jpg", title: "Жоржини", description: "Букет яскраво-червоних жоржин" },
    { path: "2.jpg", title: "Півонії", description: "Ніжний букет рожевих півоній на світанку" },
    { path: "3.jpg", title: "Тюльпани", description: "Елегантні білі тюльпани" },
    { path: "4.jpg", title: "Троянди", description: "Пишний букет червоних троянд" },
    { path: "5.jpg", title: "Лілія", description: "Рожева лілія з ніжними пелюсткам" }
];

initPhotoRotator("rotator", imagesArray);

function initCaptcha(digitCount) {
    const digits = [];
    for (let i = 0; i < digitCount; i++) {
        digits.push(randInt(0, 9));
    }
    const code = digits.join("");

    const display = document.getElementById("captchaDisplay");
    display.innerHTML = "";

    digits.forEach(d => {
        const span = document.createElement("span");
        span.textContent = d;
        display.appendChild(span);
    });

    const input = document.getElementById("captchaInput");
    input.value = "";

    const resultEl = document.getElementById("captchaResult");
    resultEl.textContent = "";
    resultEl.className = "result";

    input.oninput = function () {
        sanitizeInteger(input);
        checkCaptcha(input.value, code, resultEl);
    };
}

function checkCaptcha(value, code, resultEl) {
    if (value.length < code.length) {
        resultEl.textContent = "";
        resultEl.className = "result";
        return;
    }

    if (value === code) {
        resultEl.textContent = "Правильно!";
        resultEl.className = "result ok";
    } else {
        resultEl.textContent = "Помилка";
        resultEl.className = "result fail";
    }
}

initCaptcha(4);