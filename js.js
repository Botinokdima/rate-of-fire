var body = document.body
var wrapper = document.getElementById('wrapper')
var selectionPanel = document.getElementById('selectionPanel')
var fieldGame = document.getElementById('fieldGame')

var rangeSpeed = document.getElementById('rangeSpeed')
var rangeSize = document.getElementById('rangeSize')

var resultSpeed = document.getElementById('resultSpeed')
var resulSize = document.getElementById('resulSize')

var hit = document.getElementById('hit')
var miss = document.getElementById('miss')
var life = document.getElementById('life')
var lifeSrc = document.getElementById('lifeSrc')

var btnStart = document.getElementById('btnStart')
var btnStop = document.getElementById('btnStop')

var gameMode = document.querySelectorAll('#game-mode button')
//------------------------------------------------------------------------------------------------------------------------------
//FUNCTION SETTING
var width = fieldGame.scrollWidth - 100 // определение размера игровой зоны
var height = fieldGame.scrollHeight - 100 // определение размера игровой зоны

functionInputRange(rangeSpeed, resultSpeed, rangeSpeed) //скорость
functionInputRange(rangeSize, resulSize, rangeSize)  //размер

var objDefault = { hit, miss, life, 'zero': 0, 'l': 10 }

gameMode.forEach(elem =>
    elem.addEventListener('click', () => {
        document.querySelector('button.activeColor').classList.remove('activeColor')
        elem.classList.add('activeColor')
        objDefault.l = elem.value
        functionDefault(objDefault)
    })
)
// -----------------------------------------------------------------------------------------------------------------------------
//FUNCTION START
btnStart.addEventListener('click', function () {
    btns.forEach(elems => elems.disabled = true)
    btnStart.disabled = true
    btnStart.style.backgroundColor = 'red'
    lifeSrc.src = './nav/' + 'life.png'
    life.style.color = 'green'

    secondsTime()
    functionDefault(objDefault)
    //---------------------------------------------------------------------------------------------------------------------------
    // FUNCTION CLICK
    fieldGame.addEventListener('mousedown', mainStart)
    function mainStart() {
        playAudio('miss.wav')
        miss.innerHTML++
    }
    //-------------------------------------------------------------------------------------------------------------------------
    // скорость появления мишений
    window.setStop = setInterval(creatingTargets, rangeSpeed.value)
    rangeSpeed.addEventListener('input', RangeStart)

    function RangeStart() {
        clearTime(window.setStop)
        window.setStop = setInterval(creatingTargets, rangeSpeed.value)
    }
    //-----------------------------------------------------------------------------------------------------------------------
    // FUNCTION STOP GAME
    btnStop.addEventListener('click', stopIgra)
    function stopIgra() {
        fieldGame.innerHTML = ''
        clearTime(window.setStop)
        clearTime(window.stopWatch)
        btnStart.disabled = false
        btns.forEach(elems => elems.disabled = false)
        btnStart.style.backgroundColor = 'OrangeRed'

        fieldGame.removeEventListener("animationend", endOfAnimation)
        rangeSpeed.removeEventListener('input', RangeStart)
        fieldGame.removeEventListener('mousedown', mainStart)
        window.removeEventListener('keydown', addTogglePaused)
        window.removeEventListener('blur', careFunc) 
    }
    //--------------------------------------------------------------------------------------------------------------------
    // FUNCTION  то что происходит при завершении анимацыи
    fieldGame.addEventListener("animationend", endOfAnimation)
    function endOfAnimation() {
        fieldGame.removeChild(fieldGame.firstElementChild)
        playAudio('life.mp3')
        life.innerHTML--

        if (life.innerHTML <= 5) {
            lifeSrc.src = './nav/' + 'life2.png'
            life.style.color = 'red'
        }
        if (life.innerHTML <= 0) stopIgra()
    }
    //-------------------------------------------------------------------------------------------------------------------
    //FUNCTION ADD PAUSED 
    var pausedWrap = document.getElementById('pausedWrap')
    window.addEventListener('keydown', addTogglePaused)

    function addTogglePaused() {
        if (event.keyCode == 80 || event.keyCode == 32) {

            pausedWrap.classList.toggle('paused')
            addPause()
        }
    }
    //-------------------------------------------------------------------------------------------------------------------
    // //пауза при уходе со-страницы
    window.addEventListener('blur', careFunc) 
    function careFunc(){
        if (pausedWrap.classList.contains('paused')) {
            pausedWrap.classList.add('paused')
        }
        else {
            pausedWrap.classList.add('paused')
        }
        addPause()
    }
    //------------------------------------------------------------------------------------------------------------------------------
    function addPause() {
        var target = document.querySelectorAll('.target')
        if (pausedWrap.classList.contains('paused')) {
            target.forEach(elem => elem.style.animationPlayState = 'paused')
            clearTime(window.setStop)
            clearTime(window.stopWatch)
        }
        else {
            target.forEach(elem => elem.style.animationPlayState = 'running')
            RangeStart()
            stopwatch()
        }
    }
})
//-------------------------------------------------------------------------------------------------------------------------------
//FUNCTION STOPWATCH
function zero(num) {
    if (num <= 9) return '0' + num
    else return num
}

