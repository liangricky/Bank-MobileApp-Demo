/**************************************
 *
 *  Licensed Materials - Property of IBM
 *  © Copyright IBM Corporation 2015. All Rights Reserved.
 *  This sample program is provided AS IS and may be used, executed, copied and modified without royalty payment by customer
 *  (a) for its own instruction and study, (b) in order to develop applications designed to run with an IBM product,
 *  either for customer's own internal use or for redistribution by customer, as part of such an application, in customer's
 *  own products.
 *
 ***************************************/
"use strict";function onConnectSuccess(){WL.Logger.debug("Successfully connected to Worklight Server."),WL.App.sendActionToNative("connectStatus",{status:!0})}function onConnectFailure(){WL.Logger.debug("Failed connecting to Worklight Server."),WL.App.sendActionToNative("connectStatus",{status:!1})}function wlCommonInit(){try{WL.Logger.debug("Attempting to connect to WL server..."),WL.Client.connect({onSuccess:onConnectSuccess,onFailure:onConnectFailure})}catch(e){console.log("Worklight is not running properly"),console.log(e.message)}HybridJS.init()}angular.module("hatch",["ngAnimate","ngTouch","ngSanitize","ngRoute","pascalprecht.translate","ui.sortable","countTo"]).config(["$routeProvider","$translateProvider",function(e,t){e.when("/",{templateUrl:"app/goals/view-goals/view-goals.html",controller:"ViewGoalsController",controllerAs:"viewGoals"}).when("/add",{templateUrl:"app/goals/add-goals/add-goals.html",controller:"AddGoalsController",controllerAs:"addGoals"}).when("/edit",{templateUrl:"app/goals/edit-goals/edit-goals.html",controller:"EditGoalsController",controllerAs:"editGoals"}).when("/details",{templateUrl:"app/goals/view-goal-details/view-goal-details.html",controller:"GoalDetailsController",controllerAs:"detailGoals"}).when("/offers",{templateUrl:"app/offers/offers.html",controller:"OffersController",controllerAs:"offers"}).when("/feasibility",{templateUrl:"app/goals/goal-feasibility/goal-feasibility.html",controller:"GoalFeasibilityController",controllerAs:"feasibility"}).when("/options",{templateUrl:"app/goals/goal-feasibility/feasibility-options.html",controller:"GoalFeasibilityController",controllerAs:"feasibility"}).otherwise({redirectTo:"/"}),t.translations("en",englishTranslations).translations("es",spanishTranslations).preferredLanguage("en")}]),angular.module("hatch").filter("parseInt",function(){return function(e){return parseInt(e,10)}}),angular.module("hatch").controller("ViewGoalsController",["Goals","Navigation",function(e,t){var a=this;a.hideInfo=!1,a.goals=e,a.navigation=t,a.dragging=!1,a.oldPriorities={},a.goals.allGoals.forEach(function(e){e.showGoal=!0,e.showEdit=!1,e.showDelete=!1}),a.dragControlListeners={accept:function(){return a.dragging=!0,!0},itemMoved:function(){},orderChanged:function(e){angular.isUndefined(a.oldPriorities[a.goals.allGoals[e.source.index].title])&&(a.oldPriorities[a.goals.allGoals[e.source.index].title]=a.goals.allGoals[e.source.index].priority),angular.isUndefined(a.oldPriorities[a.goals.allGoals[e.dest.index].title])&&(a.oldPriorities[a.goals.allGoals[e.dest.index].title]=a.goals.allGoals[e.dest.index].priority),a.goals.allGoals[e.dest.index].priority=e.dest.index+1,a.goals.allGoals[e.source.index].priority=e.source.index+1},containment:"#goal-container"},a.sortableOptions={containerPositioning:"relative"},a.addGoal=function(){a.goals.addGoal({title:"Goal"+(a.goals.allGoals.length+1),goalAmount:Math.floor(9001*Math.random()+1e3),progress:Math.floor(100*Math.random()+1)+"%",showGoal:!0,showEdit:!1,showDelete:!1,priority:a.goals.allGoals.length})},a.submitPriorities=function(){a.oldPriorities={},WL.App.sendActionToNative("updatedPriorities",{newGoals:a.goals.allGoals}),a.dragging=!1},a.cancelPriorities=function(){a.goals.allGoals.forEach(function(e){angular.isDefined(a.oldPriorities[e.title])&&(e.priority=a.oldPriorities[e.title])}),a.goals.sortGoals(),a.oldPriorities={},a.dragging=!1}}]),angular.module("hatch").controller("GoalDetailsController",["Goals","Utility","Formatter","Calc","Navigation",function(e,t,a,i,l){var o=this;o.goals=e,o.utility=t,o.formatter=a,o.calc=i,o.navigation=l,o.toOptions=function(){o.utility.setFeasPage("options");var t=e.allGoals.indexOf(e.goalToView);o.goals.deleteGoal(e.goalToView),HybridJS.getFeasibility(e.goalToView),o.goals.allGoals.splice(t,0,e.goalToView)}}]),angular.module("hatch").controller("GoalFeasibilityController",["$location","Utility","Goals","Formatter","Navigation",function(e,t,a,i,l){var o=this;o.goals=a,o.utility=t,o.navigation=l,o.formatter=i,o.goal={start:a.tempGoal.start,_rev:a.tempGoal._rev,feasibility:a.tempGoal.feasibility,priority:a.tempGoal.priority,goalAmount:a.tempGoal.goalAmount,title:a.tempGoal.title,progress:a.tempGoal.progress,notes:a.tempGoal.notes,_id:a.tempGoal._id,depositFrequency:a.tempGoal.depositFrequency,type:a.tempGoal.type,end:a.tempGoal.end,saved:a.tempGoal.saved,depositAmount:a.tempGoal.depositAmount,ownerID:a.tempGoal.ownerID,weeksLeft:a.tempGoal.weeksLeft,monthsLeft:a.tempGoal.monthsLeft},o.options=o.goals.optionalGoals,o.optionIsFeasible=o.goals.optionIsFeasible,o.submittedGoal=o.goals.submittedGoal,this.getIndex=function(e,t){return t.indexOf(e)+1},o.swapGoal=function(t,i){a.tempGoal=t.goal,o.goals.changedGoalsList=angular.isDefined(t.changedGoals)?t.changedGoals:[],o.goals.optionIsFeasible=t.isFeasible,o.goals.submittedGoal=t.goal,e.path(i),HybridJS.callback("feasibility",t.isFeasible)},o.saveFeasibility=function(){for(var e=0;e<o.goals.allGoals.length;e++)if(o.goals.allGoals[e]._id===o.goal._id)return o.goals.allGoals[e].depositFrequency=o.goal.depositFrequency,o.goals.allGoals[e].goalAmount=o.goal.goalAmount,o.goals.allGoals[e].feasibility=o.goal.feasibility,o.goals.allGoals[e].progress=o.goal.progress,o.goals.allGoals[e].end=o.goal.end,o.goals.allGoals[e].depositAmount=o.goal.depositAmount,o.goals.allGoals[e].weeksLeft=o.goal.weeksLeft,void(o.goals.allGoals[e].monthsLeft=o.goal.monthsLeft);o.goals.addGoal(o.goal)},o.confirmFeasibility=function(){o.saveFeasibility(),o.goals.changedGoalsList.forEach(function(e){o.goals.setGoal(e)}),o.navigation.exitPage()}}]),angular.module("hatch").controller("EditGoalsController",["Goals","Focus","Utility","Calc",function(e,t,a,i){var l=this;l.goals=e,l.utility=a,l.calc=i,l.focus=t,"month"===e.goalToEdit.depositFrequency?(l.showMonthly=!0,l.showWeekly=!1):(l.showWeekly=!0,l.showMonthly=!1),l.goalCopy={start:e.goalToEdit.start,_rev:e.goalToEdit._rev,feasibility:e.goalToEdit.feasibility,priority:e.goalToEdit.priority,goalAmount:e.goalToEdit.goalAmount,title:e.goalToEdit.title,progress:e.goalToEdit.progress,notes:e.goalToEdit.notes,_id:e.goalToEdit._id,depositFrequency:e.goalToEdit.depositFrequency,type:e.goalToEdit.type,end:e.goalToEdit.end,saved:e.goalToEdit.saved,depositAmount:e.goalToEdit.depositAmount,ownerID:e.goalToEdit.ownerID,weeksLeft:e.goalToEdit.weeksLeft,monthsLeft:e.goalToEdit.monthsLeft},l.changeActivePeriod=function(e){l.showMonthly===!0&&l.showWeekly===!1?"month"!==e&&(l.showMonthly=!1,l.showWeekly=!0,l.goalCopy.depositFrequency="week"):l.showMonthly===!1&&l.showWeekly===!0&&"week"!==e&&(l.showMonthly=!0,l.showWeekly=!1,l.goalCopy.depositFrequency="month")},l.getWeeklyTotal=function(e,t){var a=new Date,i=l.calc.daydiff(a,t),o=Math.ceil(e/Math.ceil(i/7)*100)/100;return l.goalCopy.depositAmount=o,o},l.getMonthlyTotal=function(e,t){var a=new Date,i=l.calc.daydiff(a,t),o=Math.ceil(e/Math.ceil(i/(365/12))*100)/100;return l.goalCopy.depositAmount=o,o},l.getTotal=function(e,t,a){var i=Math.ceil((e-t)/a*100)/100;return i},l.focusing=function(){l.focus.isTyping=!0,l.focus.setFocus(!0)},l.blurring=function(){l.focus.isTyping=!1,l.focus.setFocus(!1)},l.cancelEdit=function(){HybridJS.pressBackButton()},l.submitChanges=function(e){e.progress=Math.round(e.saved/e.goalAmount*100),l.utility.setFeasPage("feasibility"),HybridJS.getFeasibility(e)}}]),angular.module("hatch").controller("AddGoalsController",["Goals","Utility",function(e,t){var a=this;a.goal=e,a.util=t,a.emptyGoal=["title","goalAmount","start","end","depositFrequency"],a.formItems={title:"",goalAmount:0,start:new Date,end:new Date,depositFrequency:"week"},a.pageLayout=[{title:"ADD_GOAL_TITLE",text:"ADD_GOAL_Q1",placeholder:"TITLE_PLACEHOLDER",showPage:!0,swipeLeft:!1},{title:"ADD_GOAL_TITLE",text:"ADD_GOAL_Q2",placeholder:"MONEY_PLACEHOLDER",showPage:!1,swipeLeft:!1},{title:"ADD_GOAL_TITLE",text:"ADD_GOAL_Q3",placeholder:"DATE_PLACEHOLDER",showPage:!1,swipeLeft:!1},{title:"ADD_GOAL_TITLE",text:"ADD_GOAL_Q4",placeholder:"DATE_PLACEHOLDER",showPage:!1,swipeLeft:!1},{title:"ADD_GOAL_TITLE",text:"ADD_GOAL_Q5",placeholder:"",showPage:!1,swipeLeft:!1}],a.nextPage=function(e,t){(angular.isUndefined(t)||t.$valid)&&a.getIndex(e)<a.pageLayout.length-1&&(a.pageLayout[a.getIndex(e)].showPage=!1,a.pageLayout[a.getIndex(e)+1].showPage=!0,a.pageLayout[a.getIndex(e)].swipeLeft=!0)},a.lastPage=function(e){a.getIndex(e)>0&&(a.pageLayout[a.getIndex(e)].showPage=!1,a.pageLayout[a.getIndex(e)-1].showPage=!0,a.pageLayout[a.getIndex(e)].swipeLeft=!1)},a.submitButton=function(e,t){a.getIndex(e)===a.pageLayout.length-1?(a.goal.submittedGoal=a.formItems,a.util.setFeasPage("feasibility"),HybridJS.getFeasibility(a.formItems)):a.nextPage(e,t)},a.getIndex=function(e){return a.pageLayout.indexOf(e)}}]),angular.module("hatch").factory("Navigation",["$location","Goals","$timeout",function(e,t,a){var i=50,l=function(l){a(function(){t.setGoalToEdit(l),e.path("edit")},i),HybridJS.updatePage("EDIT "+l.title.toUpperCase(),"edit",!0,"#8cd211")},o=function(l){a(function(){e.path("details")},i),t.setGoalToView(l),HybridJS.updatePage(l.title.toUpperCase(),"details",!0,"#ffffff")},s=function(){a(function(){e.path("add")},i),HybridJS.updatePage("New Goal","add",!0,"#8cd211")},n=function(){a(function(){e.path("options")},i),HybridJS.updatePage("Options","options",!0,"#8cd211")},r=function(){a(function(){e.path("")},i),HybridJS.updatePage("GOALS","#",!1,"#ffffff")};return{toEdit:l,toView:o,toAddGoal:s,toOptions:n,exitPage:r}}]),angular.module("hatch").factory("Formatter",["$locale",function(e){var t=function(){return e.NUMBER_FORMATS.DECIMAL_SEP},a=function(e){e.start=e.start.getTime(),e.end=e.end.getTime()},i=function(e){e.start=new Date(e.start),e.end=new Date(e.end)},l=function(e){e.feasibility="feasible"===e.feasibility?0:"warning"===e.feasibility?1:2},o=function(e){e.feasibility=0===e.feasibility?"feasible":1===e.feasibility?"warning":"unfeasible"};return{getDecimalSeperator:t,convertDates:a,milToDate:i,convertFeasibilityToInt:l,convertFeasibilityToString:o}}]),angular.module("hatch").factory("Calc",function(){var e=function(e,t){return(t-e)/864e5},t=function(t,a){var i=new Date,l=Math.floor(e(t,i)/e(t,a)*100);return 100>=l?l:100};return{daydiff:e,calcTimePercentComplete:t}}),angular.module("hatch").directive("navDotsDirective",function(){return{restrict:"E",templateUrl:"components/nav-dots-template/nav-dots-directive.html",scope:{totalItems:"=items",current:"=currentItem"}}}),angular.module("hatch").directive("currencyInput",["$filter","$document","$locale",function(e,t,a){return{restrict:"A",require:"ngModel",priority:2,link:function(i,l,o,s){function n(e){var a=0;if(t[0].selection){e.focus();var i=t[0].selection.createRange();i.moveStart("character",-e.value.length),a=i.text.length}else(e.selectionStart||"0"===e.selectionStart)&&(a=e.selectionStart);return a}var r=a.NUMBER_FORMATS.CURRENCY_SYM,d=a.NUMBER_FORMATS.GROUP_SEP,c=a.NUMBER_FORMATS.DECIMAL_SEP,g=c.charCodeAt(0),p=a.NUMBER_FORMATS.PATTERNS[1].maxFrac,u=46,f=44,m=48,h=57,v=31;s.$formatters.push(function(t){return isNaN(parseFloat(t))||0===parseFloat(t)?void 0:e("currency")(t,r,0)}),s.$parsers.push(function(e){var t=new RegExp(d,"g"),a=e.replace(t,""),i=a.split(r);return 2===i.length?i[1]:i[0]}),l.bind("keypress",function(e){var t=e.which?e.which:e.keyCode,a="";if(a=","===c?f:u,t!==a&&t>v&&(m>t||t>h))return e.returnValue=!1,e.preventDefault(),!1;if(t===g&&e.target.value.split(c).length>1)return e.returnValue=!1,e.preventDefault(),!1;if(t===g){var i=n(e.target);return i>e.target.value.length-p+1?!0:(e.returnValue=!1,e.preventDefault(),!1)}var l=n(e.target);return null!=e.target.value.split(c)[1]&&e.target.value.split(c)[1].length>1&&l>e.target.value.length-(p+1)?(e.returnValue=!1,e.preventDefault(),!1):!0}),l.bind("blur",function(){s.$setViewValue(e("currency")(s.$modelValue,r,0)),s.$render()})}}}]),angular.module("hatch").directive("addGoalsDirective",function(){return{restrict:"E",templateUrl:"components/add-goals-template/add-goals-directive.html",scope:{page:"=",emptyGoal:"=",goalKey:"=",getIndex:"&"},replace:!0}}),angular.module("hatch").factory("Offers",function(){var e=[];return{allOffers:e}}),angular.module("hatch").controller("OffersController",["Offers",function(e){var t=this;t.offers=e,t.showFlyover=!1,t.toggleFlyover=function(){t.showFlyover=!t.showFlyover}}]),angular.module("hatch").factory("Goals",["Formatter",function(){function e(e,t){return e.priority<t.priority?-1:e.priority>t.priority?1:0}var t,a,i,l,o,s,n=this.Formatter,r=[],d=[],c=[],g=function(e){this.allGoals=e,this.sortGoals()},p=function(e){this.allGoals.push(e),this.sortGoals()},u=function(e){for(var t=0;t<this.allGoals.length;t++){var a=this.allGoals[t];if(e._id===a._id){this.allGoals.splice(t,1);for(var i=t;i<this.allGoals.length;i++)this.allGoals[i].priority-=1;break}}this.sortGoals()},f=function(){this.allGoals.sort(e)},m=function(e){this.goalToEdit=e,this.editGoalIndex=this.allGoals.indexOf(e),this.submittedGoal=e},h=function(e){this.goalToView=e,this.submittedGoal=e},v=function(e){r.forEach(function(t){t._id===e._id&&(t.depositAmount=e.depositAmount,t.depositFrequency=e.depositFrequency,n.milToDate(e),t.end=e.end,n.convertFeasibilityToString(e),t.feasibility=e.feasibility,t.goalAmount=e.goalAmount,t.weeksLeft=e.weeksLeft,t.monthsLeft=e.monthsLeft)})};return{allGoals:r,goalToEdit:t,editGoalIndex:a,goalToView:i,tempGoal:l,changedGoalsList:c,setGoals:g,setGoal:v,addGoal:p,deleteGoal:u,sortGoals:f,setGoalToEdit:m,setGoalToView:h,optionalGoals:d,optionIsFeasible:o,submittedGoal:s}}]),angular.module("hatch").directive("zero",function(){return{restrict:"A",require:"?ngModel",link:function(e,t,a,i){i.$validators.zero=function(e){return 0!==parseFloat(e)}}}}),angular.module("hatch").directive("period",["$locale",function(e){return{restrict:"A",require:"?ngModel",link:function(t,a,i,l){l.$validators.period=function(t){var a=e.NUMBER_FORMATS.DECIMAL_SEP;return t!==a}}}}]),angular.module("hatch").directive("past",function(){return{restrict:"A",require:"?ngModel",link:function(e,t,a,i){i.$validators.period=function(e){var t=new Date;return t>=e?!1:!0}}}});var wlInitOptions={showIOS7StatusBar:!1};window.addEventListener?window.addEventListener("load",function(){try{WL.Client.init(wlInitOptions)}catch(e){console.log("Worklight is not running properly"),console.log(e.message)}},!1):window.attachEvent&&window.attachEvent("onload",function(){try{WL.Client.init(wlInitOptions)}catch(e){console.log("Worklight is not running properly"),console.log(e.message)}}),angular.module("hatch").factory("Utility",function(){var e="feasibility",t=function(e){HybridJS.getFeasibility(e)},a=function(e){this.feasibilityPage=e};return{toOptions:t,feasibilityPage:e,setFeasPage:a}});var HybridJS=function(){function e(){var e="hatch-app",t=angular.element(document.getElementById(e)).scope();t.$apply()}function t(t){var a=document.getElementById("hatch-app"),i=angular.element(a).injector(),l=i.get("Goals");t.forEach(function(e){e.start=new Date(e.start),e.end=new Date(e.end),e.progress=Math.round(e.progress),e.feasibility=0===e.feasibility?"feasible":1===e.feasibility?"warning":"unfeasible"}),l.setGoals(t),e()}function a(t){var a=document.getElementById("hatch-app"),i=angular.element(a).injector(),l=i.get("Offers");t.forEach(function(e){e.displayApy=e.apy+"%"}),l.allOffers=t,e()}function i(t){var a=document.getElementById("hatch-app"),i=angular.element(a).injector(),l=i.get("$translate"),o=t.split("_")[0];l.use(o),e()}function l(e,t,a,i){try{WL.App.sendActionToNative("updatePage",{title:e,route:t,showBackButton:a,headerColor:i})}catch(l){console.log("Worklight is not running properly"),console.log(l.message)}}function o(e){window.location.hash="#/"+e,""===e?l("GOALS","",!1,"#ffffff"):"offers"===e&&l("ALL OFFERS","",!1,"#ffffff")}function s(){setTimeout(function(){window.history.back()},10)}function n(t){var a=document.getElementById("hatch-app"),i=angular.element(a).injector(),l=i.get("Goals"),o=i.get("Formatter");l.tempGoal=t,o.convertFeasibilityToString(l.tempGoal),o.milToDate(l.tempGoal),e()}function r(t){var a=document.getElementById("hatch-app"),i=angular.element(a).injector(),l=i.get("Goals"),o=i.get("Formatter");l.optionalGoals=[];for(var s=0;s<t.length;s++)l.optionalGoals.push(t[s]),o.convertFeasibilityToString(l.optionalGoals[s].goal),o.milToDate(l.optionalGoals[s].goal),0===s&&(l.optionIsFeasible=t[s].isFeasible);e()}function d(e,t){o(e),"feasibility"===e?t?l("We have good news!",e,!1,"#8cd211"):l("We have bad news",e,!1,"#ff7832"):"options"===e&&l("Options",e,!0,"#8cd211")}function c(){var e=document.getElementById("hatch-app"),t=angular.element(e).injector(),a=t.get("Utility");return a.feasibilityPage}function g(e){var t=document.getElementById("hatch-app"),a=angular.element(t).injector(),i=a.get("Goals"),l=a.get("Formatter"),o=e.start,s=e.end,n=i.allGoals.slice(),r=-1,d=0;l.convertFeasibilityToInt(e),l.convertDates(e),i.allGoals.forEach(function(t){l.convertDates(t),l.convertFeasibilityToInt(t),e._id===t._id&&(r=d),d++}),r>-1&&i.allGoals.splice(r,1),e.depositAmount=0,WL.App.sendActionToNative("checkFeasibility",{newGoal:e,goalList:i.allGoals}),i.allGoals=n,i.allGoals.forEach(function(e){l.convertFeasibilityToString(e),l.milToDate(e)}),l.convertFeasibilityToString(e),e.start=o,e.end=s}function p(e){var l={backButtonClicked:function(){s()},changePage:function(){o(e.data.route)},initialSetup:function(){t(e.data.goals)},offersSetup:function(){a(JSON.parse(e.data.result))},setLocale:function(){i(e.data.userData.language)},receiveFeasibility:function(){console.log("RECEIVING FEASIBILITY!!!!!!!!!!!!"),console.log(JSON.parse(e.data.result)),n(JSON.parse(e.data.result)[0].goal),r(JSON.parse(e.data.result)),d(c(),JSON.parse(e.data.result)[0].isFeasible)}};if(angular.isFunction(l[e.action])===!1)throw new Error("Invalid action.");return l[e.action]()}function u(){WL.App.sendActionToNative("pressBackButton",{})}function f(e){WL.App.sendActionToNative("sendGoals",{goals:e})}function m(){try{WL.App.addActionReceiver("myActionReceiver",p)}catch(e){console.log("failed to setup action receiver")}}return{init:m,callback:d,updatePage:l,sendGoalsToNative:f,pressBackButton:u,getFeasibility:g}}();angular.module("hatch").factory("Focus",function(){var e={};return e.isTyping=!1,e.setFocus=function(t){e.isTyping=t},e}),angular.module("hatch").run(["$templateCache",function(e){e.put("app/offers/offers.html",'<div id="offer-container" class="offer-container"><ul data-ng-model="offers.offers.allOffers" class="offer-list"><li data-ng-repeat="offer in offers.offers.allOffers" class="offer" ng-class="{\'expanded\': offer.expanded}" ng-click="offer.expanded = !offer.expanded"><p class="offer-name">{{offer.name}}</p><span class="offer-details"><div class="apy"><p class="apy-rate">{{offer.displayApy}}</p><p class="apy-label" translate="APY" translate-compile=""></p></div><div class="fee"><p class="fee-label" translate="FEE" translate-compile=""></p><p class="fee-rate">{{offer.fee}}</p></div><ul data-ng-model="offer.features" class="feature-list"><li class="feature" data-ng-repeat="feature in offer.features"><p>{{feature.name}}</p><img src="assets/images/confirm_green.png" height="17" width="17"></li></ul></span> <button class="btn accept-btn" ng-click="offers.toggleFlyover();$event.stopPropagation()">Select This Offer</button></li></ul><div class="phone-bar"><img src="assets/images/phone_green.png" height="34" width="34"></div><div class="call-container" ng-class="{\'slide-up\': offers.showFlyover}"><div class="call-content"><p class="call-text" translate="CALL_YOU_TEXT" translate-compile=""></p><button class="confirm-btn" ng-click="offers.toggleFlyover()"></button></div></div></div>'),e.put("components/add-goals-template/add-goals-directive.html",'<div class="add-goal-content"><div class="add-goal-text"><p>{{page.text | translate}}</p></div><div><div ng-if="page.placeholder === \'TITLE_PLACEHOLDER\'" class="input"><input type="text" maxlength="17" class="input-item" placeholder="{{page.placeholder | translate}}" ng-model="emptyGoal[goalKey]" required=""></div><div ng-if="page.placeholder === \'MONEY_PLACEHOLDER\'" class="input"><input type="tel" class="input-item" placeholder="{{0 | currency : undefined : 0}}" ng-model="emptyGoal[goalKey]" currency-input="" zero="" period="" required=""></div><div ng-if="getIndex(page) === 2" class="input"><input type="date" class="input-date" ng-model="emptyGoal[goalKey]" required=""></div><div ng-if="getIndex(page) === 3" class="input"><input type="date" class="input-date" ng-model="emptyGoal[goalKey]" past="" required=""></div><div ng-if="page.placeholder === \'\'" class="period-selector"><input type="radio" ng-model="emptyGoal[\'depositFrequency\']" value="week" name="period-selector" id="weekly" ng-class="{active: emptyGoal[\'depositFrequency\'] === \'week\'}"> <label for="weekly">{{\'WEEKLY\' | translate}}</label> <input type="radio" ng-model="emptyGoal[\'depositFrequency\']" value="month" name="period-selector" id="monthly" ng-class="{active: emptyGoal[\'depositFrequency\'] === \'month\'}"> <label for="monthly">{{\'MONTHLY\' | translate}}</label></div></div></div>'),e.put("components/nav-dots-template/nav-dots-directive.html",'<span ng-repeat="item in totalItems" class="nav-dot" ng-class="{\'current\': item === current}"></span>'),e.put("app/goals/add-goals/add-goals.html",'<div class="add-goal-container" ng-if="!addGoals.goalSubmitted"><div ng-repeat="page in addGoals.pageLayout" ng-form="inputForm"><div ng-show="page.showPage" class="add-goal-page" ng-class="{\'left\': page.swipeLeft, \'right\': !page.swipeLeft}" ng-swipe-left="addGoals.nextPage(page, inputForm)" ng-swipe-right="addGoals.lastPage(page)"><add-goals-directive page="page" empty-goal="addGoals.formItems" goal-key="addGoals.emptyGoal[addGoals.getIndex(page)]" get-index="addGoals.getIndex(page)"></add-goals-directive><nav-dots-directive items="addGoals.pageLayout" current-item="page"></nav-dots-directive><button class="add-goal-button" ng-disabled="inputForm.$invalid" ng-click="addGoals.submitButton(page, inputForm)"><img src="assets/images/confirm_white.png"></button></div></div></div>'),e.put("app/goals/edit-goals/edit-goals.html",'<div class="item-container" ng-form="editForm"><ul data-ng-model="editGoals.goals.goalToEdit"><li ng-show="totalForm.$invalid" class="form-warning"><p translate="TOTALALERT"></p></li></ul></div><li class="item" ng-form="totalForm"><p class="item-title" translate="TOTAL"></p><ul class="currency-container"><input id="totalContainer" name="totalContainer" type="tel" maxlength="19" class="currency-number" currency-input="" ng-model="editGoals.goalCopy.goalAmount" ng-required="true" zero="" period="" ng-focus="editGoals.focusing()" ng-blur="editGoals.blurring()"></ul></li><li ng-show="startForm.$invalid" class="form-warning"><p translate="STARTALERT"></p></li><li class="item" ng-form="startForm"><p class="item-title" translate="STARTDATE"></p><input id="startDateField" type="date" ng-model="editGoals.goalCopy.start" class="item-date" ng-required="true" ng-focus="editGoals.focusing()" ng-blur="editGoals.blurring()" num-date=""></li><li ng-show="endForm.$invalid" class="form-warning"><p translate="ENDALERT"></p></li><li class="item" ng-form="endForm"><p class="item-title" translate="ENDDATE"></p><input id="endDateField" type="date" ng-model="editGoals.goalCopy.end" class="item-date" ng-required="true" ng-focus="editGoals.focusing()" ng-blur="editGoals.blurring()" past="" num-date=""></li><li class="item"><p class="item-title" translate="RECURRINGPAYMENT"></p><p class="item-data">{{ (editGoals.showMonthly ? editGoals.getTotal(editGoals.goalCopy.goalAmount, editGoals.goalCopy.saved, editGoals.goalCopy.monthsLeft) : editGoals.getTotal(editGoals.goalCopy.goalAmount, editGoals.goalCopy.saved, editGoals.goalCopy.weeksLeft)) | currency }}</p></li><div><ul class="period-container"><li id="week" class="period handle" ng-class="{active: editGoals.showWeekly}" translate="WEEKLY" ng-click="editGoals.changeActivePeriod(\'week\')"></li><li id="month" class="period handle" ng-class="{active: editGoals.showMonthly}" translate="MONTHLY" ng-click="editGoals.changeActivePeriod(\'month\')"></li></ul></div><div class="notes-container"><p class="notes-title" translate="NOTES"></p><textarea id="notesField" class="notes-field" ng-model="editGoals.goalCopy.notes" ng-focus="editGoals.focusing()" ng-blur="editGoals.blurring()"></textarea></div><div class="hacky-space-container" ng-hide="editGoals.focus.isTyping"></div><div class="edit-button-container" ng-class="{typing: editGoals.focus.isTyping}"><img class="cancel-button" src="assets/images/cancel_orange.png" width="34" height="34" ng-click="editGoals.cancelEdit()"> <img class="confirm-button {{totalForm.$invalid || startForm.$invalid || endForm.$invalid}}" src="assets/images/confirm_green.png" width="34" height="34" ng-click="(totalForm.$invalid || startForm.$invalid || endForm.$invalid) ? WL.Logger.info(\'invalid form\') : editGoals.submitChanges(editGoals.goalCopy)"></div>'),e.put("app/goals/goal-feasibility/feasibility-options.html",'<ul class="feasibility-options-list"><li class="feasibility-options-item" ng-repeat="option in feasibility.options" ng-class-odd="\'light-background\'" ng-class-even="\'dark-background\'" ng-click="feasibility.swapGoal(option, \'feasibility\')"><div class="feasibility-options-payment"><span class="option-number">{{feasibility.getIndex(option, feasibility.options)}}</span> <span class="faded-text" translate="LOWERECURRINGPAYMENT"></span><div class="money"><span>{{ (option.goal.depositAmount | currency).split(feasibility.formatter.getDecimalSeperator())[0] }}</span> <span class="money-cents">{{ feasibility.formatter.getDecimalSeperator() + (option.goal.depositAmount | currency).split(feasibility.formatter.getDecimalSeperator())[1] }}</span></div><span>{{ ((option.goal.depositFrequency === \'month\') ? \'MONTHLY\' : \'WEEKLY\') | translate }}</span></div><div class="feasibility-details"><div class="feasibility-details-row"><span translate="START"></span> <span translate="END"></span></div><hr><div class="feasibility-details-row"><span class="date {{ (option.goal.feasibility === \'feasible\') ? \'positive-color\' : \'negative-color\' }}">{{option.goal.start | date:\'shortDate\' }}</span> <span class="date {{ (option.goal.feasibility === \'feasible\') ? \'positive-color\' : \'negative-color\' }}">{{option.goal.end | date:\'shortDate\' }}</span></div></div><div ng-if="option.changedGoals !== undefined" class="feasibility-warning"><p ng-repeat="changed in option.changedGoals">Option {{feasibility.getIndex(option, feasibility.options)}} will move the end date of {{changed.title}} to {{ changed.end | date : \'shortDate\'}} with a recurring payment of {{changed.depositAmount | currency}} / {{((changed.depositFrequency).toUpperCase() | translate).toLowerCase()}}</p></div></li></ul>'),e.put("app/goals/goal-feasibility/goal-feasibility.html",'<div class="feasibility-container"><ul class="list-container"><li><p class="feasibility-title" translate="YOURGOAL"></p></li><li><div class="feasibility-description"><div>{{feasibility.goal.title}}</div><div class="money"><div>{{ (feasibility.goal.goalAmount | currency).split(feasibility.utility.getDecimalSeperator())[0] }}</div><div class="money-cents">{{ feasibility.utility.getDecimalSeperator() + (feasibility.goal.goalAmount | currency).split(feasibility.utility.getDecimalSeperator())[1] }}</div></div></div></li><li><div class="feasibility-details"><div class="feasibility-details-row"><div translate="LOWSTART"></div><div translate="LOWEND"></div></div><hr><div class="feasibility-details-row"><div class="date {{ feasibility.optionIsFeasible ? \'positive-color\' : \'negative-color\' }}">{{ feasibility.goal.start | date:\'shortDate\' }}</div><br><div class="date {{ feasibility.optionIsFeasible ? \'positive-color\' : \'negative-color\' }}">{{ feasibility.submittedGoal.end | date:\'shortDate\' }}</div></div></div></li><li><div ng-if="feasibility.optionIsFeasible" class="feasibility-suggestion"><div translate="CBMBU"></div><div class="money {{ (feasibility.goal.feasibility === \'feasible\') ? \'positive-color\' : \'negative-color\' }}"><div>{{ (feasibility.goal.depositAmount | currency).split(feasibility.utility.getDecimalSeperator())[0] }}</div><div class="money-cents">{{ feasibility.utility.getDecimalSeperator() + (feasibility.goal.depositAmount | currency).split(feasibility.utility.getDecimalSeperator())[1] }}</div></div><div>{{ (feasibility.goal.depositFrequency === \'month\' ? \'OYMA\' : \'OYWA\') | translate }}</div></div><div ng-if="!feasibility.optionIsFeasible" class="feasibility-suggestion"><div translate="BADTIMES"></div><div class="date {{ (feasibility.goal.feasibility === \'feasible\') ? \'positive-color\' : \'negative-color\' }}">{{feasibility.goal.end | date: \'shortDate\'}}</div></div></li><li><p class="prompt" translate="ISOK"></p></li><li><div class="feasibility-options"><div class="more-options {{ (feasibility.goal.feasibility === \'feasible\') ? \'positive-background-color\' : \'negative-background-color\' }}" ng-click="feasibility.navigation.toOptions()" translate="MOREOPTIONS"></div></div></li><li><div class="hacky-space-container"></div></li></ul></div><div class="edit-button-container"><img class="cancel-button" src="assets/images/cancel_orange.png" width="34" height="34" ng-click="feasibility.navigation.exitPage()"> <img class="confirm-button" src="assets/images/confirm_green.png" width="34" height="34" ng-click="feasibility.confirmFeasibility()"></div>'),e.put("app/goals/view-goal-details/view-goal-details.html",'<div class="detail-progress"><div class="detail-goal-content {{detailGoals.goals.goalToView.feasibility}}"><div class="detail-goal-progress {{detailGoals.goals.goalToView.feasibility}} progress-{{detailGoals.goals.goalToView.progress}}"><p count-to="{{detailGoals.goals.goalToView.progress}}" value="{{0}}" duration="1" style="min-width: 25px; padding-left: 4px;"></p><p style="padding-right:2%; min-width: 13px;">%</p></div></div></div><div class="detail-container"><div class="hacky-progress-space-container"></div><ul data-ng-model="detailGoals.goals.goalToView" class="detail-list"><li class="detail"><p class="detail-title" translate="TOTAL"></p><div class="amount-data-container-small"><p class="detail-data">{{ (detailGoals.goals.goalToView.goalAmount | currency).split(detailGoals.formatter.getDecimalSeperator())[0] }}</p><p class="detail-data-cents">.{{ (detailGoals.goals.goalToView.goalAmount | currency).split(detailGoals.formatter.getDecimalSeperator())[1] }}</p></div></li><div><ul class="alert-container {{detailGoals.goals.goalToView.feasibility}}" ng-show="detailGoals.goals.goalToView.feasibility === \'warning\' || detailGoals.goals.goalToView.feasibility ===\'unfeasible\'" ng-click="detailGoals.toOptions()"><li class="progress-alert-container"><p class="progress-alert" translate="ALRT1"></p><p class="progress-alert" translate="ALRT2"></p></li><li class="img-container"><img src="assets/images/back_white.png" class="forward-img" width="45" height="45"></li></ul></div><div><ul class="amount-container"><li class="amount-item"><p class="amount-title" translate="AMOUNTPAID"></p><div class="amount-data-container"><p class="amount-data">{{ (detailGoals.goals.goalToView.saved | currency).split(detailGoals.formatter.getDecimalSeperator())[0] }}</p><p class="amount-data-cents">{{ detailGoals.formatter.getDecimalSeperator() + (detailGoals.goals.goalToView.saved | currency).split(detailGoals.formatter.getDecimalSeperator())[1] }}</p></div></li><li class="amount-item"><p class="amount-title" translate="AMOUNTLEFT"></p><div class="amount-data-container"><p class="amount-data">{{ (detailGoals.goals.goalToView.goalAmount - detailGoals.goals.goalToView.saved | currency).split(detailGoals.formatter.getDecimalSeperator())[0] }}</p><p class="amount-data-cents">{{ detailGoals.formatter.getDecimalSeperator() + (detailGoals.goals.goalToView.goalAmount - detailGoals.goals.goalToView.saved | currency).split(detailGoals.formatter.getDecimalSeperator())[1] }}</p></div></li></ul></div><div><ul class="time-container"><li class="time"><p class="time-start" translate="START"></p><p class="time-end" translate="END"></p></li><li class="time-progress"><div class="time-progress-bar"><div class="time-progress-fill {{detailGoals.goals.goalToView.feasibility}} progress-time-{{detailGoals.calc.calcTimePercentComplete(detailGoals.goals.goalToView.start, detailGoals.goals.goalToView.end)}}"><div class="track-dot {{detailGoals.goals.goalToView.feasibility}}"></div></div></div></li><li class="time"><p class="time-start-date {{detailGoals.goals.goalToView.feasibility}}">{{detailGoals.goals.goalToView.start | date:\'shortDate\' }}</p><p class="time-end-date {{detailGoals.goals.goalToView.feasibility}}">{{detailGoals.goals.goalToView.end | date:\'shortDate\' }}</p></li></ul></div><div><ul class="recurr-container"><li class="recurr-item"><p class="recurr-title" translate="RECURRINGPAYMENT"></p><ul class="per-container"><li class="per-item"><div class="amount-data-container"><p class="per-data">{{ (detailGoals.goals.goalToView.depositAmount | currency).split(detailGoals.formatter.getDecimalSeperator())[0] }}</p><p class="per-data-cents">{{ detailGoals.formatter.getDecimalSeperator() + (detailGoals.goals.goalToView.depositAmount | currency).split(detailGoals.formatter.getDecimalSeperator())[1] }}</p></div></li><li class="per-item"><p class="per-period">/ {{ detailGoals.goals.goalToView.depositFrequency.toUpperCase() | translate }}</p></li></ul></li></ul></div><li class="detail-notes-container"><p class="detail-notes-title" translate="NOTES"></p><textarea readonly="true" id="notesField" class="detail-notes-field">{{detailGoals.goals.goalToView.notes}}</textarea></li></ul><div class="hacky-space-container"></div></div><div class="confirm-button-contianer"><img class="edit-btn" src="assets/images/edit_yellow.png" width="34" height="34" ng-click="detailGoals.navigation.toEdit(detailGoals.goals.goalToView)"> <img class="delete-btn" src="assets/images/trash_orange.png" width="34" height="34" ng-click="detailGoals.goals.deleteGoal(detailGoals.goals.goalToView); detailGoals.navigation.exitPage()"></div>'),e.put("app/goals/view-goals/view-goals.html",'<div id="goal-container" class="goal-container"><ul data-as-sortable="viewGoals.dragControlListeners" data-ng-model="viewGoals.goals.allGoals" class="goal-list"><li data-ng-repeat="goal in viewGoals.goals.allGoals" data-as-sortable-item="" class="goal"><div class="goal-content {{goal.feasibility}}" ng-class="{\'slide-left\': goal.showEdit, \'slide-right\': goal.showDelete}" ng-swipe-right="goal.showEdit=true; goal.showGoal=false;" ng-swipe-left="goal.showDelete=true; goal.showGoal=false;" ng-click="viewGoals.navigation.toView(goal)"><div class="goal-progress {{goal.feasibility}} progress-{{goal.progress}}"></div><div><span class="handle" data-as-sortable-item-handle=""><img src="assets/images/handle-icon.png" width="3" height="17"></span><p class="goal-name">{{ goal.title }}</p><p class="goal-amount">{{ goal.progress }}%</p></div></div><div class="goal-delete goal-action" ng-show="goal.showDelete" ng-swipe-right="goal.showDelete=false; goal.showGoal=true;"><div><img class="delete-icon" src="assets/images/trash_white.png" width="34" height="34" ng-click="viewGoals.goals.deleteGoal(goal)"></div></div><div class="goal-edit goal-action" ng-show="goal.showEdit" ng-swipe-left="goal.showEdit=false; goal.showGoal=true;"><div><img class="delete-icon" src="assets/images/edit_white.png" width="34" height="34" ng-click="viewGoals.navigation.toEdit(goal)"></div></div></li><li ng-show="viewGoals.goals.allGoals.length === 0"><p translate="NO_GOALS" translate-compile=""></p></li></ul></div><div class="view-goals-button-contianer"><button class="btn add-btn" ng-hide="viewGoals.dragging" ng-click="viewGoals.navigation.toAddGoal()"></button> <button class="btn cancel-btn" ng-show="viewGoals.dragging" ng-click="viewGoals.cancelPriorities()"></button> <button class="btn submit-btn" ng-show="viewGoals.dragging" ng-click="viewGoals.submitPriorities()"></button></div>')
}]);