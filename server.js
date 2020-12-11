require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

const port = process.env.PORT || 3001;

const app = express();

Sentry.init({
  dsn: 'https://21c4f81678034a9b8dac570f302417f8@o487368.ingest.sentry.io/5546054',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MySQL DB
const { connect } = require('./lib/db/conn');
connect();

console.log('on env: ', process.env.NODE_ENV);

// Create API Routes
const { createUserRoutes, createPostRoutes } = require('./lib/routes');
createUserRoutes(app);
createPostRoutes(app);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname));
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

// For testing local functionality, ping and Sentry test route
if (process.env.NODE_ENV !== 'production') {
  app.get('/ping', (req, res) => res.send('pong'));
  app.get('/debug-sentry', function mainHandler(req, res) {
    throw new Error('My first Sentry error!');
  });
}

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + '\n');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
