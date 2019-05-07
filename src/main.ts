import app from './app';

/**
 * Start Express main.
 */
const main = app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d', app.get('port'));
});

export default main;
