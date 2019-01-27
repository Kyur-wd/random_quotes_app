import React, { Component } from "react";

class QuoteBox extends Component {
  constructor() {
    super();
    this.state = {
      quotes: [],
      currentQuote: "",
      hideText: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  // Fetch the quotes.json when mounting first time
  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then(response => response.json())
      .then(data => {
        // Store quotes in state and choose a random one to show initially
        const randomIndex = Math.floor(Math.random() * data.quotes.length);
        const { quote, author } = data.quotes[randomIndex];
        this.setState({
          quotes: data.quotes,
          currentQuote: quote,
          currentAuthor: author
        });
      });
  }

  // Choose a new random quote when button is clicked (fade transition first)
  handleClick() {
    const randomIndex = Math.floor(Math.random() * this.state.quotes.length);
    const { quote, author } = this.state.quotes[randomIndex];
    this.setState({ hideText: true });

    // After 0.4s the old quote will have faded away, so fade in new quote
    setTimeout(() => {
      this.setState({
        currentQuote: quote,
        currentAuthor: author,
        hideText: false
      });
    }, 400);
  }

  render() {
    const tweetParameters = encodeURIComponent(
      this.state.currentQuote + ` (${this.state.currentAuthor})`
    );

    const textOpacity = this.state.hideText ? { opacity: 0 } : { opacity: 1 };

    return (
      <main>
        <div id="quote-box">
          <a
            id="tweet-quote"
            href={
              "https://www.twitter.com/intent/tweet?text=" + tweetParameters
            }
            title="Share this quote on Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="fab fa-twitter" />
          </a>
          <h1 id="text" style={textOpacity}>
            {this.state.currentQuote}
          </h1>
          <h2 id="author" style={textOpacity}>
            {this.state.currentAuthor}
          </h2>
          <button
            id="new-quote"
            onClick={this.handleClick}
            title="Show a new quote"
          >
            New Quote
          </button>
        </div>
      </main>
    );
  }
}

export default QuoteBox;
