# weds360-gallery

Gallery implementation of weds360.com in React.

## Dependencies Summary

This project depends on:

- React
- React Toolkit
- React DOM Router
- Redux
- Redux Saga
- Styled Components
- Axios
- JSON Server
- Font Awesome

## Features

- Routing
- Responsive Gallery
- Scroll to top
- Categories page
- App Loader/Loading Screen
- Breadcrumbs
- Pagination
- Search/Filters
- Error handling
- Caching
- No CSS. Elements individually styled using styled-components

## Scraping gallery data

There is another tool to accompany this app: [weds360-gallery-scaper](https://github.com/claude-abounegm/weds360-gallery-scraper). It scrapes the live website and generates a `db.json` and downloads all images locally. It can be used directly in this project.

## Starting the project

This project depends on json-server for its API calls, so both of these commands below need to be running for the app to function correctly.

```bash
# run react dev server
npm start

# run json-server
npm run json-server
```
