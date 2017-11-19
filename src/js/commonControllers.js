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
        $rootScope.dataLoading = true;
        
        AuthenticationService.Login($scope.username, $scope.password, function (response) {
            if (response.success) {
                AuthenticationService.SetCredentials($scope.username, $scope.password);
                $rootScope.dataLoading = false;
                $location.path('/home');
            } else {
                alert(response.message);
                $rootScope.dataLoading = false;
            }
        });
    };
});

app.controller('HomeController', function ($scope, $rootScope) {
    $rootScope.viewMenu = true;
});

app.controller('SobreController', function ($scope, $rootScope) {
    $rootScope.viewMenu = true;
});

app.controller('ProdutosController', function ($scope, $rootScope) {
    //Massa de dados
    var products = [
      {
        "productName": "Beard",
        "brandName": "AUTOMON",
        "price": "$1,445.65",
        "sku": "5a11b7d90a14b13c24f673f1"
      },
      {
        "productName": "Church",
        "brandName": "RODEOLOGY",
        "price": "$2,119.35",
        "sku": "5a11b7d92c5d5864ab576979"
      },
      {
        "productName": "Burns",
        "brandName": "SUREMAX",
        "price": "$1,910.82",
        "sku": "5a11b7d9eea37de704a6fb86"
      },
      {
        "productName": "Chambers",
        "brandName": "TOYLETRY",
        "price": "$3,523.22",
        "sku": "5a11b7d92f21c43e143fcf32"
      },
      {
        "productName": "Nixon",
        "brandName": "NIXELT",
        "price": "$3,600.41",
        "sku": "5a11b7d9360d8f7a50568ac5"
      },
      {
        "productName": "Harding",
        "brandName": "EARTHWAX",
        "price": "$3,220.29",
        "sku": "5a11b7d9cd206c7b08daf290"
      },
      {
        "productName": "Jordan",
        "brandName": "EXOPLODE",
        "price": "$2,480.09",
        "sku": "5a11b7d94433ddaa49bac2b0"
      },
      {
        "productName": "Simmons",
        "brandName": "MAGNEMO",
        "price": "$3,115.91",
        "sku": "5a11b7d9f825e6e9d327ef56"
      },
      {
        "productName": "Sullivan",
        "brandName": "MULTIFLEX",
        "price": "$2,241.11",
        "sku": "5a11b7d90f2e161f4e7a89f7"
      },
      {
        "productName": "Roy",
        "brandName": "COMSTRUCT",
        "price": "$2,507.96",
        "sku": "5a11b7d9c2c3b500b7cd66b9"
      },
      {
        "productName": "Hayden",
        "brandName": "STREZZO",
        "price": "$2,622.80",
        "sku": "5a11b7d9ced46f4a9b2afe30"
      },
      {
        "productName": "Leon",
        "brandName": "SLOFAST",
        "price": "$1,954.15",
        "sku": "5a11b7d9cc2b021e31c44079"
      },
      {
        "productName": "Beasley",
        "brandName": "MARKETOID",
        "price": "$2,495.66",
        "sku": "5a11b7d92d976500ef89cbd7"
      },
      {
        "productName": "Gomez",
        "brandName": "CODACT",
        "price": "$3,301.02",
        "sku": "5a11b7d93358bb6185fdf123"
      },
      {
        "productName": "Hampton",
        "brandName": "EURON",
        "price": "$2,348.39",
        "sku": "5a11b7d96b35971c1aa5f16c"
      },
      {
        "productName": "Acosta",
        "brandName": "MOLTONIC",
        "price": "$1,709.82",
        "sku": "5a11b7d99e84a33d5063dfb7"
      },
      {
        "productName": "Dominguez",
        "brandName": "SENMAO",
        "price": "$2,123.60",
        "sku": "5a11b7d9208c2e93b4c8132b"
      },
      {
        "productName": "Wilcox",
        "brandName": "VISUALIX",
        "price": "$3,747.01",
        "sku": "5a11b7d909020b3fa2b66515"
      },
      {
        "productName": "Bauer",
        "brandName": "NEWCUBE",
        "price": "$2,269.98",
        "sku": "5a11b7d9fcc454b9521067bb"
      },
      {
        "productName": "Schultz",
        "brandName": "CINESANCT",
        "price": "$2,919.01",
        "sku": "5a11b7d9a3b424ed2fdb52d2"
      },
      {
        "productName": "Michael",
        "brandName": "GORGANIC",
        "price": "$1,659.65",
        "sku": "5a11b7d90199006f9250d503"
      },
      {
        "productName": "Little",
        "brandName": "LYRICHORD",
        "price": "$1,174.98",
        "sku": "5a11b7d9d2334d59660f2ad0"
      },
      {
        "productName": "Butler",
        "brandName": "ZANYMAX",
        "price": "$2,872.96",
        "sku": "5a11b7d966415dfe0baf6ef9"
      },
      {
        "productName": "Morton",
        "brandName": "ZENSURE",
        "price": "$3,200.65",
        "sku": "5a11b7d98779f08ce1468f9d"
      },
      {
        "productName": "Mcmahon",
        "brandName": "ARTIQ",
        "price": "$3,047.83",
        "sku": "5a11b7d998d403ff7d70ff8b"
      },
      {
        "productName": "Snow",
        "brandName": "HELIXO",
        "price": "$2,545.79",
        "sku": "5a11b7d9a00790e8eba9cc98"
      },
      {
        "productName": "Mcgowan",
        "brandName": "GEOSTELE",
        "price": "$1,462.84",
        "sku": "5a11b7d93d51c3af0762ec5f"
      },
      {
        "productName": "Hunt",
        "brandName": "ACCIDENCY",
        "price": "$1,385.25",
        "sku": "5a11b7d950cf53c5d4548776"
      },
      {
        "productName": "Maynard",
        "brandName": "VALREDA",
        "price": "$1,580.33",
        "sku": "5a11b7d94f8d6fa7670c5100"
      },
      {
        "productName": "Hobbs",
        "brandName": "MAZUDA",
        "price": "$2,224.90",
        "sku": "5a11b7d97529ef42df647710"
      },
      {
        "productName": "Dunn",
        "brandName": "BEDDER",
        "price": "$3,408.48",
        "sku": "5a11b7d9de2508b67b7e1b04"
      },
      {
        "productName": "Howell",
        "brandName": "FARMEX",
        "price": "$3,320.13",
        "sku": "5a11b7d99e5644ab8fdcb529"
      },
      {
        "productName": "Mckay",
        "brandName": "MOTOVATE",
        "price": "$2,676.77",
        "sku": "5a11b7d9b6ff6f20ed9c316e"
      },
      {
        "productName": "Salas",
        "brandName": "VERAQ",
        "price": "$2,901.41",
        "sku": "5a11b7d998a1adc4b77fa0d0"
      },
      {
        "productName": "Holmes",
        "brandName": "ACCUPHARM",
        "price": "$2,141.50",
        "sku": "5a11b7d925596cf8f1ee02e9"
      },
      {
        "productName": "Cleveland",
        "brandName": "PIGZART",
        "price": "$1,740.24",
        "sku": "5a11b7d9abf99bd0b6d3db40"
      },
      {
        "productName": "Moore",
        "brandName": "CEMENTION",
        "price": "$1,666.21",
        "sku": "5a11b7d9756dda3142884d31"
      },
      {
        "productName": "Mills",
        "brandName": "DIGIRANG",
        "price": "$2,568.35",
        "sku": "5a11b7d97c2427a7303a1790"
      },
      {
        "productName": "Lynn",
        "brandName": "COGENTRY",
        "price": "$2,972.01",
        "sku": "5a11b7d9d7b899313450fc6b"
      },
      {
        "productName": "Perry",
        "brandName": "GEEKFARM",
        "price": "$3,027.18",
        "sku": "5a11b7d9466aafecba118276"
      },
      {
        "productName": "Humphrey",
        "brandName": "APPLIDECK",
        "price": "$3,807.19",
        "sku": "5a11b7d981196deb3cad0c11"
      },
      {
        "productName": "Richmond",
        "brandName": "XINWARE",
        "price": "$2,150.31",
        "sku": "5a11b7d9f5fbf4610e1150fa"
      },
      {
        "productName": "Norton",
        "brandName": "FROLIX",
        "price": "$3,197.60",
        "sku": "5a11b7d97c3fccdea80a1054"
      },
      {
        "productName": "Chaney",
        "brandName": "PODUNK",
        "price": "$1,729.37",
        "sku": "5a11b7d98552e92db9544a54"
      },
      {
        "productName": "Vance",
        "brandName": "KATAKANA",
        "price": "$2,423.94",
        "sku": "5a11b7d99af79821e6f94d82"
      },
      {
        "productName": "Bass",
        "brandName": "PROGENEX",
        "price": "$2,443.58",
        "sku": "5a11b7d9f3d3a6b83737beb3"
      },
      {
        "productName": "Bryan",
        "brandName": "NORSUL",
        "price": "$3,415.91",
        "sku": "5a11b7d9b81a0b0e9782e771"
      },
      {
        "productName": "Sims",
        "brandName": "FIBEROX",
        "price": "$2,529.34",
        "sku": "5a11b7d995bc6ca031928522"
      },
      {
        "productName": "Pate",
        "brandName": "XIXAN",
        "price": "$3,366.12",
        "sku": "5a11b7d90142a15dd92da7ac"
      },
      {
        "productName": "Oconnor",
        "brandName": "EPLOSION",
        "price": "$2,516.47",
        "sku": "5a11b7d978a4dbf1c72ef65d"
      }
    ];
    //Massa de dados - END
    
    
    $rootScope.viewMenu = true;
    $rootScope.dataLoading = false;
    $scope.searchtip = "";
    
    $scope.searchProduct = function(){
        $scope.searchresult = [];
        var searchtipLen = $scope.searchtip.length;
        
        if($scope.searchtip != "" && $rootScope.dataLoading == false && searchtipLen > 1){
            $rootScope.dataLoading = true;
            var lowSearchTip = $scope.searchtip.toLowerCase();

            for(var i = 0;i < products.length;i++){
                var prodname = products[i].productName.toLowerCase();
                if (prodname.indexOf(lowSearchTip) !== -1)
                    $scope.searchresult.push(products[i]);
            }
            
            //Debounce
            $rootScope.dataLoading = false;
            if(searchtipLen != $scope.searchtip.length) $scope.searchProduct();
        }        
    };    
});













