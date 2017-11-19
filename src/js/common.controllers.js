app.controller('MainController', function ($scope, $location, AuthenticationService) {
    $scope.unlogin = function(){
        AuthenticationService.ClearCredentials();
        $location.path('/login');
    }
});

app.controller('LoginController', function ($scope, $rootScope, $location, AuthenticationService) {
    $scope.username = "";
    $scope.password = "";
    $rootScope.viewMenu = false;
    
    (function initController() {
        // reset login status
        AuthenticationService.ClearCredentials();
    })();

    $scope.login = function() {
        $scope.dataLoading = true;
        
        AuthenticationService.Login($scope.username, $scope.password, function (response) {
            if (response.success) {
                AuthenticationService.SetCredentials($scope.username, $scope.password);
                $location.path('/dashboard');
                $scope.viewMenu = true;
            } else {
                alert(response.message);
                $scope.dataLoading = false;
            }
        });
    };
});

app.controller('DashboardController', function ($scope, $rootScope) {
    $rootScope.viewMenu = true;
});

app.controller('ProductsController', function ($scope, $rootScope) {
    $rootScope.viewMenu = true;
});













