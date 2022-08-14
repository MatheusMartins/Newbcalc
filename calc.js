var disp = document.querySelector("#display")
disp.innerHTML = '0' ;

function operate(val, evaluation){
    var currDisplay = disp.innerHTML;
    var history = document.querySelector('#history')
    var evaluation;
    if(val=='=') {
        try {
            evaluation = eval(disp.innerText)
            history.innerHTML = history.innerHTML + '<div>' + currDisplay + '</div><div>' + evaluation + '</div>'
        } catch(err) {
            console.log("Error: ", err)
            evaluation = 'Err'
        }
    } else if(val=='CLN') {
        evaluation = '0'
    } else if(val=='= y') {
        var formula = document.querySelector('.manualForm').value
        var finalFormula = formula.replace('x', currDisplay)
        console.log("Try: ", formula.replace('x', currDisplay))
        try {
            evaluation = eval(finalFormula)
        } catch(err) {
            console.log("Error: ", err)
            evaluation = 'Err'
        }
        history.innerHTML = history.innerHTML + '<div>' + finalFormula + '</div><div>' + evaluation + '</div>'
    } else {
        if (currDisplay == '0') {
            currDisplay = ''
        }
        evaluation = currDisplay + val
    }
    return evaluation
}
function handleClick(e) {
    var val = e.target.innerHTML; 
    disp.innerHTML = operate(val);

}
function handleKey(e) {
    var val = e; 
    disp.innerHTML = operate(val);

}
document.addEventListener('click', function(event){
    if(event.target.classList.contains("buttonC")) {
        handleClick(event)
    }
})
document.addEventListener('keydown', function(e){
    console.log("Key: ", e.key)
    if(document.activeElement.tagName==='INPUT') {
        console.log("Key: ", document.activeElement.tagName)
    } else {
        var acceptable = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        var input = e.key
        var theFormInp = document.querySelector('.manualForm')
        if(input in acceptable || input=='+' || input=='-' || input=='*' || input=='=' || input=='/'){
            handleKey(input)
        }
        if(input=='Enter') handleKey('=')
    }
})

function wipeHistory() {
    var wipedHistory = `
    <div>
        <h5><strong>Formula</strong></h5>
    </div>
    <div>
        <h5><strong>Result</strong></h5>
    </div>
    `;
    document.getElementById("history").innerHTML = wipedHistory
}