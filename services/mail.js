import mailgun from 'mailgun-js';

const mailgunInstance = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

const defaults = {
  from: process.env.MAILGUN_SENDER
};

export default (options) => {
  return mailgunInstance.messages().send(
    Object.assign(defaults, options)
  );
};