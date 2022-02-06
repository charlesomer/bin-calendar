# Bin Calendar Subscription

Use this service to generate a Southampton Bin Calendar subscription URL, this
enables automatic updating which you do not get via the councils website
which simply downloads an iCal file. It used to be possible to format a URL
which returned the correct calendar data from the council website itself
but this appears to have been removed.

## NGINX server.
Add secret for environment variable `DATA_UFPRT`. This can be found as a hidden
field on the councils website when viewing a calendar
https://www.southampton.gov.uk/whereilive/waste-calendar, or in the network
request when "Download" is clicked. This changes for each address and on each
refresh so I'm not 100% sure if it's a "secret" value or not. It is required
as a post parameter (form-data) to force the website to serve the calendar data
instead of the webpage since they use the same address.

- Development: `docker run --rm -it -v ${PWD}/server.js:/app/server.js -v ${PWD}/index.html:/app/index.html  -v ${PWD}/.env.dev:/app/.env.dev -p 8080:8080 $(docker build -q . -f ./Dockerfile.dev)`