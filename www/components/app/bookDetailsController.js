app.controller('bookDetailsController', ['$scope',
    '$state',
    '$http',
    'bookSearchService',
    '$ionicLoading',
    '$ionicScrollDelegate',
    '$stateParams',
    '$cordovaInAppBrowser',
    function($scope, $state, $http, bookSearchService, $ionicLoading, $ionicScrollDelegate, $stateParams, $cordovaInAppBrowser) {

        var bookId = $stateParams.bookId;
        var getBookDetails = function(bookId) {
            $ionicLoading.show();
            bookSearchService.getBookDetails(bookId).then(function(result) {
                $scope.bookDetails = result.data;
                $ionicLoading.hide();
            }).catch(function(error) {
                console.log(error);
                $ionicLoading.hide();
            });
        };
        getBookDetails(bookId);




        $scope.downloadBook = function(url) {
            var defaultOptions = {
                location: 'yes',
                clearcache: 'yes',
                toolbar: 'no'
            };
            console.log(url);
            document.addEventListener('deviceready', function() {
                $cordovaInAppBrowser.open(url, '_system', defaultOptions)
                    .then(function(event) {
                        // success
                    })
                    .catch(function(event) {
                        // error
                    });




            }, false);
        };


    }
]);
