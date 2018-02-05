"use strict";

// authentification FOURSQUARE
const AUTH = { client_id: "0DS2REH2LNQE4CTLT1OOFYETAK0WYU3X1VXFN0HKTDCPYFNF", client_secret: "UH4ZDZLRH0HZ4FRMLSDH0H0TH1TBKE32SIDJT3BBTEAJLLX0" }

angular.module("dolisttest", [
    // les dépendances externes
    'ui.router', 'ngResource'
])
.config(function($stateProvider, $urlRouterProvider) {
    let states = [{
        name: "home",
        url: "/",
        component: "home",
    }]

    $urlRouterProvider.otherwise("/");
    states.forEach(function(state) {
        $stateProvider.state(state);
    })
})