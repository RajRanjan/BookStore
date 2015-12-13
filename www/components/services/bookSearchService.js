app.factory('bookSearchService', function($http, $q) {




    function searchBook(searchText, pageNumber) {
        var deferred = $q.defer();
        $http.get('http://it-ebooks-api.info/v1/search/' + searchText + '/page/' + pageNumber).success(function(result) {
            //now parsing the result
            console.log(result);
            var response = {};
            if (result.Error === "0" && parseInt(result.Total, 10) > 0) {
                response.message = "Books Found";
                response.totalBooks = parseInt(result.Total,10);
                response.data = result.Books;
                deferred.resolve(response)
            } else {
                response.message = "No Books for this search";
                deferred.reject(response);
            }
        }).error(function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    function getBookDetails(bookId) {
        var deferred = $q.defer();
        $http.get('http://it-ebooks-api.info/v1/book/' + bookId).success(function(result) {
            //now parsing the result
            console.log(result);
            var response = {};
            if (result.Error === "0") {
                response.message = "Book Details Found";
                response.data = result;
                deferred.resolve(response)
            } else {
                response.message = "Book Details Not Found";
                deferred.reject(response);
            }
        }).error(function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }
    return {
        searchBook: searchBook,
        getBookDetails:getBookDetails
    }

});
