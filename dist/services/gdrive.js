"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=function(){var e=arguments.length<=0||void 0===arguments[0]?"NO_DESCRIPTION":arguments[0],i=arguments.length<=1||void 0===arguments[1]?[]:arguments[1];return new _bluebird2["default"](function(t,r){var u=new _googleapis2["default"].auth.JWT(keystore.client_email,null,keystore.private_key,scopes,null);u.authorize(function(n){if(n)r(n);else{var o="Upload_"+(0,_moment2["default"])().format("YYYY-MM-DD_HH:mm:ss");drive.files.insert({auth:u,resource:{title:o,mimeType:"application/vnd.google-apps.folder",description:e,parents:[{kind:"drive#fileLink",id:uploadFolderId}]}},function(n,o){n?r(n):!function(){var n=o.id,a=function(i,t){var r=_nodeUuid2["default"].v4()+"."+_mime2["default"].extension(i.mimetype),o="\n                Description: "+e+"\n                Original Filename: "+i.originalname+"\n              ";drive.files.insert({auth:u,resource:{title:r,mimeType:i.mimetype,description:o,parents:[{kind:"drive#fileLink",id:n}]},media:{mimeType:i.mimetype,body:_fs2["default"].createReadStream(_path2["default"].resolve(i.path))}},t)};_async2["default"].each(i,a,function(e){e?r(e):t({success:!0})})}()})}})})};var _googleapis=require("googleapis"),_googleapis2=_interopRequireDefault(_googleapis),_config=require("./config"),_config2=_interopRequireDefault(_config),_bluebird=require("bluebird"),_bluebird2=_interopRequireDefault(_bluebird),_async=require("async"),_async2=_interopRequireDefault(_async),_fs=require("fs"),_fs2=_interopRequireDefault(_fs),_path=require("path"),_path2=_interopRequireDefault(_path),_moment=require("moment"),_moment2=_interopRequireDefault(_moment),_nodeUuid=require("node-uuid"),_nodeUuid2=_interopRequireDefault(_nodeUuid),_mime=require("mime"),_mime2=_interopRequireDefault(_mime),keystore=_config2["default"].keystore,uploadFolderId=_config2["default"].uploadFolderId,drive=_googleapis2["default"].drive("v2"),scopes=["https://www.googleapis.com/auth/drive"];