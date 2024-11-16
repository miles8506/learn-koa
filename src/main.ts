import app from './app/index'
import { PORT } from './constants'
import './utils/handleErrors'

app.listen(PORT, () => {
  console.log(`running ${PORT} port`)
})
