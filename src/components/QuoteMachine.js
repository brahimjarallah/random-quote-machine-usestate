import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"

import React from "react"
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  IconButton,
} from "@material-ui/core"

const QuoteMachine = ({ selectedQuote, assignNewQuoteIndex }) => {
  return (
    <Card>
      <CardContent>
        {selectedQuote ? (
          <Typography>
            {selectedQuote.quote} - {selectedQuote.author}
          </Typography>
        ) : null}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={assignNewQuoteIndex}>
          Next Quote
        </Button>
        <IconButton
          href={encodeURI(
            `https://twitter.com/intent/tweet?text=${selectedQuote.quote}&hashtags=${selectedQuote.author}`
          )}
          target="_blank"
        >
          <FontAwesomeIcon icon={faTwitter} size="md"></FontAwesomeIcon>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default QuoteMachine
