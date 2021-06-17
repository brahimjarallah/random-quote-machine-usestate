import { random } from "lodash"
import React, { useEffect, useState } from "react"
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

function App({ classes }) {
  const [quotes, setQuotes] = useState([])
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(null)

  useEffect(async () => {
    const data = await fetch(
      "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json"
    )
    const quotes = await data.json()
    setQuotes(quotes)
    setSelectedQuoteIndex(random(0, quotes.length - 1))
  }, [])

  function getSelectedQuote() {
    if (!quotes.length || !Number.isInteger(selectedQuoteIndex)) {
      return undefined
    }
    return quotes[selectedQuoteIndex]
  }

  function generateNewQuoteIndex() {
    if (!quotes.length) {
      return
    }
    return random(0, quotes.length - 1)
  }

  function assignNewQuoteIndex() {
    setSelectedQuoteIndex(generateNewQuoteIndex())
  }
  // const {indexColor} = this.state
  const colors = [
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
  ]
  const indexColor = random(0, colors.length - 1)
  return (
    <Grid
      style={{ backgroundColor: colors[indexColor] }}
      className={classes.container}
      id="quote-box"
      justify="center"
      container
    >
      <Grid xs="11" lg="8" item>
        {getSelectedQuote() ? (
          <QuoteMachine
            selectedQuote={getSelectedQuote()}
            assignNewQuoteIndex={assignNewQuoteIndex}
          />
        ) : null}
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(App)
