import app from './app/index'
import { PORT } from './constants'

app.listen(PORT, () => {
  console.log(`running ${PORT} port`);
})
