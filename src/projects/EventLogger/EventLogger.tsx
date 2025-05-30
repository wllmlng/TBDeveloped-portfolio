import React, {useEffect} from 'react';

/*
    https://frontendlead.com/coding-questions/event-logger-ii

 */
class EventLogger {
    // initializeStartTime: function() {
    // setFetchResponseDelay: function(timeout = 0) {
    // resetFetchResponseDelay: function() {    
    // sendRequest: function(body) {
    constructor(){
        this.batch = [];
        this.sendTimeInMs = 8000
        this.currTime = null;
    }

    logEvent(color, time, event){
        const data = {color, time, event}
        this.batch.push(data);
        
        let interval
        if(!this.currTime){
            interval = setInterval(()=>{
                this.currTime += 1000;
                console.log('thisscurttITme', this.currTime)
                if(this.currTime >= this.sendTimeInMs){
                    this.sendEvent()
                    clearInterval()
                }
            },1000)
        }

    }

    sendEvent(){
        console.log('SENDING ENVETS', this.batch)
        this.batch = []
        this.currTime = null
    }

    
}

const NestedCheckboxes = () => {
    
    useEffect(() => {
        const eventLogger = new EventLogger();
        console.log('event',  eventLogger)
        const buttons = document.querySelectorAll("button");
        buttons.forEach((btn) => {
            btn.addEventListener(("click"), (e) => {
                const color = e.target.style.background;
                const time = new Date()
                const event = "click"
                console.log('e', e.target.style.background, time.toISOString())

                eventLogger.logEvent(color, time.toISOString(), event)
            })
        })
        console.log('buttons', buttons)
    },[])



    return (
        <div style={{display: "flex", flexDirection: "column", gap: 10}}>
            <button className="button" style={{color: "black", background: "yellow"}}>yellow</button>
            <button className="button" style={{color: "black", background: "pink"}}>pink</button>
            <button className="button" style={{color: "black", background: "orange"}}>orange</button>
        </div>
    )
}
export default NestedCheckboxes;

// class EventLogger {
//     constructor(batchSize = 5, sendIntervalMs = 2000) {
//       this.queue = [];
//       this.batchSize = batchSize;
//       this.sendIntervalMs = sendIntervalMs;
//       this.timer = null;
//     }
//     logEvent(eventName, payload) {
//       const event = {
//         eventName,
//         payload,
//         timestamp: new Date().toISOString(),
//       };
//       this.queue.push(event);
//       if (this.queue.length >= this.batchSize) {
//         this.flush();
//       } else {
//         this.scheduleFlush();
//       }
//     }
//     scheduleFlush() {
//       if (!this.timer) {
//         this.timer = setTimeout(() => this.flush(), this.sendIntervalMs);
//       }
//     }
//     flush() {
//       if (this.queue.length === 0) return;
//       console.log('[Sending Event Batch]', this.queue);
//       // Simulate sending data to server here (e.g., fetch('/log', ...))
//       this.queue = [];
//       clearTimeout(this.timer);
//       this.timer = null;
//     }
//   }
  