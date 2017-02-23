var app = angular.module('myApp', ['ngMaterial', 'ngAnimate', 'ngMessages']);
var obj = JSON.stringify({"page":1});
var url = '/students/' + encodeURI();
app.controller('StudentsController', ['$scope', '$rootScope', '$http', '$mdDialog',
    StudentsController
]);

function StudentsController($scope, $rootScope, $http, $mdDialog) {
    $scope.students = [];
    $scope.getStudents = function() {
        $http({
            method: "GET",
            url: url
        }).then(function mySucces(response) {
            $scope.students = response.data;
        }, function myError(response) {
            console.log(response.statusText);
            $scope.students = 'error';
        });
    };

    $scope.reload = function() {
        $scope.students = [];
        $scope.getStudents();
    };

    $scope.removeStudent = function(student) {
        var id = student.id;
        $http({
            method: "DELETE",
            url: url + id
        }).then(function(response) {
            var index = $scope.students.indexOf(student);
            $scope.students.splice(index, 1);
        }, function(response) {
            console.log(response.statusText);
            $scope.students = 'error';
            alert('Xóa thất bại');
        });
    };

    $scope.showDialog = function($event, btn, st) {
        $mdDialog.show({
            locals: {
                wBtn: btn,
                student: st
            },
            controller: DialogCtrl,
            controllerAs: 'ctrl',
            templateUrl: 'dialog.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true
        });
    };

    $rootScope.$on("AddStudent", function(event, student) {
        $scope.addStudent(student);
    });

    $scope.addStudent = function(student) {
        $scope.students.push(student);
    };

    $rootScope.$on("EditStudent", function(event, data) {
        $scope.EditStudent(data[0], data[1]);
    });

    $scope.EditStudent = function(oldStudent, newStudent) {
        var index = $scope.students.indexOf(oldStudent);
        $scope.students[index].id = newStudent.id;
        $scope.students[index].name = newStudent.name;
        $scope.students[index].class = newStudent.class;
    };
};

function DialogCtrl($timeout, $q, $scope, $rootScope, $mdDialog, $http, wBtn, student) {
    var self = this;
    if (wBtn === 'add') {
        self.title = 'Add new student';
        self.edit = false;
        self.btntext = 'Add';
    } else {
        self.title = 'Edit student';
        self.edit = true;
        self.btntext = 'Save';
        $scope.user = {
            id: student.id,
            name: student.name,
            class: student.class
        };
    }
    self.cancel = function($event) {
        $mdDialog.cancel();
    };
    self.finish = function($event) {
        $mdDialog.hide();
        var dataSV = {
            id: $scope.user.id,
            name: $scope.user.name,
            class: $scope.user.class,
            idfb: null
        };
        if (wBtn === 'add') {
            $http({
                method: 'POST',
                url: url,
                data: dataSV,
            }).then(function mySucces(response) {
                $rootScope.$emit('AddStudent', dataSV);
            }, function myError(response) {
                console.log(response.statusText);
            });
        } else if (wBtn === 'edit') {
            dataSV.idfb = student.idfb;
            $http({
                method: 'PUT',
                url: url + dataSV.id,
                data: dataSV,
            }).then(function mySucces(response) {
                $rootScope.$emit('EditStudent', [student, dataSV]);
            }, function myError(response) {
                console.log(response.statusText);
            });
        }
    };
}
