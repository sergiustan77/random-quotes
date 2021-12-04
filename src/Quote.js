import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

class Quote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quotes: [],
      index: 0,
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    )
      .then((result) => result.json())
      .then((result) => {
        this.setState(
          {
            quotes: result.quotes,
            isLoaded: true,
          },
          this.getRandomQuote
        );
      });
  }

  setRandomColor() {
    const colors = [
      "#54478c",
      "#2c699a",
      "#048ba8",
      "#0db39e",
      "#16db93",
      "#83e377",
      "#b9e769",
      "#efea5a",
      "#f1c453",
      "#f29e4c",
    ];

    const color = colors[Math.floor(Math.random() * colors.length)];

    document.body.style.background = color;
    document.body.style.color = color;
    document.querySelector("button").style.background = color;
    document.querySelector("a").style.background = color;
  }
  getRandomQuote = () => {
    const { quotes } = this.state;

    if (quotes.length > 0) {
      this.setState({
        index: Math.floor(Math.random() * quotes.length),
      });
    }

    this.setRandomColor();
  };

  render() {
    const { quotes, index, isLoaded } = this.state;
    const quote = quotes[index];

    if (!isLoaded) {
      return <div className="container"> Loading... </div>;
    } else {
      const twitterURL = `https://twitter.com/intent/tweet?text=${quote.quote}-${quote.author}`;
      return (
        <div
          id="app"
          className="container d-flex justify-content-center align-items-center vh-100"
        >
          <div
            id="quote-box"
            className="col-6 container bg-light p-4 rounded-3 "
          >
            <div id="quote" className="container p-4 ">
              <div id="text" className=" bg-light p-2 fs-2">
                <FaQuoteLeft className="fs-1" />
                <p>{quote.quote}</p>
              </div>
              <div
                id="author"
                className="container d-flex justify-content-end fs-5"
              >
                <cite>-{quote.author}</cite>
              </div>

              <div
                id="actions"
                className="box d-flex justify-content-between pt-4"
              >
                <div id="twitter">
                  <a
                    id="tweet-quote"
                    href={twitterURL}
                    target="_blank"
                    rel="noreferrer"
                    className="btn  fs-5 "
                  >
                    <FaTwitter className="text-white text-center" />
                  </a>
                </div>

                <div id="button">
                  <button
                    id="new-quote"
                    className="btn text-white fs-5"
                    onClick={this.getRandomQuote}
                  >
                    New Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Quote;
