"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}var _express=require("express"),_express2=_interopRequireDefault(_express),_index=require("./routes/index"),_index2=_interopRequireDefault(_index),_config=require("./services/config"),_config2=_interopRequireDefault(_config),_logger=require("./services/logger"),_logger2=_interopRequireDefault(_logger),app=(0,_express2["default"])();app.use(function(e,r,i){r.header("Access-Control-Allow-Origin","*"),r.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"),i()}),(0,_index2["default"])(app);var _config$server=_config2["default"].server,port=_config$server.port,host=_config$server.host,server=app.listen(port,host,function(){var e=server.address(),r=e.address,i=e.port;_logger2["default"].info("Server listening at http://%s:%s",r,i)});