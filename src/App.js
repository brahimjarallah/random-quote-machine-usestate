import { random } from "lodash"
import React, { Component } from "react"
import QuoteMachine from "./components/QuoteMachine"
import "typeface-roboto"
import { Grid, withStyles } from "@material-ui/core"

const styles = {
  container: {
    alignItems: "center",
    display: "flex",
    height: "100vh",
  },
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quotes: [
        {
          quote: "note quote yet",
          author: "no  author yet",
        },
      ],
      selectedQuoteIndex: null,
      selectedColor: [
        "#16a085",
        "#27ae60",
        "#2c3e50",
        "#f39c12",
        "#e74c3c",
        "#9b59b6",
        "#FB6964",
        "#342224",
        "#472E32",
        "#BDBB99",
        "#77B1A9",
        "#73A857",
      ],
    }
    this.assignNewQuoteIndex = this.assignNewQuoteIndex.bind(this)
    this.selectQuoteIndex = this.selectQuoteIndex.bind(this)
  }

  componentDidMount() {
    fetch(
      "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json"
    )
      .then((quotes) => quotes.json())
      .then((quotes) => {
        this.setState({ quotes }, this.assignNewQuoteIndex)
      })
  }

  selectQuoteIndex() {
    if (!this.state.quotes.length) {
      return
    }
    return random(0, this.state.quotes.length - 1)
  }

  get selectedQuote() {
    if (
      !this.state.quotes.length ||
      !Number.isInteger(this.state.selectedQuoteIndex)
    ) {
      return undefined
    }
    return this.state.quotes[this.state.selectedQuoteIndex]
  }
  assignNewQuoteIndex() {
    this.setState({ selectedQuoteIndex: this.selectQuoteIndex() })
  }
  render() {
    return (
      <Grid
        className={this.props.classes.container}
        id="quote-box"
        justify="center"
        container
      >
        <Grid xs='11' lg='8' item>
          {this.selectedQuote ? <QuoteMachine
            selectedQuote={this.selectedQuote}
            assignNewQuoteIndex={this.assignNewQuoteIndex}
          /> : null}
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(App)
