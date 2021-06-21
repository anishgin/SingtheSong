var myApp = angular.module('myApp',[]);

myApp.controller('MyCtrl', function ($scope) {
    $scope.fileContent = '';
    $scope.fileSize = 0;
    $scope.fileName = '';
    $scope.submit = function () {
      var file = document.getElementById("myFileInput").files[0];
      if (file) {
        console.log("controller >> File exists")
        var aReader = new FileReader();
        aReader.readAsText(file, "UTF-8");
        aReader.onload = function (evt) {
          console.log("controller >> File exists >> onload")
        var aReader = new FileReader();
            console.log("controller >> File exists >> content >>"+ aReader.result)
            $scope.fileContent = aReader.result;
            $scope.fileName = document.getElementById("myFileInput").files[0].name;
            $scope.fileSize = document.getElementById("myFileInput").files[0].size;;
        }
        aReader.onerror = function (evt) {
            console.log("controller >> File exists >> Error")
            $scope.fileContent = "error";
        }
      }
    }
});