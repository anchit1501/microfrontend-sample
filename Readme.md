# Pokemon Microfrontend Project

This repository contains two projects: `pokemons-home` (host app) and `pokemons-list` (microfrontend). These applications are designed to work together using Docker Compose for seamless integration.

## Prerequisites

Ensure you have the following installed on your machine:

- Docker
- Docker Compose
- Yarn

## Project Structure

```bash
repo/
├── pokemons-home/   # Main application
├── pokemons-list/   # Microfrontend
└── docker-compose.yml
```

## How to Run

### Step 1: Run the Applications Manually

#### Install Dependencies for `pokemons-list`

Open a terminal, navigate to the `pokemons-list` directory, and run:

```bash
yarn
```

This will install all dependencies for the `pokemons-list` project.

#### Build and Serve `pokemons-list`

If you are using a Vite project:

```bash
yarn build && yarn preview
```

After running this command, the microfrontend (`pokemons-list`) will be available and generate the `remoteEntry.js` file.

#### Install Dependencies for `pokemons-home`

Open a second terminal, navigate to the `pokemons-home` directory, and run:

```bash
yarn
```

#### Start `pokemons-home`

Run the following command in the `pokemons-home` directory:

```bash
yarn build && yarn preview
```

This will start the host application and integrate with the `pokemons-list` microfrontend. You can now interact with the host app and its microfrontend.

### Step 2: Run with Docker Compose

To run both applications using Docker Compose:

#### Build and Start the Containers

From the root directory (where `docker-compose.yml` is located), run:

```bash
docker-compose up --build
```

This command will:

- Build the `pokemons-home` and `pokemons-list` containers.
- Start both services and expose them on the following ports:
    - `pokemons-home`: [http://localhost:4173](http://localhost:4173)
    - `pokemons-list`: [http://localhost:5173](http://localhost:5173)

#### Access the Applications

Open [http://localhost:4173](http://localhost:4173) in your browser to view the host app (`pokemons-home`). The microfrontend (`pokemons-list`) will be served dynamically by the host app.

## Key Notes

- **Microfrontend Integration**: The `pokemons-home` app consumes the `pokemons-list` microfrontend using Module Federation or a similar mechanism. Ensure the `remoteEntry.js` file is correctly configured.
- **State Interaction**: The host app can interact with the state of the microfrontend, enabling seamless integration of components.
