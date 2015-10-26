 var TaskView = Backbone.View.extend({
        templateId : "#taskTemplate",
        model : Task,
        tagName : "li",
        events :{
            "click .spanTaskName" : "toggleTask",
            "click #btnEditSave" : "editSaveTask"
        },
        editSaveTask : function(){
            if (this.model.get("isEdit")){
                this.model.save({name : this.$("#txtTaskName").val()});
            }
            this.model.toggleEdit();
        },
        toggleTask : function(){
            this.model.toggle();
        },
        initialize : function(){
            _.bindAll(this, "render", "remove");
            this.model.on("change", this.render);
            this.model.on("destroy", this.remove);
        },
        remove : function(){
            this.$el.remove();
        },
        render : function(){
            if (!this.templateFn){
                this.templateFn = Handlebars.compile($(this.templateId).html());
            }
            this.$el.html(this.templateFn(this.model.toJSON()));
            return this;
        }
    });
