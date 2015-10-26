define(['backbone'], function(Backbone){
    var Task = Backbone.Model.extend({
            defaults : {
                id : 0,
                name : '',
                isCompleted : false,
                isEdit : false
            },
            toggle : function(){
                this.save({isCompleted : !this.get("isCompleted")});
            },
            toggleEdit : function(){
                this.save("isEdit", !this.get("isEdit"));
            }
        });
    return Task;
});
