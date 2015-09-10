Router.configure({
 layoutTemplate: 'layout',

});
Router.map(function() {
this.route('qTypeList', {path: '/'});
this.route('addition', {path: '/addition'});
this.route('tTables', {path: '/TimesTables'});
this.route('shapes', {path: '/Shapes'});
this.route('division', {path: '/division'});
this.route('subtraction', {path: '/subtraction'});
this.route('multiplication', {path: '/multiplication'});

});

