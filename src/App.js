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
      <div>
        <GreetingLabel greeting={this.state.greeting}></GreetingLabel>
        <form>
          <label></label>
          <input type="text" value={this.state.newGreeting} onChange={this.updateGreetingForm}></input>
        </form>
        <UpdateGreetingButton onClick={()=>this.updateGreeting()}></UpdateGreetingButton>
      </div>
    )
  }
}

// here I deleted most of the stuff from the original page
function App() {
  return (
    <div className="App">
      <header className="App-header">    
        <GreetingForm></GreetingForm>
      </header>
    </div>
  );
}

export default App;
