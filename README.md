# GermesApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name

ng generate service service-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project for production run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

You should to create three .ts files in directory `src/environments/`:
    - environment.ts (base environment for using variables),
    - environment.prod.ts (server address for production),
    - environment.dev.ts (localhost address for development).

## Deploying on firebase

First step - build a project:

```bash
ng build
```

Second step - deploy: 

```bash
firebase deploy
```
