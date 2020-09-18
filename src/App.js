import React from 'react';
import './App.css';


//basic component practice
class GreetingLabel extends React.Component {
  render() { 
    return (
      <div>
        <h1>{this.props.greeting}</h1>
      </div>
    )
  }
}

// learning how to "lift" events 
class UpdateGreetingButton extends React.Component { 
  render() {
    return (
      <button onClick={()=> this.props.onClick()}>Update Greeting</button>
    )
  }
}

// general component to update form value
// general know-how and react usage patterns from https://reactjs.org/tutorial/tutorial.html 
// and https://reactjs.org/docs (the main concepts portion)
class GreetingForm extends React.Component {

  constructor(props) { 
    super(props)
    this.updateGreeting = this.updateGreeting.bind(this);
    this.updateGreetingForm = this.updateGreetingForm.bind(this);
    this.state = {greeting: 'Hello World!', newGreeting:''}
  }
  updateGreeting() { 
    this.setState({greeting: this.state.newGreeting})
  }

  updateGreetingForm(event) {
    this.setState({newGreeting: event.target.value})
  }

  render() { 
    return (
      <div id="basic-react-demo">
        <h1>Basic React Logic Demo: Updating Components</h1>
        <GreetingLabel greeting={this.state.greeting}></GreetingLabel>
        <form>
          <input type="text" value={this.state.newGreeting} onChange={this.updateGreetingForm}></input>
        </form>
        <UpdateGreetingButton onClick={()=>this.updateGreeting()}></UpdateGreetingButton>
      </div>
    )
  }
}

class BackendConnection extends React.Component {
  constructor(props) { 
    super(props);
    this.updateMessage = this.updateMessage.bind(this);
    this.sendToBackend = this.sendToBackend.bind(this);
    this.getMostRecentGreeting = this.getMostRecentGreeting.bind(this);
    this.state = {message:'Hello World!', most_recent_greeting:'Hello World!'};
    this.getMostRecentGreeting();
  }
  sendToBackend() { 
    //fetch usage info from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    fetch("http://localhost:9000/demo-db-access", 
      {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "Message=" + this.state.message
      }
    )
      .then(response => response.text())
      .then(text => console.log(text));
  }

  updateMessage(event) {
    this.setState({message: event.target.value});
  }

  getMostRecentGreeting() {
    console.log("getting greeting")
    fetch("http://localhost:9000/demo-db-access")
    .then(response => response.text())
    .then(text => this.setState({most_recent_greeting: text}));
  }

  render() { 
    return (
      <div id="backend connection">
        <h1>Database Demo: Storing Greetings</h1>
        <form>
          <input type="text" value={this.state.message} onChange={this.updateMessage}></input>
        </form>
        <button onClick={this.sendToBackend}>Send to backend + MongoDB</button>
        <button onClick={this.getMostRecentGreeting}>Refresh most recent database entry</button>
        <p>Most recent greeting: {this.state.most_recent_greeting}</p>
      </div>
    )
  }
}


// here I deleted most of the stuff from the original page
function App() {
  return (
    <div className="App">    
      <div>
        <GreetingForm></GreetingForm>
      </div>
      <div>
        <BackendConnection></BackendConnection>
      </div>
    </div>
  );
}

export default App;
