//Init
var app = angular.module('app', ['ngRoute', 'ngCookies']).config(config).run(run);

//Config
config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
    $routeProvider

        .when('/', {
            controller: 'HomeController',
            templateUrl: 'pages/home.html'
        })
    
        .when('/sobre', {
            templateUrl: 'pages/sobre.html',
            controller: 'SobreController'
        })

        .when('/login', {
            templateUrl: 'pages/login.html',
            controller: 'LoginController'
        })

        .when('/home', {
            controller: 'HomeController',
            templateUrl: 'pages/home.html'
        })

        .when('/produtos', {
            controller: 'ProdutosController',
            templateUrl: 'pages/produtos.html'
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
        var restrictedPage = ($location.path() == '/' || $location.path() == '/home' || $location.path() == '/produtos') ? true: false;
        var loggedIn = $rootScope.globals.currentUser;
        
        if (restrictedPage && !loggedIn) $location.path('/login');
    });   
}
