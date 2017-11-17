var app = angular.module('app', ['ngRoute']);

app.controller('mainController', function ($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
});

app.controller('InicialController', function ($scope) {
    console.log('Entrou no controller inicial');
});

app.controller('DashboardController', function ($scope) {
    console.log('Entrou no controller dashboard');
});

app.controller('ProductsController', function ($scope) {
    console.log('Entrou no controller products');
});

//app.config(function ($routeProvider, $locationProvider) {
app.config(function ($routeProvider) {
    
    $routeProvider.when('/login', {
        templateUrl: 'pages/login.html',
        controller: 'LoginController'
    }).when('/dashboard', {
        templateUrl: 'pages/dashboard.html',
        controller: 'DashboardController'
    }).when('/products', {
        templateUrl: 'pages/products.html',
        controller: 'ProductsController'
    }).otherwise({
        redirectTo: '/dashboard'
    });

    //$locationProvider.html5Mode(true);
});
