$(function(){
        window.appModel = new TaskAppModel();
        var appView = new TaskAppView({ collection : appModel });
        appModel.fetch();
    });
