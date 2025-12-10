import {settings as s} from './settings';
import {Player} from './Player';

const ticTacToe = {
    removeJSMessage() {
        document.documentElement.classList.add(s.jsClass);
        document.querySelector(s.noJsMessageSelector).remove();
    }, initData() {
        this.players = [new Player(s.jsName), new Player(s.loveName)];
        this.currentPlayerIdx = 0;
        this.remainingTime = s.maxTime;
        this.intervalId = null;
    }, initGameBoard() {
        for (let i = 0; i < s.maxItemElements; i++) {
            this.listContainerElement.insertAdjacentHTML('beforeend', s.listItemHTML);
        }
    }, getHTMLElements() {
        this.resultElements = document.querySelectorAll(s.resultItemSelector);
        this.listContainerElement = document.getElementById(s.listContainerId);
        this.timerElement = document.querySelector(s.timerSelector);
    }, init() {
        this.removeJSMessage();
        this.getHTMLElements();
        this.initData();
        this.initGameBoard();
        this.addEventListeners();
        this.displayTime();
        this.updateHoverForCurrentPlayer();
    }, resetForm(evt) {
        evt.preventDefault();
        document.querySelector(s.playAgainFormSelector).remove();
        this.resetGame();
    }, formatTime() {
        const minutes = Math.trunc(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        return `${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
    }, displayTime() {
        this.timerElement.textContent = this.formatTime();
    }, displayGameOverForm() {
        const lostForm = document.querySelector(s.lostFormTemplateSelector).content;
        document.body.appendChild(lostForm);
    }, updateTime() {
        this.remainingTime--;
        if (this.remainingTime === 0) {
            clearInterval(this.intervalId);
            this.displayGameOverForm();
            document.querySelector(s.playAgainFormSelector).addEventListener('submit', this.resetForm.bind(this));

        }
        this.displayTime();
    }, startTimer() {
        if (this.intervalId === null) {
            this.intervalId = setInterval(this.updateTime.bind(this), 1000);
        }
    }, updateCurrentPlayer() {
        this.currentPlayerIdx++;
        if (this.currentPlayerIdx === this.players.length) {
            this.currentPlayerIdx = 0;
        }
    }, updateScore() {
        this.players[this.currentPlayerIdx].score++;
    }, displayScore() {
        const currentScoreItem = this.resultElements[this.currentPlayerIdx];
        currentScoreItem.textContent = currentScoreItem.dataset.name + (this.players[this.currentPlayerIdx].score);
    }, displayAllScores() {
        for (let i = 0; i < this.players.length; i++) {
            this.currentPlayerIdx = i;
            this.displayScore();
        }
        this.currentPlayerIdx = 0;
    }, displayCard(evt,) {
        if (evt.currentTarget.classList.length === 1) {
            evt.currentTarget.classList.add(s.listItemPrefix + this.players[this.currentPlayerIdx].name);
        }

    }, updateHoverForCurrentPlayer() {
        this.listContainerElement.className = s.gridClass + ' ' + this.players[this.currentPlayerIdx].name;
    }, play(evt) {
        this.startTimer();
        this.displayCard(evt);
        this.updateScore();
        this.displayScore();
        this.updateCurrentPlayer();
        this.updateHoverForCurrentPlayer();

    }, addEventListeners() {
        document.querySelectorAll(s.listItemSelector).forEach((listItem) => {
            listItem.addEventListener('click', (evt) => {
                this.play(evt);
            });
        });
    }, resetGame() {
        this.initData();
        this.displayTime();
        this.listContainerElement.innerHTML = '';
        this.initGameBoard();
        this.updateHoverForCurrentPlayer();
        this.displayAllScores();
        this.addEventListeners();
    }
};
ticTacToe.init();