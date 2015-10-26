 var TaskAppView = Backbone.View.extend({
        el : ".content",
        events : {
            "click #btnAddTask" : "addNewTask",
            "click #btnRemoveCompleted" : "removeCompleted"
        },
        initialize : function(){
            this.collection.on("add", this.onNewTaskAdded.bind(this))
            this.collection.on("all", this.updateCount.bind(this));
        },
        onNewTaskAdded: function(newTask){
            var newTaskView = new TaskView({model : newTask});
            newTaskView.render().$el.appendTo(this.$("#olTaskList"));
        },
        updateCount : function(){
            this.$(".taskCount").html(this.collection.length);
        },
        addNewTask : function(){
            //create a new task
            //add it to the current model
            var taskName = this.$("#txtTaskName").val();
            var newTask = new Task({name : taskName});
            this.collection.add(newTask);
        },
        removeCompleted : function(){
            this.collection.removeCompleted();
        }
    });
