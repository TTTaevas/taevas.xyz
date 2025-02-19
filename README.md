[![Netlify Status](https://api.netlify.com/api/v1/badges/10889a9b-c148-488d-aecd-9a44e0cf6f46/deploy-status)](https://taevas.xyz)

# taevas.xyz

My personal website!

## Build and develop

```bash
bun install --global netlify-cli
bun i --ignore-scripts
netlify dev
```

## Environment variables

This package uses [`@carbon/icons-react`](https://github.com/carbon-design-system/carbon/tree/main/packages/icons-react), which **installs [a telemetry package which can be disabled](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection):**

```bash
netlify env:set IBM_TELEMETRY_DISABLED true
```

This package makes use of several online APIs through Netlify in order to deliver the `Infos` that are available on the right side of the website, accessing most of these APIs requires a key (or similar), which can be set through the following environment variables:

- `API_GITHUB`
- `API_GITLAB`
- `API_KITSUCLUB`
- `API_LASTFM`
- `API_OSU`
- `API_WANIKANI`
- `API_UMAMI`
- `URL_MONGODB`
