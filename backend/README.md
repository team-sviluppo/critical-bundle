# Critical-Bundle Backend

Backend to extracts & inlines critical-path (above-the-fold) CSS from HTML by [Critical Package](https://github.com/addyosmani/critical)

You can first install [NVS (Node Version Switcher)](https://github.com/jasongin/nvs) and run this command `nvs auto`.

## Available Scripts

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## API

```bash

curl --location 'http://localhost:3000/generate' \
--header 'Content-Type: application/json' \
--data '{
    "host": "https://www.hextra.it",
    "urls": ["/"],
    "screen": [
        {"width": 320, "height": 640},
        {"width": 320, "height": 750},
        {"width": 767, "height": 640},
        {"width": 767, "height": 850},
        {"width": 991, "height": 640},
        {"width": 1199, "height": 900},
        {"width": 1199, "height": 1200},
        {"width": 1920, "height": 1080},
        {"width": 1920, "height": 1440},
        {"width": 2560, "height": 2300}
    ]
}'

```

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).
