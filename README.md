# taevas.xyz

My personal website!

## Build and develop

```bash
bun i
bun dev
```

## Ports

This website is configured to run on port `8000` when in development mode, while it will otherwise run on `80` (AND `443` if a certificate and the such can be found) in production mode.

## Environment variables

This website uses `SSL_CERT` and `SSL_KEY` (no dotenv support) to determine the path of the required files to establish secured connections through HTTPS, and alternatively looks for files called `cert.pem` and `key.pem` if those environment variables do not exist. If both files are found, they will be used for all the ports that this website uses except for port `80`, and in the event that they are not found, they will simply not be used and, in production mode, no server on port `443` will be run.

This website uses [`@carbon/icons-react`](https://github.com/carbon-design-system/carbon/tree/main/packages/icons-react), which **installs [a telemetry package which can be disabled](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection):**

Set the environment variable IBM_TELEMETRY_DISABLED to true


This website makes use of several online APIs in order to deliver the `Infos` that are available on the right side of the main page. Accessing most of these APIs requires a key (or similar), which can be set through the following environment variables (with dotenv support for development):

- `URL_POSTGRESQL`
- `API_GITHUB`
- `API_GITLAB`
- `API_KITSUCLUB`
- `API_LASTFM`
- `API_OSU`
- `API_WANIKANI`
- `USERNAME_UMAMI`
- `PASSWORD_UMAMI`
