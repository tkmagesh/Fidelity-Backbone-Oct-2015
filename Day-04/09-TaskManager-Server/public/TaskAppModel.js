  var TaskAppModel = Backbone.Collection.extend({
        model : Task,
        url : 'http://localhost:3000/tasks',
        removeCompleted : function(){
            console.log("removeCompleted triggered");
            var complatedTasks = this.where({isCompleted : true});
            _.each(complatedTasks, function(taskModel){
                    taskModel.destroy();
            });
            //this.sync();
        }
    });
