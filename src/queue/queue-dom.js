const queueUL = document.querySelector('.list-queue');
const queueInput = document.querySelector('.queue-input');
const warningTopQueue = document.querySelector('#queue-container .warning-top');
const warningBottomQueue = document.querySelector(
  '#queue-container .warning-bottom'
);
const addQueue = document.querySelector('.btn-add-queue');
const dequeue = document.querySelector('.btn-take-dequeue');

const queue = new Queue();

const clearQueueInput = () => {
  queueInput.value = ""
};

const generateListQueue = () => {
  queueUL.innerHTML = "";
  warningBottomQueue.style.display = "none";
  warningTopQueue.style.display = "none";

  queue.display().forEach(queueItem => {
    let li = document.createElement("li")

    li.classList.add("active")
    li.innerHTML = queueItem

    queueUL.appendChild(li)
  })

  for (let i = queue.display().length; i <= queue.MAX_SIZE; i++) {
    let li = document.createElement("li")

    li.classList.add("inactive")
    li.innerHTML = '&nbsp;'

    queueUL.appendChild(li)
  }
};

const generateWarningQueue = (type) => {
  if (type === 'underflow') {
    warningBottomQueue.style.display = "block"
  } else if (type === 'overflow') {
    warningTopQueue.style.display = "block"
  }
};

const addToQueue = () => {
  try {
    queue.enqueue(queueInput.value)
    clearQueueInput()
    generateListQueue()
  } catch (error) {
    generateWarningQueue("overflow")
  }
};

const removeFromQueue = () => {
  try {
    let element = queue.dequeue()
    generateListQueue()
  } catch (error) {
    generateWarningQueue("underflow")
  }
};

// init

warningBottomQueue.innerHTML = "underflow"
warningTopQueue.innerHTML = "overflow"
generateListQueue();
addQueue.addEventListener('click', addToQueue);
dequeue.addEventListener('click', removeFromQueue);
