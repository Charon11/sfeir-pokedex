// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  limitPokemon: 721,
  requestLimit: 30,
  firebase: {
    apiKey: "AIzaSyB0_3hx0T8gIo7t4RVPC-2yLXO3FoqKQb4",
    authDomain: "raif-pokedex.firebaseapp.com",
    projectId: "raif-pokedex",
    storageBucket: "raif-pokedex.appspot.com",
    messagingSenderId: "907687156541",
    appId: "1:907687156541:web:9d1a6e32a9db3090954354",
    vapidKey: 'Rmm1oh0xlcmx2COyl-5kQ9eBishFuOiUOvachkvDw3Q'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
