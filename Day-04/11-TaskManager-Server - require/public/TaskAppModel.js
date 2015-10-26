define(['backbone','Task','underscore'], function(Backbone, Task, _){
    var TaskAppModel = Backbone.Collection.extend({
        model : Task,
        url : 'http://localhost:3000/tasks',
        removeCompleted : function(){
            var complatedTasks = this.where({isCompleted : true});
            _.each(complatedTasks, function(taskModel){
                    taskModel.destroy();
            });
        }
    });
    return TaskAppModel;
});
