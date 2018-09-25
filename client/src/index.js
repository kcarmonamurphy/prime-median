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
      .then(res => this.parseResponse(res))
      .catch(err => alert(err));
  }

  parseResponse(response) {
    //clear the state
    this.setState({ value: '', response: '', error: ''});

    if (response.hasOwnProperty('result')) {
      this.setState({ response: response.result })
    } else if (response.hasOwnProperty('error')) {
      this.setState({ error: response.error })
    } else {
      throw "unkown error";
    }
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
          <input type="number" value={this.state.value} onChange={this.handleChange} placeholder="enter a positive integer"/>
          <Button value={this.state.value} />
        </form>
        <Result response={this.state.response} />
        <Error error={this.state.error} />
      </main>
    );
  }
}

function Button(props) {
  const value = props.value;
  if (value) {
    return <button>Calculate</button>
  }
  return <button disabled={true}>Calculate</button>
}

function Result(props) {
  const result = props.response;
  if (result) {
    return (
      <div className="result">
        <p>Result: {result}</p>
      </div>
    )
  }
  return null;
}

function Error(props) {
  const error = props.error;
  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
      </div>
    )
  }
  return null;
}

const header = <h1>Median Prime(s) Finder</h1>;

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
