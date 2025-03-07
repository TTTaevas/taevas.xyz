# taevas.xyz

My personal website!

## Build and develop

```bash
bun i
bun dev
```

## Environment variables

This website uses [`@carbon/icons-react`](https://github.com/carbon-design-system/carbon/tree/main/packages/icons-react), which **installs [a telemetry package which can be disabled](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection):**

Set the environment variable IBM_TELEMETRY_DISABLED to true


This website makes use of several online APIs in order to deliver the `Infos` that are available on the right side of the main page, accessing most of these APIs requires a key (or similar), which can be set through the following environment variables:

- `API_GITHUB`
- `API_GITLAB`
- `API_KITSUCLUB`
- `API_LASTFM`
- `API_OSU`
- `API_WANIKANI`
- `USERNAME_UMAMI`
- `PASSWORD_UMAMI`
- `URL_MONGODB`
