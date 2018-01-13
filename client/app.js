var mytaskList = angular.module('mytaskList', []);

function mainController($scope, $http) {
    $scope.task = {};

    // when landing on the page, get all todos and show them

    var getAllTasks = function(){
        $http.get('/api/tasks').then(function(tasks, err) {
            if(err){
                alert(err);
            }else{
                $scope.tasks = tasks.data;
            }
        });
    };

    // Add Task
    $scope.addTask = function(){
        $scope.task.isDone = false;
        $http.post('/api/task', $scope.task).then(function(res, err){
            if(err){
                alert(err);
            }else{
                $scope.tasks.unshift(res.data);
                $scope.task = '';
            }
        });
    };

    // Update Task
    $scope.updateTask = function(task){ 
        $http.put('/api/task/'+task._id, task).then(function(res, err){
            if(err){
                alert(err);
            }else{
                getAllTasks();
            }
        });
    };

    // Delete Task
    $scope.deleteTask = function(id){
        $http.delete('/api/task/'+id).then(function(res, err){
            if(err){
                alert(err);
            }else{
                getAllTasks();
            }
        });
    };

    getAllTasks();
}

