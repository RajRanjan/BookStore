app.controller('appController', ['$scope',
    '$state',
    '$http',
    'bookSearchService',
    '$ionicLoading',
    '$ionicScrollDelegate',
    '$ionicHistory',
    function($scope, $state, $http, bookSearchService, $ionicLoading,$ionicScrollDelegate,$ionicHistory) {
        $ionicHistory.clearHistory();
        $scope.isSearchSet = false;
        $scope.searchForm = {
            searchText: null
        };
        /************************************************************
         * pagination functionality
         * 
         **************************************************************/
        $scope.searchDone=false; 
        $scope.previousPageNumber = 0;
        $scope.nextPageNumber = 1;
        $scope.maxPageNumber = 0;
        $scope.currentPageNumber = 1;
        $scope.nextPage = function() {
            $scope.nextPageNumber++;
            $scope.previousPageNumber++;
            $scope.currentPageNumber++;
            $scope.searchBooks($scope.searchForm.searchText, $scope.nextPageNumber);
        };
        $scope.previousPage = function() {
            if ($scope.previousPageNumber >= 1) {
                $scope.nextPageNumber--;
                $scope.previousPageNumber--;
                $scope.currentPageNumber--;
                $scope.searchBooks($scope.searchForm.searchText, $scope.previousPageNumber);
            }

        };
        /************************************************************
         * Functions 
         * 
         **************************************************************/
        $scope.searchBooks = function(searchText, pageNumber) {
            console.log(searchText, pageNumber);
            $ionicLoading.show();
            bookSearchService.searchBook(searchText, pageNumber).then(function(result) {
                if(result.totalBooks>10){
                    $scope.isSearchSet = true;
                    $scope.bookList = result.data;
                }
                
                $ionicScrollDelegate.scrollTop([true]);
                $ionicLoading.hide();
            }).catch(function(error) {
                $ionicLoading.hide();
                console.log(error);
            });
        };

    }
]);