function secondsTime() {
    var hours = document.getElementById('hours').innerHTML = '00'
    var minutes = document.getElementById('minutes').innerHTML = '00'
    var seconds = document.getElementById('seconds').innerHTML = '00'

    window.stopWatch = setInterval(stopwatch, 1000)
}

function stopwatch() {
    seconds.innerHTML = zero(Number(seconds.innerHTML) + 1)
    if (seconds.innerHTML >= 60) {
        minutes.innerHTML = zero(Number(minutes.innerHTML) + 1)
        seconds.innerHTML = 0
    }
    if (minutes.innerHTML >= '60') {
        hours.innerHTML = zero(Number(hours.innerHTML) + 1)
        minutes.innerHTML = 0
    }
    if (hours.innerHTML >= 24) {
        hours.innerHTML = 0
    }
}
//--------------------------------------------------------------------------------------------------------------------------
// функцыя появление мишений
var targetThis = 'bgTarget_1.png'
function creatingTargets() {
    var span = document.createElement('span')
    span.classList.add('target')
    span.style.left = randomAddElems(width) + 'px'
    span.style.top = randomAddElems(height) + 'px'
    span.style.width = rangeSize.value + 'px'
    span.style.height = rangeSize.value + 'px'
    span.style.background = 'url(./targetBackground/' + targetThis + ')'
    span.style.backgroundSize = 'cover'
    span.addEventListener('mousedown', function () {
        event.stopPropagation()
        playAudio('click.mp3')
        hit.innerHTML++
        fieldGame.removeChild(span)
    })
    fieldGame.appendChild(span)
}
//-------------------------------------------------------------------------------------------------------------
// FUNCTION ADD SOUND
function playAudio(sound) {
    var myAudio = new Audio;
    myAudio.src = "./sound/" + sound;
    myAudio.play();
}
//----------------------------------------------------------------------------------------------------------------
var arrScreenBg = ['bgScreen_1.jpg', 'bgScreen_2.jpg', 'bgScreen_3.jpg', 'bgScreen_4.jpg', 'bgScreen_5.jpg', 'bgScreen_6.jpg', 'bgScreen_7.jpg', 'bgScreen_8.jpg',
    'bgScreen_9.jpg', 'bgScreen_10.jpg', 'bgScreen_11.jpg', 'bgScreen_12.jpg', 'bgScreen_13.jpg', 'bgScreen_14.jpg', 'bgScreen_15.jpg','bgScreen_16.jpg','bgScreen_17.jpg','bgScreen_18.jpg']
var arrFieldBg = ['bgField_1.jpg', 'bgField_2.jpg', 'bgField_3.jpg', 'bgField_4.jpg', 'bgField_5.jpg', 'bgField_6.jpg', 'bgField_7.jpg', 'bgField_8.jpg',
    'bgField_9.jpg', 'bgField_10.jpg', 'bgField_11.jpg', 'bgField_12.jpg', 'bgField_13.jpg','bgField_14.jpg','bgField_15.jpg','bgField_16.jpg',]
var arrTargetBg = ['bgTarget_1.png', 'bgTarget_2.png', 'bgTarget_3.png', 'bgTarget_4.png', 'bgTarget_5.png', 'bgTarget_6.png', 'bgTarget_7.png', 'bgTarget_8.jpg',
    'bgTarget_9.png', 'bgTarget_10.png', 'bgTarget_11.png', 'bgTarget_12.png', 'bgTarget_13.png', 'bgTarget_14.png', 'bgTarget_15.png','bgTarget_16.png']
