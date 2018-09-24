import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      response: '',
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    this.callApi(this.state.value)
      .then(res => this.setState({ response: res.result }))
      .catch(err => this.setState({ error: err.error }));
  }

  callApi = async (value) => {
    const response = await fetch(`/api/${value}`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <main>
        {header}
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="enter a positive integer"/>
          <Button text="Go"/>
        </form>
        <div>Result: {this.state.response}</div>
        <div>Error: {this.state.error}</div>
      </main>
    );
  }
}

function Button(props) {
  return <button>{props.text}</button>
}

// class Button extends React.Component {
//   render(props) {
//     return (
//       <button>{props.text}</button>
//     );
//   }
// }

const header = <h1>Median Prime(s) Finder</h1>;

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
