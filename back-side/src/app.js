import createError from 'http-errors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import express from 'express';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('health checking')
})

app.use(function(req, res, next){
  next(createError(404));
})

app.use(function(err, req, res, next){
  let apiError = err;
  if(!err.status){
    apiError = createError(err);
  }

  res.locals.message = apiError.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? apiError : {};

  return res.status(apiError.status).json({ message: apiError.message });
})


export default app;
