# L&D Training Request Portal

A lightweight browser-based portal for managing learning and development training requests. The application provides separate experiences for employees and managers, with JSON-backed sample data for quick local testing and demo purposes.

Live deployment: https://ld-training.vercel.app

## Overview

The portal includes three main views:

- `index.html` - login page
- `user.html` - employee portal
- `admin.html` - manager portal

Authentication and demo data are loaded from local JSON files in `assets/data/`, so the app can run without a backend service.

## Features

- Role-based login for users and managers
- Employee dashboard for submitting and tracking training requests
- Manager dashboard for reviewing requests
- Sample login credentials displayed on the login page
- Local JSON data loading for simple setup and testing

## Project Structure

```text
.
|- index.html
|- user.html
|- admin.html
|- assets/
   |- css/
   |- data/
   |- js/
   |- logo/
```

## Getting Started

### Prerequisites

- A modern web browser
- A local web server is recommended for loading JSON files through `fetch()`

### Run Locally

Because the app loads JSON data with `fetch()`, open it through a local server rather than directly via `file://`.

Examples:

- VS Code Live Server
- Python HTTP server
- Node-based static server

Example using Python:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Sample Login Credentials

These sample credentials are loaded from `assets/data/users.json` and shown on the login page.

### Users

| Username | Password |
| --- | --- |
| `sriram.relangi` | `sriram123` |
| `nithin.dasam` | `nithin123` |
| `dheeraj.perugu` | `dheeraj123` |
| `hemanth.vundavalli` | `hemanth123` |

### Managers

| Username | Password |
| --- | --- |
| `rajhans.kumar` | `rajhans123` |
| `senthil.murugan` | `senthil123` |

## Data Files

- `assets/data/users.json` - user and manager login records
- `assets/data/trainers.json` - trainer data used by the portal

## Notes

- Authentication is demo-oriented and relies on local JSON data.
- For production use, replace local credential storage with a secure backend authentication flow.
- The app is styled as a static front-end project and can be hosted on any static web server.

## Browser Support

The portal is intended for modern desktop and mobile browsers that support:

- HTML5
- CSS3
- JavaScript modules and `fetch()`
