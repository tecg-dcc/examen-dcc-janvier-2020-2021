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
        this.listContainerElement.className = 'grid ' + this.players[this.currentPlayerIdx].name;
    }, formatTime() {
        const minutes = Math.trunc(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        return `${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
    }, displayTime() {
        this.timerElement.textContent = this.formatTime();
    }, updateTime() {
        this.remainingTime--;
        if (this.remainingTime === 0) {
            clearInterval(this.intervalId);
            // TODO : game over...
        }
        this.displayTime();
    }, startTimer() {
        if (this.intervalId === null) {
            this.intervalId = setInterval(this.updateTime.bind(this), 1000);
        }
    }, nextPlayer() {
        this.currentPlayerIdx++;
        if (this.currentPlayerIdx === this.players.length) {
            this.currentPlayerIdx = 0;
        }
    }, updateScore(currentPlayer) {
        const currentScoreItem = this.resultElements[this.currentPlayerIdx];
        currentScoreItem.textContent = currentScoreItem.dataset.name + (++currentPlayer.score);
    }, displayCard(evt, currentPlayer) {
        evt.currentTarget.classList.add(s.listItemPrefix + currentPlayer.name);


    }, play(evt) {
        this.startTimer();
        const currentPlayer = this.players[this.currentPlayerIdx];

        this.displayCard(evt, currentPlayer);

        this.updateScore(currentPlayer);

        this.nextPlayer();

        this.listContainerElement.className = 'grid ' + this.players[this.currentPlayerIdx].name;

    }, addEventListeners() {
        document.querySelectorAll(s.listItemSelector).forEach((listItem) => {
            listItem.addEventListener('click', (evt) => {
                this.play(evt);
            });
        });
    }
};
ticTacToe.init();