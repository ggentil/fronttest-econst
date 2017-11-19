//Init
var app = angular.module('app', ['ngRoute', 'ngCookies']).config(config).run(run);

//Config
config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
    $routeProvider

        .when('/', {
            controller: 'DashboardController',
            templateUrl: 'pages/dashboard.html'
        })

        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'LoginController'
        })

        .when('/dashboard', {
            controller: 'DashboardController',
            templateUrl: 'pages/dashboard.html'
        })

        .when('/products', {                
            controller: 'ProductsController',
            templateUrl: 'pages/products.html'
        })

        .otherwise({ redirectTo: '/login' });
}

//Run config
run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
function run($rootScope, $location, $cookieStore, $http) {
    //Keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser)
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;

    //Redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var restrictedPage = ($location.path() == '/' || $location.path() == '/dashboard' || $location.path() == '/products') ? true: false;
        var loggedIn = $rootScope.globals.currentUser;
        
        if (restrictedPage && !loggedIn) $location.path('/login');
    });   
}
