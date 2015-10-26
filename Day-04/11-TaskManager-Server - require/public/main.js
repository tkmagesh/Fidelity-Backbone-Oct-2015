require(['jquery','TaskAppModel','TaskAppView'], function($, TaskAppModel, TaskAppView){
    $(function(){
        window.appModel = new TaskAppModel();
        var appView = new TaskAppView({ collection : appModel });
        appView.render().$el.appendTo(document.body);
        appModel.fetch();
    });
});
