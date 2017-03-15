"use strict";

/**
 * @ngdoc overview
 * @name angularjsApp
 * @description
 * # angularjsApp
 *
 * Main module of the application.
 */
var app = angular.module('appjs', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
]);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'html/home.html',
            controller: 'mainController',
            controllerAs: 'main'
        })
        .when('/about', {
            templateUrl: 'html/about.html',
            controller: 'aboutController',
            controllerAs: 'about'
        })
        .otherwise({
            redirectTo: '/'
        });
});