//FUNCTION BACKGROUND CHANGE
var screenBg = document.querySelector('#screenBackground') // смена обоев wrapper
var fieldBg = document.querySelector('#gameFieldBackground') // смена обоев игровой зоны
var targetBg = document.querySelector('#targetBackground') // // смена цели


createElemBg(arrScreenBg, screenBg, wrapper, './minScreenBg/', './screenBackground/', backgroundChange,'#screenBackground button')
createElemBg(arrFieldBg, fieldBg, fieldGame, './minFieldBg/', './fieldBackground/', backgroundChange,'#gameFieldBackground button')
createElemBg(arrTargetBg, targetBg, targetThis, 'targetBackground/', 'targetBackground/', targetChange,'#targetBackground button')

function createElemBg(arr, elem, main, way, way2, func,id) {
    
    for (let i = 0; i < arr.length; i++) {
        var btn = document.createElement('button')
        btn.classList.add('blockSizeMiniature')
        btn.value = arr[i]
        btn.style.backgroundImage = 'url(' + way + arr[i] + ')'
        btn.addEventListener('click', function () {
            func(this, main, way2)
            addClassActiveChadow(addId(id), this)
        })
        elem.appendChild(btn)
    }
}
var btns = selectionPanel.querySelectorAll('button')

function addId(id){
   return  document.querySelectorAll(id)
}
function backgroundChange(elemThis, main, way2) {
    main.style.background = 'url(' + way2 + elemThis.value + ') no-repeat center/cover'
}
function targetChange(elemThis) {
    targetThis = elemThis.value
}
//-----------------------------------------------------------------------------------------------------------------------------------
//FUNCTION CHANGE CURSOR
function changeCursor(main, elem) {
    for (var i = 0; i < elem.length; i++) {
        elem[i].addEventListener('click', colorCursor)
        elem[i].addEventListener('click', function () {
            main.style.cursor = 'url(./gameCursor/' + this.value + '), auto'
            addClassActiveChadow(elem, this)
        })
    }
}
// смена прицела
var gameCursor = document.querySelectorAll('#gameCursor>button')
changeCursor(body, gameCursor)
//----------------------------------------------------------------------------------------------------------------------------------
//FUNCTION CHANGE COLOR-CURSOR
var colorGameCursor = document.querySelectorAll('.colorGameCursor')
function colorCursor() {
    for (var i = 0; i < colorGameCursor.length; i++) {
        colorGameCursor[i].value = i + 1 + this.value.substring(1)

        colorGameCursor[i].addEventListener('click', function () {
            body.style.cursor = 'url(./gameCursor/' + this.value + '), auto'
            addClassActiveChadow(colorGameCursor, this)
        })
    }
}
//------------------------------------------------------------------------------------------------------------------------------
//FUNCTION CLASS ACTIVESHADOW
function addClassActiveChadow(elem, elemThis) {
    event.stopPropagation()
    if (!elemThis.classList.contains('activeShadow')) {
        for (let iterator of elem) {
            iterator.classList.remove('activeShadow')
        }
    }
    elemThis.classList.add('activeShadow')
}
//-------------------------------------------------------------------------------------------------------------------------------
// открытие менюшки
var li = document.querySelectorAll('li')

for (var i = 2; i < li.length; i++) {
    li[i].addEventListener('click', function () {
        if (!this.classList.contains('activeHeight')) {
            for (var i = 2; i < li.length; i++) {
                li[i].classList.remove('activeHeight')
                li[i].style.height = '30px'
                li[i].firstElementChild.style.marginBottom = '50px'
            }
        }
        this.firstElementChild.style.marginBottom = '10px'
        this.classList.add('activeHeight')
        this.style.height = this.scrollHeight + 'px'
    })
}
//-----------------------------------------------------------------------------------------------
//FUNCTION CLEARiNTERVAL
function clearTime(id) {
    clearInterval(id)
}
//----------------------------------------------------------------------------------------------
//FUNCTION INPUT RANGE
function functionInputRange(elem, id, rangeSpeed) {
    elem.addEventListener('input', function () {
        id.innerHTML = ' ' + rangeSpeed.value
    })
}
//-----------------------------------------------------------------------------------------------------
//FUNCTION RANDOM
function randomAddElems(elem) {
    return Math.floor(Math.random() * elem)
}
//-----------------------------------------------------------------------------------------------------
//DEFAULT
function functionDefault({ hit, miss, life, zero, l }) {
    hit.innerHTML = zero
    miss.innerHTML = zero
    life.innerHTML = l
}
//----------------------------------------------------------------------------------------------------------