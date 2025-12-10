import {settings as s} from './settings';
import {Player} from './Player';

const ticTacToe = {
    removeJSMessage() {
        document.documentElement.classList.add(s.jsClass);
        document.querySelector(s.noJsMessageSelector).remove();
    }, initData() {
        this.players = [new Player(s.jsName), new Player(s.loveName)];
        this.currentPlayer = 0;
        this.remainingTime = s.maxTime;
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
        this.displayTime()
    },
    formatTime() {
        const minutes = Math.trunc(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        return `${minutes<10?'0':''}${minutes} : ${seconds<10?'0':''}${seconds}`;
    },
    displayTime() {
        this.timerElement.textContent = this.formatTime();
    },
};
ticTacToe.init();