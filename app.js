// Each level has a separate task bank. "Generate new task" avoids repeating
// the current task when another task is available.
const taskBanks = {
 foundation: [
  {title:"Differentiate a linear function",instruction:"Find the derivative. Use the rule that the derivative of ax is a.",math:"f(x) = 5x + 7",answer:["5"],hint:"The derivative of 5x is 5. The derivative of the constant 7 is 0.",explanation:"Differentiate each term: d/dx(5x) = 5 and d/dx(7) = 0. Therefore f′(x) = 5 + 0 = 5."},
  {title:"Apply the power rule",instruction:"Find f′(x). Bring the exponent down, then reduce the exponent by one.",math:"f(x) = x³",answer:["3x^2","3x²","3*x^2","3*x²"],hint:"The exponent is 3. Multiply by 3 and change x³ to x².",explanation:"By the power rule, d/dx(xⁿ) = nxⁿ⁻¹. Thus d/dx(x³) = 3x²."},
  {title:"Differentiate a quadratic",instruction:"Find the derivative of the expression. Treat each term separately.",math:"f(x) = 2x² + 4",answer:["4x","4*x"],hint:"The derivative of 2x² is 2·2x. The constant 4 differentiates to 0.",explanation:"Using the power rule, d/dx(2x²) = 2·2x = 4x. Since d/dx(4) = 0, the answer is f′(x) = 4x."},
  {title:"Differentiate a polynomial",instruction:"Find f′(x) by differentiating both terms.",math:"f(x) = 4x² − 3x",answer:["8x-3","8x−3","8*x-3"],hint:"The derivative of 4x² is 8x; the derivative of −3x is −3.",explanation:"d/dx(4x²) = 4·2x = 8x. Also d/dx(−3x) = −3. Therefore f′(x) = 8x − 3."},
  {title:"Derivative of a constant",instruction:"What is the derivative of this function?",math:"f(x) = 12",answer:["0"],hint:"A constant does not change as x changes.",explanation:"The graph y = 12 is horizontal, so its gradient is zero everywhere. Therefore f′(x) = 0."}
 ],
 standard: [
  {title:"Differentiate a cubic polynomial",instruction:"Differentiate each term and simplify your answer.",math:"f(x) = 3x³ − 2x² + 6x − 1",answer:["9x^2-4x+6","9x²-4x+6","9*x^2-4*x+6"],hint:"Apply the power rule to the cubic and quadratic terms. The derivative of 6x is 6 and the constant disappears.",explanation:"d/dx(3x³) = 9x²; d/dx(−2x²) = −4x; d/dx(6x) = 6; d/dx(−1) = 0. Hence f′(x) = 9x² − 4x + 6."},
  {title:"Use the product rule",instruction:"Differentiate the product. Use (uv)′ = u′v + uv′.",math:"f(x) = x²(x + 4)",answer:["3x^2+8x","3x²+8x","3*x^2+8*x"],hint:"Let u = x² and v = x + 4. Then u′ = 2x and v′ = 1.",explanation:"Product rule: f′(x) = 2x(x + 4) + x²(1) = 2x² + 8x + x² = 3x² + 8x."},
  {title:"Differentiate a polynomial with fractions",instruction:"Find the derivative and keep coefficients simplified.",math:"f(x) = ½x⁴ + 3x²",answer:["2x^3+6x","2x³+6x","2*x^3+6*x"],hint:"Multiply ½ by 4 for the first term, and multiply 3 by 2 for the second.",explanation:"d/dx(½x⁴) = ½·4x³ = 2x³. d/dx(3x²) = 6x. Therefore f′(x) = 2x³ + 6x."},
  {title:"Find a derivative value",instruction:"First differentiate the function, then evaluate the derivative at x = 2. Enter the numerical value.",math:"f(x) = x³ − 4x; find f′(2)",answer:["8"],hint:"Differentiate to get f′(x) = 3x² − 4, then substitute x = 2.",explanation:"f′(x) = 3x² − 4. Substituting x = 2 gives f′(2) = 3(2²) − 4 = 12 − 4 = 8."},
  {title:"Differentiate a reciprocal power",instruction:"Rewrite the expression as a power of x, then differentiate.",math:"f(x) = 3/x²",answer:["-6/x^3","-6x^-3","-6/x³","-6x⁻³"],hint:"Rewrite 3/x² as 3x⁻², then use the power rule.",explanation:"Rewrite f(x) = 3x⁻². Then f′(x) = 3(−2)x⁻³ = −6x⁻³ = −6/x³."}
 ],
 advanced: [
  {title:"Apply the chain rule",instruction:"Differentiate the composite function using the chain rule.",math:"f(x) = (3x² + 1)⁴",answer:["24x(3x^2+1)^3","24x(3x²+1)³","24*x*(3*x^2+1)^3"],hint:"Outer derivative: 4(3x² + 1)³. Multiply by the inner derivative, 6x.",explanation:"Let u = 3x² + 1. Then f′(x) = 4u³·u′ and u′ = 6x. Thus f′(x) = 24x(3x² + 1)³."},
  {title:"Product rule and simplification",instruction:"Use the product rule and simplify the derivative.",math:"f(x) = (x² + 1)(2x − 3)",answer:["6x^2-6x+2","6x²-6x+2","6*x^2-6*x+2"],hint:"Set u = x² + 1 and v = 2x − 3. Compute u′v + uv′, where u′ = 2x and v′ = 2.",explanation:"f′(x) = 2x(2x − 3) + (x² + 1)2 = 4x² − 6x + 2x² + 2 = 6x² − 6x + 2."},
  {title:"Find a tangent gradient",instruction:"Find the gradient of the tangent at x = 1. Enter a number.",math:"f(x) = x³ − 2x² + 5x; find f′(1)",answer:["4"],hint:"Differentiate first: f′(x) = 3x² − 4x + 5. Then substitute x = 1.",explanation:"f′(x) = 3x² − 4x + 5. Therefore f′(1) = 3 − 4 + 5 = 4. The tangent gradient at x = 1 is 4."},
  {title:"Differentiate a trigonometric composite",instruction:"Use the chain rule and the derivative of sin(u).",math:"f(x) = sin(2x)",answer:["2cos(2x)","2*cos(2x)"],hint:"The derivative of sin(u) is cos(u)·u′. Here u = 2x.",explanation:"With u = 2x, u′ = 2. By the chain rule, f′(x) = cos(2x)·2 = 2cos(2x)."},
  {title:"Second derivative challenge",instruction:"Find the second derivative f′′(x). Differentiate twice.",math:"f(x) = x⁴ − 3x²",answer:["12x^2-6","12x²-6","12*x^2-6"],hint:"First find f′(x) = 4x³ − 6x. Differentiate that result once more.",explanation:"First derivative: f′(x) = 4x³ − 6x. Differentiating again gives f′′(x) = 12x² − 6."}
 ]
};
const levelNames = {foundation:"FOUNDATION",standard:"STANDARD",advanced:"ADVANCED"};
let level = "foundation";
let currentTask = null;
let taskIndex = 0;
const $ = id => document.getElementById(id);
function normalized(s){return s.toLowerCase().replace(/\s+/g,"").replace(/−/g,"-").replace(/²/g,"^2").replace(/³/g,"^3").replace(/⁻/g,"-").replace(/·/g,"*").replace(/′/g,"'");}
function chooseTask(){
  const bank = taskBanks[level];
  let next = Math.floor(Math.random()*bank.length);
  if(bank.length > 1 && currentTask && bank[next] === currentTask){
    next = (next + 1 + Math.floor(Math.random()*(bank.length-1))) % bank.length;
  }
  currentTask = bank[next];
  taskIndex++;
  $("level-pill").textContent = levelNames[level];
  $("task-count").textContent = "Task " + taskIndex + " · " + (next+1) + "/" + bank.length;
  $("task-title").textContent = currentTask.title;
  $("task-instruction").textContent = currentTask.instruction;
  $("task-math").textContent = currentTask.math;
  const guides = {
    foundation:"<strong>Learning support</strong><p>Use the power rule term by term. Constants have derivative zero. Reveal a hint before opening the full explanation.</p>",
    standard:"<strong>Learning support</strong><p>Choose the appropriate differentiation rule, show your steps on paper, and simplify before checking.</p>",
    advanced:"<strong>Challenge approach</strong><p>Identify the structure first: composite function, product, or interpretation task. State the rule you use and justify each step.</p>"
  };
  $("level-guidance").innerHTML = guides[level];
  $("answer").value = "";
  $("feedback").hidden = true;
  $("hint-box").hidden = true;
  $("explanation-box").hidden = true;
}
document.querySelectorAll(".level").forEach(btn => btn.addEventListener("click",()=>{
  level = btn.dataset.level;
  document.querySelectorAll(".level").forEach(b=>{const active=b.dataset.level===level;b.classList.toggle("active",active);b.setAttribute("aria-selected",String(active));});
  currentTask = null;
  chooseTask();
}));
$("new-task").addEventListener("click",chooseTask);
$("hint").addEventListener("click",()=>{
  $("hint-box").innerHTML = "<strong>Hint</strong><p>"+currentTask.hint+"</p>";
  $("hint-box").hidden = false;
});
$("explain").addEventListener("click",()=>{
  $("explanation-box").innerHTML = "<strong>Step-by-step explanation</strong><p>"+currentTask.explanation+"</p>";
  $("explanation-box").hidden = false;
});
$("check").addEventListener("click",()=>{
  const val=normalized($("answer").value);
  const accepted=currentTask.answer.map(normalized);
  $("feedback").hidden=false;
  if(accepted.includes(val)){
    $("feedback").className="feedback good";
    $("feedback").textContent="Correct. Compare your reasoning with the explanation to confirm each step.";
  } else {
    $("feedback").className="feedback try";
    $("feedback").textContent="Not quite. Recheck the differentiation rule and signs. Try the hint, then check again.";
  }
});
$("answer").addEventListener("keydown",e=>{if(e.key==="Enter")$("check").click();});
chooseTask();
