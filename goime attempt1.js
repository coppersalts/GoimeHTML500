let _xmouse = 0;
let _ymouse = 0;

// Frame 3
// TODO: Re-add easter egg
// var ml = new Object();
// var glorbable = false;
// ml.onMouseWheel = function(d)
// {
// 	if(Key.isDown(71))
// 	{
// 		singingface._alpha = 100;
// 		singingface._y -= d * 30;
// 		if(singingface._y < 500 && !glorbable)
// 		{
// 			glorbable = true;
// 			stopAllSounds();
// 			var _loc2_ = new Sound(_root);
// 			_loc2_.setVolume(100);
// 			_loc2_.attachSound("eple");
// 			_loc2_.start(0,99999999);
// 		}
// 		updateAfterEvent();
// 	}
// };
// Mouse.addListener(ml);
function timeToText(f, g) {
	f *= 20;
	var _loc2_ = [0,0,0,0,0,0,0,0,0];
	_loc2_[0] = Math.round(f % 10);
	_loc2_[1] = Math.round(Math.floor(f / 10) % 10);
	_loc2_[2] = Math.round(Math.floor(f / 100) % 10);
	_loc2_[3] = Math.round(Math.floor(f / 1000) % 10);
	_loc2_[4] = Math.round(Math.floor(f / 10000) % 6);
	_loc2_[5] = Math.round(Math.floor(f / 60000) % 10);
	_loc2_[6] = Math.round(Math.floor(f / 600000) % 6);
	_loc2_[7] = Math.round(Math.floor(f / 3600000) % 10);
	_loc2_[8] = Math.round(Math.floor(f / 36000000) % 10);
	var _loc4_ = false;
	var _loc3_ = "";
	var _loc1_ = 8;
	while (_loc1_ >= 0) {
		if ((_loc2_[_loc1_] >= 1 || _loc1_ <= g) && !_loc4_) {
			_loc4_ = true;
		}
		if (_loc4_) {
			_loc3_ += (_loc2_[_loc1_] + "").substring(0,1);
			if (_loc1_ == 3) {
				_loc3_ += ".";
			}
			if (_loc1_ == 5 || _loc1_ == 7) {
				_loc3_ += ":";
			}
		}
		_loc1_--;
	}
	return _loc3_;
}
// TODO: Re-add saved data
// var goime = SharedObject.getLocal("goime2");
// var goime = {data: {timer: 1000, recordtime: 100, a: new Array(500).fill(false)}}; // temporary
var goime = {data: {timer: undefined}};
if (goime.data.timer == undefined || goime.data.timer <= 0) {
	// butts.gotoAndStop(1);
} else {
	// butts.gotoAndStop(2);
}
if (goime.data.recordtime == undefined) {
	// recordmm.gotoAndStop(1);
	var recordtime = 100000000000;
} else {
	recordtime = goime.data.recordtime;
	// recordmm.gotoAndStop(2);
	// recordmm.besttext.text = timeToText(recordtime,5);
}
// TODO: Re-add music
// var music = new Sound(_root);
// music.setVolume(100);
var sound = true;
var sp = false;
var qp = false;
var hp = false;
var mp = false;
stop();
onEnterFrame = function() {
	if (Key.isDown(81)) {
		if(!qp)
		{
			if(_quality == "HIGH")
			{
				_quality = "LOW";
			}
			else
			{
				_quality = "HIGH";
			}
		}
		qp = true;
	} else {
		qp = false;
	}
	if (Key.isDown(83)) {
		if (!sp) {
			if (sound) {
				sound = false;
				music.setVolume(0);
			} else {
				sound = true;
				music.setVolume(100);
			}
		}
		sp = true;
	} else {
		sp = false;
	}
};

// Frame 4
function achget(num, con) {
	if (!a[num] && con) {
		a[num] = true;
		doit = true;
		acht++;
		std.push(num);
		completeMapping[acht - 1] = num;
		var _loc1_ = 0;
		while (_loc1_ < acht) {
			completeMapping[_loc1_] = std[_loc1_];
			_loc1_ = _loc1_ + 1;
		}
		var _loc2_ = acht;
		_loc1_ = 0;
		while (_loc1_ < 500) {
			if (!a[swap[_loc1_]]) {
				completeMapping[_loc2_] = swap[_loc1_];
				_loc2_ = _loc2_ + 1;
			}
			_loc1_ = _loc1_ + 1;
		}
		return true;
	}
	return false;
}
function updateLandGuyPosition() {
	if (ending._currentframe < 160) {
		inback._x = land._x = paint._x = - camerax;
		inback._y = land._y = paint._y = - cameray;
		guy._x = realx - camerax;
		guy._y = realy - cameray;
		bg._x = (- camerax) / 2;
		bg._y = (- cameray) / 2;
	}
}
function standingOnLand(offset, type) {
	updateLandGuyPosition();
	if(type == 0)
	{
		return land2.hitTest(realx - GUY_WIDTH,realy + offset,true) || land2.hitTest(realx,realy + offset,true) || land2.hitTest(realx + GUY_WIDTH,realy + offset,true);
	}
	if(type == -1)
	{
		return land2.hitTest(realx - GUY_WIDTH,realy + offset,true) || land2.hitTest(realx,realy + offset,true);
	}
	if(type == 1)
	{
		return land2.hitTest(realx,realy + offset,true) || land2.hitTest(realx + GUY_WIDTH,realy + offset,true);
	}
}
function setAchievementBoard()
{
	var _loc2_ = 1;
	while(_loc2_ <= 12)
	{
		var _loc3_ = completeMapping[2 * (_loc2_ + Math.round(scroller)) - 2];
		if(a[_loc3_])
		{
			_root["b" + _loc2_].gotoAndStop(2);
			achget(470,true);
		}
		else if(hshow)
		{
			_root["b" + _loc2_].gotoAndStop(3);
		}
		else
		{
			_root["b" + _loc2_].gotoAndStop(1);
		}
		_root["b" + _loc2_].box2.gotoAndStop(_loc3_ + 1);
		_root["b" + _loc2_].box3.gotoAndStop(_loc3_ + 1);
		_loc3_ = completeMapping[2 * (_loc2_ + Math.round(scroller)) - 1];
		if(a[_loc3_])
		{
			_root["p" + _loc2_].gotoAndStop(2);
			achget(470,true);
		}
		else if(hshow)
		{
			_root["p" + _loc2_].gotoAndStop(3);
		}
		else
		{
			_root["p" + _loc2_].gotoAndStop(1);
		}
		_root["p" + _loc2_].box2.gotoAndStop(_loc3_ + 1);
		_root["p" + _loc2_].box3.gotoAndStop(_loc3_ + 1);
		_loc2_ = _loc2_ + 1;
	}
	doit = false;
}
function intersectingLand(yOff)
{
	return ghost == 1 && !standingOnLand(yOff,0) && !standingOnLand(yOff - 8,0) && !standingOnLand(yOff - 16,0);
}
function headBangNumber()
{
	var _loc1_ = 1;
	while(_loc1_ <= 13)
	{
		if(land["butt" + _loc1_]._currentframe == 1 || _loc1_ >= 11)
		{
			if(_loc1_ <= 5)
			{
				if(realx > 815 + 100 * _loc1_ && realx < 885 + 100 * _loc1_ && realy > 100 - Math.abs(vy * moveSpeed * 1.25) && realy < 100 + Math.abs(vy * moveSpeed * 1.25))
				{
					if(numon != _loc1_)
					{
						numon = _loc1_;
						paint.num1.text += numon;
						paint.num2.text += numon;
						typings++;
						land["butt" + _loc1_].gotoAndPlay(2);
						if(achget(190 + _loc1_,true))
						{
							keys++;
						}
					}
					ph = true;
				}
			}
			else if(_loc1_ <= 10)
			{
				if(realx > 315 + 100 * _loc1_ && realx < 385 + 100 * _loc1_ && realy > 250 - Math.abs(vy * moveSpeed * 1.25) && realy < 250 + Math.abs(vy * moveSpeed * 1.25))
				{
					if(numon != _loc1_)
					{
						numon = _loc1_;
						if(_loc1_ == 10)
						{
							paint.num1.text += "0";
							paint.num2.text += "0";
							land.butt10.gotoAndPlay(2);
						}
						else
						{
							paint.num1.text += numon;
							paint.num2.text += numon;
							land["butt" + _loc1_].gotoAndPlay(2);
						}
						if(achget(190 + _loc1_,true))
						{
							keys++;
						}
						typings++;
					}
					ph = true;
				}
			}
			else if(realx > -525 + _loc1_ * 75 && realx < -475 + _loc1_ * 75 && realy > -660 && realy < -640)
			{
				if(numon != _loc1_ + 10)
				{
					numon = _loc1_ + 10;
					if(land["pipe" + (_loc1_ - 10)]._currentframe == 1)
					{
						land["pipe" + (_loc1_ - 10)].gotoAndStop(2);
					}
					else
					{
						land["pipe" + (_loc1_ - 10)].gotoAndStop(1);
					}
					land["col" + (_loc1_ - 10)].gotoAndPlay(2);
					paint.ball.gotoAndPlay(2);
					paint.ball.bally.gotoAndStop(land.pipe1._currentframe * 4 + land.pipe2._currentframe * 2 + land.pipe3._currentframe - 6);
					map.paint.gotoAndStop(land.pipe1._currentframe * 4 + land.pipe2._currentframe * 2 + land.pipe3._currentframe - 6);
					achget(109,true);
					changes[_loc1_ - 11] = true;
				}
				ph = true;
			}
		}
		_loc1_ = _loc1_ + 1;
	}
}
function processLeftRightPresses()
{
	shakeTimer++;
	var _loc1_ = 2;
	if(moveSpeed <= 0.5)
	{
		_loc1_ = 0.7;
	}
	if(Key.isDown(37) && guy._y < 512)
	{
		achget(2,true);
		vx -= _loc1_;
		if(vx < 0)
		{
			if(!shakeLeft)
			{
				if(shakeTimer < 10)
				{
					shakeCount++;
				}
				else
				{
					shakeCount = 0;
				}
				shakeTimer = 0;
			}
			shakeLeft = true;
		}
		if(paint.talk2._currentframe == 6)
		{
			paint.guy2.gotoAndPlay(1);
			paint.talk2.gotoAndStop(31);
		}
		achget(313,map._currentframe >= 2);
	}
	if(Key.isDown(39) && guy._y < 512)
	{
		achget(3,true);
		vx += _loc1_;
		if(vx > 0)
		{
			if(shakeLeft)
			{
				if(shakeTimer < 10)
				{
					shakeCount++;
				}
				else
				{
					shakeCount = 0;
				}
				shakeTimer = 0;
			}
			shakeLeft = false;
		}
		if(paint.talk2._currentframe == 6)
		{
			paint.guy2.gotoAndPlay(1);
			paint.talk2.gotoAndStop(31);
		}
		achget(313,map._currentframe >= 2);
	}
	achget(419,shakeCount >= 12 && guy.body._currentframe == 1);
	achget(420,shakeCount >= 12 && guy.body._currentframe == 8);
}
function paintYouColor(colorToBe)
{
	if(achget(99 + colorToBe,true))
	{
		colnum++;
	}
	achget(417,a[100] && a[107]);
	achget(418,a[103] && a[106]);
	achget(421,a[107] && a[106]);
	achget(422,a[102] && a[103]);
	achget(423,a[101] && a[105]);
	achget(424,a[105] && a[104]);
	achget(497,guy.body._currentframe == 7 && colorToBe == 4);
	guy.body.gotoAndStop(colorToBe);
}
function die(wasPink)
{
	achget(30,realx < 620 && realx > 480);
	paint.talk2.gotoAndStop(2);
	achget(143,Math.sqrt(Math.pow(land.starter._x - realx,2) + Math.pow(land.starter._y - realy,2)) > 1600);
	flashy.gotoAndPlay(2);
	if(wasPink)
	{
		achget(391,guy.body._currentframe == 5);
		flashy.white.gotoAndStop(2);
	}
	else
	{
		flashy.white.gotoAndStop(4);
	}
	realx = land.starter._x;
	realy = land.starter._y - 2;
	vy = 0;
	vx = 0;
	deaths++;
	achget(14,true);
	achget(15,true);
	achget(118,guy.body._currentframe != 3);
	timer2 = 0;
	if(ghost == 2)
	{
		ghost = 0;
		guy._alpha = 100;
		achget(94,true);
	}
	achget(403,law);
}
delete onEnterFrame;
var mapgrid = [[false,false,false,true,true,true,true,true,true,false],[false,true,true,true,true,true,true,true,true,false],[false,true,true,true,true,true,true,true,true,false],[false,true,true,true,true,true,true,true,true,false],[false,true,true,true,true,true,true,true,true,false],[true,true,true,true,true,true,true,true,true,true],[true,true,true,true,true,true,true,true,true,true],[true,true,false,true,true,true,true,true,true,true],[true,true,false,false,false,false,false,false,false,false],[true,true,false,false,false,false,false,false,false,false]];
var vx = 0;
var vy = 0;
var ox = 0;
var oy = 0;
var onob = false;
var onoby = false;
var realonob = false;
var pan = false;
var achtold = 5679;
var testscore = 0;
var achesSeen = 0;
var GUY_WIDTH = 7;
var swap = [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,196,76,254,224,469,28,110,395,242,125,310,212,13,86,208,39,305,367,267,181,442,441,429,209,222,387,134,274,189,226,498,203,377,102,386,404,66,32,31,213,78,445,417,107,416,383,244,67,216,354,180,190,440,424,171,373,494,87,88,89,90,91,109,421,418,73,18,438,345,344,121,312,374,460,451,450,298,75,296,35,446,342,341,321,99,100,245,277,449,150,452,175,337,192,413,430,381,9,19,265,131,492,403,467,398,401,230,246,273,388,382,149,166,82,380,432,178,118,261,45,412,308,30,455,456,461,462,465,459,81,210,479,195,223,202,152,26,167,169,168,164,114,22,1,161,104,327,275,120,92,96,414,411,415,94,410,299,262,163,237,250,357,3,361,8,491,165,368,103,42,324,43,496,177,113,234,95,115,393,392,362,340,425,20,21,122,289,290,435,375,427,372,371,128,126,172,282,130,293,129,378,138,184,268,146,25,231,157,478,394,281,269,363,370,284,285,402,464,292,243,400,291,335,241,233,477,434,499,329,258,206,84,422,453,186,214,353,426,143,431,428,270,249,311,315,316,314,320,123,205,276,358,365,328,266,313,6,229,137,34,288,309,350,235,303,44,201,348,369,200,72,433,227,466,278,397,333,379,263,251,111,187,334,420,79,448,155,384,326,145,252,40,211,396,302,188,221,218,220,247,160,255,253,141,140,142,16,436,443,472,306,194,488,339,69,70,68,217,347,15,295,33,17,271,408,485,352,207,85,490,24,139,170,419,407,132,23,176,470,106,112,423,391,366,364,147,359,486,199,101,154,93,437,264,444,325,148,174,283,323,454,153,36,495,29,286,133,236,37,38,457,124,127,156,257,248,27,480,484,483,482,481,476,489,487,471,475,474,355,385,136,14,389,191,0,4,463,11,162,409,193,279,7,338,322,351,119,2,135,182,183,439,98,173,406,151,240,159,225,77,83,74,215,319,317,108,71,318,287,390,41,307,376,12,97,272,116,204,260,259,399,468,117,493,360,179,497,232,144,280,473,239,5,458,80,346,304,294,105,238,197,10,256,332,336,158,330,447,343,356,219,228,331,405,300,297,185,349,301,198];
var completeMapping = new Array(500);
var i = 0;
while(i < 500)
{
	completeMapping[i] = swap[i];
	i++;
}
if(goime.data.timer == undefined || timer <= 0 && timer != undefined)
{
	var testtimes = 0;
	var unlock = 0;
	var a = new Array(500);
	var i = 0;
	while(i < 500)
	{
		a[i] = false;
		i++;
	}
	var fanoo = true;
	var places = new Array(10);
	var i = 0;
	while(i < 10)
	{
		places[i] = new Array(10);
		var j = 0;
		while(j < 10)
		{
			places[i][j] = false;
			j++;
		}
		i++;
	}
	var coins = 0;
	var portals = 0;
	var scroller = 0;
	var timer = 0;
	var timer1 = 0;
	var timer2 = 0;
	var timer3 = 0;
	var timer4 = 0;
	var timer5 = 0;
	var timer6 = 0;
	var timer7 = 0;
	var timer8 = 0;
	var timer9 = 0;
	var timer10 = 0;
	var timer11 = 0;
	var ghosts = 0;
	var acht = 0;
	var deaths = 0;
	var coins2 = 0;
	var hits = 0;
	var typings = 0;
	var changes = [false,false,false];
	var colnum = 1;
	var using = 0;
	var keys = 0;
	var ans = 0;
	var ans2 = 0;
	var times = 0;
	var laps = 0;
	var lamped = [false,false,0];
	var jumps = 0;
	var dista = 0;
	var coincol = new Array(10);
	var i = 0;
	while(i < 10)
	{
		coincol[i] = true;
		i++;
	}
	var bought = [false,false,false,false,false];
	var buyings = 0;
	var i = 1;
	while(i <= 5)
	{
		// land["buyt" + i].gotoAndStop(2);
		// land["buy" + i].gotoAndStop(15);
		i++;
	}
	// guy.body.gotoAndStop(3);
	var std = new Array(0);
}
else
{
	// guy.body.gotoAndStop(goime.data.colored);
	var testtimes = goime.data.testtimes;
	achesSeen = goime.data.achesSeen;
	var unlock = goime.data.unlock;
	var a = new Array(500);
	var i = 0;
	while(i < 500)
	{
		a[i] = goime.data.a[i];
		i++;
	}
	var i = 0;
	while(i < 500)
	{
		completeMapping[i] = goime.data.completeMapping[i];
		i++;
	}
	var i = 0;
	while(i < st)
	{
		completeMapping[i] = goime.data.completeMapping[i];
		i++;
	}
	var fanoo = goime.data.fanoo;
	if(!fanoo)
	{
		paint.fan.gotoAndStop(2);
		land.offoron.gotoAndStop(2);
	}
	var places = new Array(10);
	var i = 0;
	while(i < 10)
	{
		places[i] = new Array(10);
		var j = 0;
		while(j < 10)
		{
			places[i][j] = goime.data.places[i][j];
			j++;
		}
		i++;
	}
	var std = new Array(goime.data.std.length);
	var i = 0;
	while(i < std.length)
	{
		std[i] = goime.data.std[i];
		i++;
	}
	var coins = goime.data.coins;
	var portals = goime.data.portals;
	var scroller = goime.data.scroller;
	var timer = goime.data.timer;
	var timer1 = goime.data.timer1;
	var timer2 = goime.data.timer2;
	var timer3 = goime.data.timer3;
	var timer4 = goime.data.timer4;
	var timer5 = goime.data.timer5;
	var timer6 = goime.data.timer6;
	var timer7 = goime.data.timer7;
	var timer8 = goime.data.timer8;
	var timer9 = goime.data.timer9;
	var timer10 = goime.data.timer10;
	var timer11 = goime.data.timer11;
	var ghosts = goime.data.ghosts;
	var acht = goime.data.acht;
	var deaths = goime.data.deaths;
	var coins2 = goime.data.coins2;
	var hits = goime.data.hits;
	var typings = goime.data.typings;
	var changes = new Array(3);
	var i = 0;
	while(i < 3)
	{
		changes[i] = goime.data.changes[i];
		i++;
	}
	var colnum = goime.data.colnum;
	var using = goime.data.using;
	var keys = goime.data.keys;
	var ans = goime.data.ans;
	var ans2 = goime.data.ans2;
	var times = goime.data.times;
	var laps = goime.data.laps;
	var lamped = new Array(3);
	var i = 0;
	while(i < 3)
	{
		lamped[i] = goime.data.lamped[i];
		i++;
	}
	if(lamped[2] == 3)
	{
		paint.lamp.gotoAndStop(90);
	}
	var jumps = goime.data.jumps;
	var dista = goime.data.dista;
	var coincol = new Array(10);
	var i = 0;
	while(i < 10)
	{
		coincol[i] = goime.data.coincol[i];
		if(!coincol[i])
		{
			inback["coin" + (i + 1)].gotoAndStop(34);
		}
		i++;
	}
	var bought = new Array(5);
	var i = 0;
	while(i < 5)
	{
		bought[i] = goime.data.bought[i];
		i++;
	}
	var buyings = goime.data.buyings;
	var i = 1;
	while(i <= 5)
	{
		if(a[377 + i])
		{
			land["out" + (i + 1)].gotoAndStop(33);
		}
		i++;
	}
	if(a[357])
	{
		land.out1.gotoAndStop(33);
	}
	achget(351,true);
	achget(352,true);
}
// land2._visible = false;
// land.l1left.cacheAsBitmap = true;
// land.l1right.cacheAsBitmap = true;
// bg.cacheAsBitmap = true;
var law = false;
var av = [0,0,0,0,0,0,0];
var i = 1;
while(i <= 10)
{
	// inback["coin" + i].num = i;
	i++;
}
var realx = 10; //land.starter._x
var realy = 10; //land.starter._y - 2
var camerax = 0;
var cameray = 0;
var reset = false;
var portal = false;
var oportal = false;
var dist = [0,0];
var moved = 20;
var coor = [0,0];
var mouse = 0;
var gloop = 0;
var doit = true;
var pers = "0%";
var hshow = false;
var numon = 0;
var numon2 = 0;
var ph = false;
var ghost = 0;
var gp = false;
var talk = false;
var key = 0;
var empt = true;
var prices = [2,3,1,1,3];
var poss = [[4,5,18,4,11,9,10,9,5,5,10,15,9,5,10,19,8,28,25,10,24,26,26,10,13,29,8,8,32,17,9,8,11,37,32,35,40,9,24,9],[5,8,13,5,6,21,11,11,10,11,8,17,16,11,11,27,20,21,22,11,11,25,13,25,10,9,26,31,33,16,21,21,8,11,35,39,41,27,10,21],[7,5,6,7,11,13,5,5,12,12,24,11,16,10,16,30,21,24,22,23,11,8,11,27,24,10,12,42,34,10,11,35,36,38,9,37,11,8,40,32]];
var poss2 = [[4,8,10,6,6,11,6,6,6,6,18,6,4,6,24,22,6,21,13,6,6,6,6,27,6,29,6,6,31,34,6,35,38,38,6,6],[6,9,6,6,17,12,4,4,13,6,6,11,16,6,6,25,20,6,14,30,22,6,4,22,28,29,9,29,31,33,4,36,6,6,6,34],[7,5,6,6,6,9,16,6,15,6,14,6,9,9,19,23,11,6,22,23,6,6,26,6,9,6,27,26,31,6,9,37,33,9,6,9]];
var ori = 0;
var pink = false;
// paint.num1.text = "";
// paint.num2.text = "";
var hint = 0;
// paint.guy.gotoAndStop(1);
var shakeTimer = 0;
var shakeLeft = true;
var shakeCount = 0;
var whipTimer = 0;
var whipCount = 0;
var smallestUnit = 0.2;
var moveSpeed = 1;
var pressedShift = false;
// flashy._visible = true;
// v._x = mask._width = mask2._width = 580;
// guy.ring._visible = false;
var i = 0;
while(i < 5)
{
	// if(bought[i])
	// {
	// 	land["buy" + (i + 1)].gotoAndStop(16);
	// 	land["buyt" + (i + 1)].gotoAndStop(3);
	// }
	// else if(prices[i] > coins2 + 0.5)
	// {
	// 	land["buyt" + (i + 1)].gotoAndStop(2);
	// 	land["buy" + (i + 1)].gotoAndStop(15);
	// }
	// else if(land["buyt" + (i + 1)]._currentframe != 3)
	// {
	// 	land["buyt" + (i + 1)].gotoAndStop(1);
	// 	land["buy" + (i + 1)].gotoAndStop(1);
	// }
	i++;
}
if(bought[4])
{
	paint.eguy.gotoAndPlay(47);
}
var lastMillisCheck = 100; //getTimer()
var framesToAdd = 0;
onMouseDown = function()
{
	updateLandGuyPosition();
	coor[0] = _xmouse;
	coor[1] = _ymouse;
	achget(16,true);
	if(_xmouse >= 974)
	{
		mouse = 3;
	}
	else if(_xmouse >= 580)
	{
		if(_ymouse <= 56 && scroller >= 1)
		{
			achget(20,true);
			mouse = 1;
			scroller--;
			doit = true;
		}
		else if(_ymouse >= 446 && scroller <= 475)
		{
			achget(21,true);
			mouse = 2;
			scroller++;
			doit = true;
		}
		else
		{
			achget(86,true);
		}
	}
	if(Math.sqrt(Math.pow(_xmouse - guy._x,2) + Math.pow(_ymouse - (guy._y - 10),2)) <= 12)
	{
		guy.facey.gotoAndPlay(2);
		achget(35,true);
		achget(120,ghost == 2);
		achget(121,guy.body._currentframe != 3);
	}
};
onMouseUp = function()
{
	achget(19,Math.sqrt(Math.pow(_xmouse - coor[0],2) + Math.pow(_ymouse - coor[1],2)) > 50);
	achget(17,true);
	achget(18,true);
	mouse = 0;
};

// Frame 5
function runGame()
{
	// land._x = 0;
	// land._y = 0;
	if(onob && guy._y < 512)
	{
		if(Key.isDown(32) || Key.isDown(38))
		{
			if(paint.talk2._currentframe == 6)
			{
				paint.guy2.gotoAndPlay(1);
				paint.talk2.gotoAndStop(31);
			}
			vy = -12;
			if(moveSpeed <= 0.5)
			{
				vy = -12.25;
			}
			jumps++;
			if(whipTimer < 11)
			{
				whipCount++;
			}
			else
			{
				whipCount = 0;
			}
			whipTimer = 0;
			onob = false;
			moved = 0;
			if(law && (flashy._currentframe == 1 || flashy._currentframe >= 5))
			{
				achget(427,talk && realx > 1210 && realx < 1365 && realy > 340 && realy < 480);
				achget(490,Math.abs(realy - 850) <= 2 && realx <= -300 && paint.etalk._currentframe >= 2);
				achget(112,realy >= -730 && realy <= -625 && realx >= -180 && realx <= 30);
				achget(298,realx >= 1700 && realx <= 1775 && realy >= -775 && realy <= -690);
				realx = 1730;
				realy = -750;
				flashy.gotoAndPlay(2);
				flashy.white.gotoAndStop(3);
				vy = 0;
				timer9 += 200;
				land2.jail.gotoAndStop(1);
				achget(296,true);
				achget(312,guy.body._currentframe != 3);
			}
			else
			{
				achget(402,realy >= -740 && realy <= -625 && realx >= -180 && realx <= 30 && a[401]);
				achget(401,realy >= -740 && realy <= -625 && realx >= -180 && realx <= 30 && a[400]);
				achget(400,realy >= -740 && realy <= -625 && realx >= -180 && realx <= 30);
			}
		}
		var _loc12_ = 0;
		while(!standingOnLand(- Math.abs(vx * 3),0) && standingOnLand(0,0) && _loc12_ < 40)
		{
			realy -= 0.1;
			_loc12_ = _loc12_ + 1;
		}
	}
	else
	{
		vy += moveSpeed;
	}
	whipTimer++;
	achget(499,whipCount >= 20);
	// achget(313,map._currentframe == 2 && (Key.isDown(37) || Key.isDown(39)) && Math.abs(vx) >= 6);
	// achget(314,realx >= 1700 && realx <= 1775 && realy >= -775 && realy <= -690 && map._currentframe >= 2);
	achget(335,jumps >= 500);
	achget(494,jumps >= 200);
	achget(285,jumps >= 100);
	achget(243,jumps >= 50);
	achget(242,jumps >= 30);
	achget(241,jumps >= 12);
	achget(240,jumps >= 3);
	// if(Key.isDown(71) && !(realx >= 900 && realx <= 1550 && realy >= -1175 && realy <= -925))
	if(false)
	{
		if(!gp)
		{
			if(ghost <= 1)
			{
				if(ori != 3 && guy._alpha == 100)
				{
					ghosts++;
					achget(410,ghosts >= 2);
					achget(411,ghosts >= 3);
					achget(412,ghosts >= 5);
					achget(413,ghosts >= 10);
					achget(414,ghosts >= 15);
					achget(415,ghosts >= 20);
					ghost = 2;
					guy._alpha = 30;
					onob = false;
					achget(92,true);
					achget(119,guy.body._currentframe != 3);
				}
			}
			else
			{
				guy._alpha = 100;
				ghost = 1;
			}
		}
		gp = true;
	}
	else
	{
		gp = false;
	}
	ph = false;
	if(onoby || onob)
	{
		realonob = true;
	}
	else
	{
		realonob = false;
	}
	// headBangNumber();
	achget(111,changes[0] && changes[1] && changes[2]);
	achget(439,a[191] && a[192] && a[193] && a[194] && a[195]);
	achget(440,a[196] && a[197] && a[198] && a[199] && a[200]);
	achget(441,a[191] && a[193] && a[195] && a[197] && a[199]);
	achget(442,a[192] && a[194] && a[196] && a[198] && a[200]);
	achget(443,a[192] && a[193] && a[195] && a[197]);
	achget(444,a[194] && a[199]);
	achget(445,a[191] && a[192] && a[194] && a[198]);
	if(realx > 1415 && realx < 1485 && realy > 90 && realy < 110)
	{
		if(numon != 14)
		{
			numon = 14;
			achget(97,paint.num1.text == "");
			paint.num1.text = "";
			paint.num2.text = "";
			land.butt11.gotoAndPlay(2);
		}
		ph = true;
	}
	if(ph)
	{
		achget(72,numon <= 10);
		achget(73,numon == 14);
	}
	else
	{
		numon = 0;
	}
	onoby = onob;
	var _loc7_ = 0;
	while(_loc7_ >= - Math.max(0.1,vy * framesToAdd))
	{
		if(intersectingLand(_loc7_) && guy._alpha == 100)
		{
			guy._y += _loc7_;
			ghost = 0;
			achget(93,true);
		}
		_loc7_ -= 8;
	}
	// if(ending._currentframe < 160)
	// {
	// 	land.b2b.gotoAndStop(Math.floor(timer % 96) + 1);
	// }
	// else if(ending._currentframe == 160)
	// {
	// 	land.b2b.gotoAndPlay(1);
	// }
	// land2.b2b.gotoAndStop(land.b2b._currentframe);
	// if(land.rp._currentframe >= 2)
	// {
	// 	land.rp.gotoAndStop(land.rp._currentframe + 1);
	// }
	// land2.rp.gotoAndStop(land.rp._currentframe);
	// processLeftRightPresses();
	if(Math.abs(vx) < 0.1)
	{
		vx = 0;
	}
	var _loc11_ = vx * moveSpeed;
	if(_loc11_ > 0)
	{
		_loc7_ = 1;
		while(_loc7_ <= _loc11_)
		{
			increaseX(1);
			_loc7_ = _loc7_ + 1;
		}
		increaseX(_loc11_ % 1);
	}
	else
	{
		_loc7_ = 1;
		while(_loc7_ <= - _loc11_)
		{
			increaseX(-1);
			_loc7_ = _loc7_ + 1;
		}
		// increaseX(- (- _loc11_) % 1);
	}
	vx *= Math.pow(0.8,moveSpeed);
	var _loc10_ = vy * moveSpeed;
	if(_loc10_ > 0)
	{
		_loc7_ = 1;
		while(_loc7_ <= _loc10_)
		{
			// increaseY(1);
			_loc7_ = _loc7_ + 1;
		}
		// increaseY(_loc10_ % 1);
	}
	else
	{
		_loc7_ = 1;
		while(_loc7_ <= - _loc10_)
		{
			increaseY(-1);
			_loc7_ = _loc7_ + 1;
		}
		increaseY(- (- _loc10_) % 1);
	}
	// guy.facey._y += (vy * 0.4 - 10 - guy.facey._y) / 3;
	// guy.facey._x += (vx - guy.facey._x) / 3;
	if(realy - cameray <= 198)
	{
		cameray -= (202 - (realy - cameray)) / 6;
		pan = true;
	}
	if(realy - cameray >= 352)
	{
		cameray -= (348 - (realy - cameray)) / 6;
		pan = true;
	}
	if(realx - camerax <= 278)
	{
		camerax -= (282 - (realx - camerax)) / 6;
		pan = true;
	}
	if(realx - camerax >= 307)
	{
		camerax -= (303 - (realx - camerax)) / 6;
		pan = true;
	}
	achget(114,pan);
	if(realx > -340 && realx < -125 && realy > -60 && realy < 100)
	{
		if(!pink && guy.body._currentframe == 5)
		{
			paint.guy2.gotoAndPlay(1);
			if(bought[3])
			{
				paint.talk2.gotoAndStop(32);
			}
			else
			{
				paint.talk2.gotoAndStop(3);
			}
			achget(404,true);
		}
		pink = true;
	}
	else
	{
		// if(paint.talk2._currentframe != 6 && paint.talk2._currentframe != 31)
		if(false)
		{
			paint.guy2.gotoAndStop(1);
			paint.talk2.gotoAndStop(1);
		}
		pink = false;
	}
	if(pink)
	{
		if(guy.body._currentframe == 5 && ghost == 0)
		{
			achget(144,true);
		}
		else
		{
			if(ghost == 2)
			{
				ghost = 1;
				guy._alpha = 100;
				achget(94,true);
				achget(391,guy.body._currentframe == 5);
			}
			achget(145,true);
			die(true);
		}
	}
	// else if((paint.talk2._currentframe == 6 || paint.talk2._currentframe == 31) && ghost == 0)
	else if(false)
	{
		die(true);
	}
	if(vy >= 37 && (Math.abs(realx - 300) >= 20 || Math.abs(realy - 228) >= 20))
	{
		die(false);
	}
	achget(38,timer2 > 1500);
	achget(37,timer2 > 500);
	achget(39,timer3 >= 50);
	if(mouse == 3)
	{
		achget(22,true);
		scroller += (_ymouse / 2 - 5 - scroller) / 5;
		doit = true;
	}
	achget(44,deaths >= 2);
	achget(45,deaths >= 5);
	_loc7_ = 46;
	while(_loc7_ <= 64)
	{
		achget(_loc7_,acht >= (_loc7_ - 45) * 25);
		_loc7_ = _loc7_ + 1;
	}
	achget(65,acht >= 499);
	if(realx >= 900 && realx <= 1550 && realy >= -1175 && realy <= -925)
	{
		achget(273,true);
		if(ghost == 2)
		{
			ghost = 1;
			guy._alpha = 100;
		}
		timer8 += framesToAdd;
	}
	// paint.jailt.text = timeToText(timer9,3) + "s";
	if(timer9 > 0)
	{
		achget(297,timer9 >= 500);
		achget(299,realx <= 1675 || realx >= 1800 || realy <= -775 || realy >= -690);
		timer9 -= framesToAdd;
		if(timer9 <= 0)
		{
			land2.jail.gotoAndPlay(2);
			achget(300,realx >= 1700 && realx <= 1775 && realy >= -775 && realy <= -700);
			timer9 = 0;
		}
	}
	if(realx < -425 && realx > -850 && realy >= 225 && realy <= 300)
	{
		achget(204,true);
		timer11 += framesToAdd;
		achget(425,timer11 >= 250);
		achget(426,timer11 >= 500);
		achget(428,timer11 >= 1500);
		achget(429,timer11 >= 3000);
	}
	achget(261,realx < -425 && realx > -850 && realy >= 225 && realy <= 300 && guy.body._currentframe != 3);
	achget(166,realx < -425 && realx > -850 && realy > -825 && realy < -50);
	achget(167,realx < -425 && realx > -850 && realy > -350 && realy < -50);
	achget(168,realx < -425 && realx > -850 && realy < -350 && realy > -590);
	achget(169,realx < -425 && realx > -850 && realy < -600 && realy > -840);
	achget(170,realx < -425 && realx > -850 && realy < -850);
	achget(389,realx >= 900 && realx <= 1500 && realy >= 30 && realy <= 302);
	achget(96,realx >= 900 && realx <= 1500 && realy >= 30 && realy <= 302 && ghost == 2);
	// achget(262,guy.body._currentframe == 1 && ghost == 2);
	achget(392,realy > -325 && realy < -70 && realx > 125 && realx < 375 && ghost == 2);
	achget(393,realy < -870 && realx > 50 && realx < 625 && ghost == 2);
	achget(398,realy >= -730 && realy <= -520 && realx >= -180 && realx <= 30 && land.earth._currentframe == 2);
	achget(406,a[167] && a[168] && a[169]);
	if(realx >= 500 && realx <= 725 && realy >= -930 && realy <= -870)
	{
		if(fanoo)
		{
			vx -= 1.3 * moveSpeed;
			if(ghost == 2)
			{
				if(vy > 15)
				{
					vy = 5;
				}
				else if(vy > -2)
				{
					vy -= 3 * moveSpeed;
				}
				else
				{
					vy -= moveSpeed;
				}
			}
			achget(452,true);
			achget(459,ghost == 2);
			if(!Key.isDown(39))
			{
				achget(453,true);
			}
			if(Key.isDown(32) || Key.isDown(38))
			{
				achget(464,true);
			}
			achget(465,vx < -9);
			achget(454,realx >= 575);
		}
		else
		{
			achget(463,true);
		}
	}
	achget(455,realx >= 652 && realx <= 700 && realy >= -900 && realy <= -850);
	achget(460,realx >= 652 && realx <= 700 && realy >= -900 && realy <= -850 && guy.body._currentframe != 3);
	achget(456,realx >= 575 && realx <= 700 && realy >= -802 && realy <= -773);
	achget(461,realx >= 570 && realx <= 605 && realy >= -782 && realy <= -775);
	achget(362,realx <= -540 && realy >= 325 && ghost == 2);
	if(ghost == 2)
	{
		if(realy <= -890)
		{
			if(realx > 865)
			{
				realx = 865;
				vx = 0;
			}
		}
	}
	if(ghost == 2)
	{
		timer6 = 0;
		achget(115,realx < -425 && realx > -850 && realy > -825 && realy < -50);
	}
	// if(paint.test._currentframe == 1)
	// {
	// 	testscore = 0;
	// }
	// if(paint.test._currentframe == 2)
	// {
	// 	paint.test.scoretext.text = "Score: 0/0";
	// }
	// if(paint.test._currentframe == 3)
	// {
	// 	paint.test.scoretext.text = "Score: " + testscore + "/1";
	// }
	// if(paint.test._currentframe == 4)
	// {
	// 	paint.test.scoretext.text = "Score: " + testscore + "/2";
	// }
	// if(paint.test._currentframe == 5 && paint.test.rightwrong._currentframe == 1)
	// {
	// 	paint.test.scoretext.text = "Score: " + testscore + "/3";
	// 	achget(481 + testscore,true);
	// 	achget(480,true);
	// 	if(testtimes >= 2 && testtimes <= 5)
	// 	{
	// 		achget(484 + testtimes,true);
	// 	}
	// 	achget(451,guy.body._currentframe != 3);
	// }
	// if(paint.test._currentframe >= 7)
	// {
	// 	paint.test.scoretext.text = testtimes;
	// }
	if(ghost == 0)
	{
		if(realx >= 1675 && realx <= 1725 && Math.abs(realy - 495) < Math.abs(vy * moveSpeed))
		{
			if(numon2 != 146 && paint.test.rightwrong._currentframe == 1 && land.trueb._currentframe == 1)
			{
				achget(471,true);
				achget(450,guy.body._currentframe != 3);
				land.trueb.gotoAndPlay(2);
				if(paint.test._currentframe == 1)
				{
					paint.test.nextFrame();
					achget(476,true);
					achget(485,testtimes >= 1);
				}
				else if(paint.test._currentframe == 2)
				{
					paint.test.nextFrame();
					paint.test.rightwrong.gotoAndPlay(37);
					achget(474,true);
				}
				else if(paint.test._currentframe == 3)
				{
					paint.test.nextFrame();
					testscore++;
					paint.test.rightwrong.gotoAndPlay(2);
					achget(474,true);
				}
				else if(paint.test._currentframe == 4)
				{
					paint.test.nextFrame();
					if(testtimes == 1)
					{
						testscore++;
						paint.test.rightwrong.gotoAndPlay(2);
					}
					else
					{
						paint.test.rightwrong.gotoAndPlay(37);
					}
					achget(474,true);
					testtimes++;
				}
				else if(paint.test._currentframe == 5)
				{
					paint.test.gotoAndStop(1);
				}
				else if(paint.test._currentframe == 7 || paint.test._currentframe == 8)
				{
					paint.test.gotoAndStop(1);
				}
			}
			numon2 = 146;
		}
		else if(numon2 == 146)
		{
			numon2 = 0;
		}
		if(realx >= 1775 && realx <= 1825 && Math.abs(realy - 495) < Math.abs(vy * moveSpeed))
		{
			if(numon2 != 147 && paint.test.rightwrong._currentframe == 1 && land.falseb._currentframe == 1)
			{
				achget(471,true);
				land.falseb.gotoAndPlay(2);
				achget(450,guy.body._currentframe != 3);
				if(paint.test._currentframe == 1)
				{
					if(testtimes == 1)
					{
						paint.test.gotoAndStop(7);
					}
					else
					{
						paint.test.gotoAndStop(8);
					}
					achget(491,true);
				}
				else if(paint.test._currentframe == 2)
				{
					paint.test.nextFrame();
					testscore++;
					paint.test.rightwrong.gotoAndPlay(2);
					achget(475,true);
				}
				else if(paint.test._currentframe == 3)
				{
					paint.test.nextFrame();
					paint.test.rightwrong.gotoAndPlay(37);
					achget(475,true);
				}
				else if(paint.test._currentframe == 4)
				{
					paint.test.nextFrame();
					if(testtimes != 1)
					{
						testscore++;
						paint.test.rightwrong.gotoAndPlay(2);
					}
					else
					{
						paint.test.rightwrong.gotoAndPlay(37);
					}
					achget(475,true);
					testtimes++;
				}
				else if(paint.test._currentframe == 5)
				{
					paint.test.gotoAndStop(1);
				}
				else if(paint.test._currentframe == 7 || paint.test._currentframe == 8)
				{
					paint.test.gotoAndStop(1);
				}
			}
			numon2 = 147;
		}
		else if(numon2 == 147)
		{
			numon2 = 0;
		}
		if(Math.abs(realy + 830) < 2 && realx >= 540 && realx <= 585)
		{
			if(numon2 != 144)
			{
				land.fanoff.gotoAndPlay(2);
				if(fanoo)
				{
					fanoo = false;
					achget(457,true);
					land.offoron.gotoAndStop(2);
					paint.fan.gotoAndStop(2);
				}
				else
				{
					fanoo = true;
					achget(462,true);
					land.offoron.gotoAndStop(1);
					paint.fan.gotoAndStop(1);
				}
			}
			numon2 = 144;
		}
		else if(numon2 == 144)
		{
			numon2 = 0;
		}
		achget(468,Math.abs(realy + 975) < 2 && realx >= 755 && realx <= 867 && onob);
		if(Math.abs(realy + 830) < 2 && realx >= 590 && realx <= 635)
		{
			if(numon2 != 145)
			{
				if(land.rainbow._currentframe == 1)
				{
					land.rainbow.gotoAndPlay(2);
					achget(458,true);
				}
				land.rp.gotoAndStop(2);
			}
			numon2 = 145;
		}
		else if(numon2 == 145)
		{
			numon2 = 0;
		}
		if(Math.abs(realy - 100) < 2 && realx >= 300 && realx <= 375)
		{
			if(numon2 != 30)
			{
				achget(353,true);
				achget(354,true);
				saved.gotoAndPlay(2);
				land.saved.gotoAndPlay(2);
				goime.data.testtimes = testtimes;
				goime.data.unlock = unlock;
				goime.data.a = new Array(500);
				_loc7_ = 0;
				while(_loc7_ < 500)
				{
					goime.data.a[_loc7_] = a[_loc7_];
					_loc7_ = _loc7_ + 1;
				}
				goime.data.places = new Array(10);
				_loc7_ = 0;
				while(_loc7_ < 10)
				{
					goime.data.places[_loc7_] = new Array(10);
					var _loc5_ = 0;
					while(_loc5_ < 10)
					{
						goime.data.places[_loc7_][_loc5_] = places[_loc7_][_loc5_];
						_loc5_ = _loc5_ + 1;
					}
					_loc7_ = _loc7_ + 1;
				}
				goime.data.fanoo = fanoo;
				goime.data.coins = coins;
				goime.data.portals = portals;
				goime.data.scroller = scroller;
				goime.data.timer = timer;
				goime.data.timer1 = timer1;
				goime.data.timer2 = timer2;
				goime.data.timer3 = timer3;
				goime.data.timer4 = timer4;
				goime.data.timer5 = timer5;
				goime.data.timer6 = timer6;
				goime.data.timer7 = timer7;
				goime.data.timer8 = timer8;
				goime.data.timer9 = timer9;
				goime.data.timer10 = timer10;
				goime.data.timer11 = timer11;
				goime.data.ghosts = ghosts;
				goime.data.acht = acht;
				goime.data.deaths = deaths;
				goime.data.coins2 = coins2;
				goime.data.hits = hits;
				goime.data.typings = typings;
				goime.data.changes = new Array(3);
				_loc7_ = 0;
				while(_loc7_ < 3)
				{
					goime.data.changes[_loc7_] = changes[_loc7_];
					_loc7_ = _loc7_ + 1;
				}
				goime.data.colnum = colnum;
				goime.data.using = using;
				goime.data.keys = keys;
				goime.data.ans = ans;
				goime.data.ans2 = ans2;
				goime.data.times = times;
				goime.data.laps = laps;
				goime.data.lamped = new Array(3);
				goime.data.achesSeen = achesSeen;
				_loc7_ = 0;
				while(_loc7_ < 3)
				{
					goime.data.lamped[_loc7_] = lamped[_loc7_];
					_loc7_ = _loc7_ + 1;
				}
				goime.data.jumps = jumps;
				goime.data.dista = dista;
				goime.data.coincol = new Array(10);
				_loc7_ = 0;
				while(_loc7_ < 10)
				{
					goime.data.coincol[_loc7_] = coincol[_loc7_];
					_loc7_ = _loc7_ + 1;
				}
				goime.data.colored = guy.body._currentframe;
				goime.data.bought = new Array(5);
				_loc7_ = 0;
				while(_loc7_ < 5)
				{
					goime.data.bought[_loc7_] = bought[_loc7_];
					_loc7_ = _loc7_ + 1;
				}
				goime.data.buyings = buyings;
				goime.data.completeMapping = new Array(500);
				_loc7_ = 0;
				while(_loc7_ < 500)
				{
					goime.data.completeMapping[_loc7_] = completeMapping[_loc7_];
					_loc7_ = _loc7_ + 1;
				}
				goime.data.std = new Array(std.length);
				_loc7_ = 0;
				while(_loc7_ < std.length)
				{
					goime.data.std[_loc7_] = std[_loc7_];
					_loc7_ = _loc7_ + 1;
				}
				goime.flush();
			}
			numon2 = 30;
		}
		else if(numon2 == 30)
		{
			numon2 = 0;
		}
		if(Math.abs(realy - 475) <= 4 && realx >= 1520 && realx <= 1605)
		{
			if(numon2 != 31)
			{
				achget(396,true);
				if(land.earth1._currentframe == 1)
				{
					land.earth.gotoAndStop(2);
					land2.earth.gotoAndStop(2);
					land.earth1.gotoAndPlay(2);
					land.earth2.gotoAndPlay(2);
					achget(394,true);
				}
				else if(land.earth1._currentframe == 102)
				{
					land.earth.gotoAndStop(1);
					land2.earth.gotoAndStop(1);
					land.earth1.gotoAndPlay(102);
					land.earth2.gotoAndPlay(2);
					achget(395,true);
				}
			}
			numon2 = 31;
		}
		else if(numon2 == 31)
		{
			numon2 = 0;
		}
		if(Math.abs(realy + 250) <= 2 && realx >= -575 && realx <= -525)
		{
			land.on1.gotoAndPlay(2);
			inback.tub.nextFrame();
			inback.tub.water._visible = true;
			achget(Math.floor((inback.tub._currentframe - 2) / 30 + 263),true);
			achget(269,true);
		}
		else
		{
			// inback.tub.water._visible = false;
		}
		if(Math.abs(realy + 305) <= Math.abs(vy * moveSpeed) && realx >= -650 && realx <= -525)
		{
			achget(270,true);
			achget(271,Math.abs(inback.tub._currentframe - 75) <= 30);
			achget(272,inback.tub._currentframe == 1);
			land.reset1.gotoAndPlay(2);
			if(inback.tub._currentframe <= 152)
			{
				inback.tub.gotoAndPlay(161 - Math.floor(inback.tub._currentframe / 22));
			}
		}
		if(Math.abs(realy + 600) < 5 && realx >= -800 && realx <= -750)
		{
			if(numon2 != 1)
			{
				paint.shower.gotoAndPlay(2);
			}
			numon2 = 1;
			if(paint.shower._currentframe == 1)
			{
				paint.shower.gotoAndPlay(2);
			}
			if(paint.shower._currentframe == 21)
			{
				paint.shower.gotoAndPlay(12);
			}
			achget(179,true);
			achget(177,true);
			achget(180,a[178]);
		}
		else if(numon2 == 1)
		{
			numon2 = 0;
		}
		if(Math.abs(realy + 650) < 5 && realx >= 1470 && realx <= 1530)
		{
			if(numon2 != 8)
			{
				land.yes.gotoAndPlay(2);
				land.nob.gotoAndStop(1);
				land.yesb.gotoAndStop(2);
				law = true;
				achget(291,true);
				achget(293,true);
			}
			numon2 = 8;
		}
		else if(numon2 == 8)
		{
			numon2 = 0;
		}
		if(Math.abs(realy + 650) < 5 && realx >= 1595 && realx <= 1655)
		{
			if(numon2 != 9)
			{
				land.no.gotoAndPlay(2);
				land.nob.gotoAndStop(2);
				land.yesb.gotoAndStop(1);
				law = false;
				timer9 = 0;
				achget(292,true);
				achget(293,true);
			}
			numon2 = 9;
		}
		else if(numon2 == 9)
		{
			numon2 = 0;
		}
		if(Math.abs(realy + 575) < 5 && realx >= 1700 && realx <= 1775)
		{
			if(numon2 != 10)
			{
				timer9 = 0;
				land.clears.gotoAndPlay(2);
				achget(303,true);
			}
			numon2 = 10;
		}
		else if(numon2 == 10)
		{
			numon2 = 0;
		}
		if(Math.abs(realy + 600) < 5 && realx >= -725 && realx <= -675)
		{
			if(numon2 != 2)
			{
				paint.money.gotoAndPlay(2);
			}
			numon2 = 2;
			if(paint.money._currentframe == 1)
			{
				paint.money.gotoAndPlay(2);
			}
			if(paint.money._currentframe == 21)
			{
				paint.money.gotoAndPlay(12);
			}
			achget(178,true);
			achget(179,true);
			achget(180,a[177]);
		}
		else if(numon2 == 2)
		{
			numon2 = 0;
		}
		if(Math.abs(realy + 425) < 5 && realx >= -750 && realx <= -700)
		{
			if(numon2 != 3)
			{
				land.party.gotoAndPlay(2);
				if(paint.party._currentframe == 1)
				{
					paint.party.gotoAndStop(2);
					achget(186,true);
				}
				else if(paint.party._currentframe == 2)
				{
					paint.party.gotoAndStop(1);
					achget(187,true);
				}
			}
			numon2 = 3;
		}
		else if(numon2 == 3)
		{
			numon2 = 0;
		}
		achget(209,a[205] && a[206] && a[207] && a[208]);
		achget(214,a[211] || a[212] || a[213]);
		achget(215,a[211] && a[212] && a[213]);
		if(realy >= 265 && realy <= 280 && realonob)
		{
			if(realx >= -925 && realx <= -875)
			{
				if(numon2 != 4)
				{
					land.menus.gotoAndPlay(2);
					land.arcade.gotoAndStop(1);
					achget(205,true);
				}
				numon2 = 4;
			}
			else if(numon2 == 4)
			{
				numon2 = 0;
			}
			if(realx >= -750 && realx <= -738)
			{
				land.lefts.gotoAndPlay(2);
				achget(206,true);
				numon2 = 5;
				if(land.arcade._currentframe == 1)
				{
					land.arcade.arrowy._x -= 5;
					if(land.arcade.arrowy._x < 22.5)
					{
						land.arcade.arrowy._x = 22.5;
					}
				}
				else if(land.arcade._currentframe == 2)
				{
					av[3] -= 1;
				}
				else if(land.arcade._currentframe >= 5)
				{
					land.arcade.car._x -= land.arcade._currentframe * 2.5 - 10;
					if(land.arcade.car._x < 5)
					{
						land.arcade.car._x = 5;
					}
				}
			}
			else if(numon2 == 5)
			{
				numon2 = 0;
			}
			if(realx >= -687 && realx <= -675)
			{
				land.rights.gotoAndPlay(2);
				achget(207,true);
				numon2 = 6;
				if(land.arcade._currentframe == 1)
				{
					land.arcade.arrowy._x += 5;
					if(land.arcade.arrowy._x > 202.5)
					{
						land.arcade.arrowy._x = 202.5;
					}
				}
				else if(land.arcade._currentframe == 2)
				{
					av[3] += 1;
				}
				else if(land.arcade._currentframe >= 5)
				{
					land.arcade.car._x += land.arcade._currentframe * 2.5 - 10;
					if(land.arcade.car._x > 195)
					{
						land.arcade.car._x = 195;
					}
				}
			}
			else if(numon2 == 6)
			{
				numon2 = 0;
			}
		}
		if(realy >= 240 && realy <= 250 && realx >= -825 && realx <= -600)
		{
			if(numon2 != 7)
			{
				achget(208,true);
				land.action.gotoAndPlay(2);
				if(land.arcade._currentframe == 1)
				{
					if(land.arcade.arrowy._x <= 77.5)
					{
						land.arcade.gotoAndStop(2);
						av[0] = 0;
						av[1] = 0;
						av[2] = 110;
						av[3] = 110;
						av[4] = 110;
						av[5] = 140;
						av[6] = 0;
						achget(211,true);
					}
					else if(land.arcade.arrowy._x <= 147.5)
					{
						land.arcade.gotoAndStop(6);
						av[0] = 30;
						av[1] = 1;
						av[2] = 0;
						av[3] = 18;
						av[6] = 0;
						achget(212,true);
					}
					else
					{
						land.arcade.gotoAndStop(5);
						av[0] = 45;
						av[1] = 95;
						av[2] = 145;
						av[3] = 0.4;
						av[6] = 0;
						achget(213,true);
					}
				}
				else if(land.arcade._currentframe == 6)
				{
					land.arcade.attachMovie("missile","missile" + av[2],av[2],{_x:land.arcade.car._x + 10,_y:155});
					av[2] = av[2] + 1;
					if(av[2] >= 5)
					{
						av[2] = 0;
					}
					achget(228,true);
				}
			}
			numon2 = 7;
		}
		else if(numon2 == 7)
		{
			numon2 = 0;
		}
		achget(237,av[6] >= 1);
		// if(land.arcade._currentframe == 1)
		if(false)
		{
			_loc7_ = 0;
			while(_loc7_ < 6)
			{
				removeMovieClip(land.arcade["missile" + _loc7_]);
				_loc7_ = _loc7_ + 1;
			}
			land.arcade.g1.gotoAndStop(1);
			land.arcade.g2.gotoAndStop(1);
			land.arcade.g3.gotoAndStop(1);
			if(land.arcade.arrowy._x <= 77.5)
			{
				land.arcade.g1.gotoAndStop(2);
			}
			else if(land.arcade.arrowy._x <= 147.5)
			{
				land.arcade.g2.gotoAndStop(2);
			}
			else
			{
				land.arcade.g3.gotoAndStop(2);
			}
			timer7 = 0;
		}
		// else if(land.arcade._currentframe == 2)
		else if(false)
		{
			if(av[1] == 0)
			{
				av[5] -= 1.25;
			}
			else
			{
				av[5] += 1.25;
			}
			av[4] += av[0];
			if(Math.abs(av[5] - 60) < 4 && Math.abs(av[4] - land.arcade.p1._x) <= 14 && av[1] == 0)
			{
				av[1] = 1;
				av[0] = (av[4] - land.arcade.p1._x) / 5 + Math.random() - 0.5;
			}
			timer7 += framesToAdd;
			if(Math.abs(av[5] - 185) < 5 && Math.abs(av[4] - land.arcade.p2._x) <= 17 && av[1] == 1)
			{
				av[1] = 0;
				av[0] = (av[4] - land.arcade.p2._x) / 5 + Math.random() - 0.5;
				achget(216,true);
			}
			achget(217,timer7 >= 400);
			if(Math.random() > 0.5)
			{
				if(land.arcade.p1._x < av[4] - 5)
				{
					av[2] = av[2] + 1;
				}
				else if(land.arcade.p1._x > av[4] + 5)
				{
					av[2]--;
				}
			}
			_loc7_ = 1;
			while(_loc7_ <= 2)
			{
				if(av[_loc7_ + 1] < 95)
				{
					av[_loc7_ + 1] = 95;
				}
				if(av[_loc7_ + 1] > 195)
				{
					av[_loc7_ + 1] = 195;
				}
				land.arcade["p" + _loc7_]._x = Math.round(av[_loc7_ + 1] / 5) * 5;
				_loc7_ = _loc7_ + 1;
			}
			land.arcade.ball._x = Math.round(av[4] / 5) * 5;
			land.arcade.ball._y = Math.round(av[5] / 5) * 5;
			if(av[4] < 85)
			{
				land.arcade["p" + _loc7_]._x = 85;
				av[0] = Math.abs(av[0]) + Math.random() - 0.5;
			}
			if(av[4] > 200)
			{
				land.arcade["p" + _loc7_]._x = 200;
				av[0] = - Math.abs(av[0]) + Math.random() - 0.5;
			}
			if(av[5] < 50)
			{
				reset = true;
				land.arcade.s2.nextFrame();
				if(land.arcade.s2._currentframe == 3)
				{
					av[6] = 2;
					achget(220,true);
					land.arcade.gotoAndStop(3);
				}
				achget(218,true);
			}
			if(av[5] > 195)
			{
				reset = true;
				if(land.arcade.s1._currentframe == 2)
				{
					land.arcade.gotoAndStop(4);
					achget(221,true);
				}
				else
				{
					land.arcade.s1.nextFrame();
				}
				achget(219,true);
			}
			if(reset)
			{
				timer7 = 0;
				av[5] = 120;
				av[4] = 140;
				av[1] = 0;
				av[0] = 0;
				av[2] = 140;
				av[3] = 140;
				reset = false;
			}
			av[6] = land.arcade.s2._currentframe - 1;
		}
		// else if(land.arcade._currentframe == 3)
		else if(false)
		{
			land.arcade.s1.gotoAndStop(av[6] % 10 + 1);
			land.arcade.s2.gotoAndStop(Math.floor(av[6] / 10) + 1);
			achget(238,true);
		}
		// else if(land.arcade._currentframe == 4)
		else if(false)
		{
			land.arcade.s1.gotoAndStop(av[6] % 10 + 1);
			land.arcade.s2.gotoAndStop(Math.floor(av[6] / 10) + 1);
			achget(239,true);
		}
		// else if(land.arcade._currentframe == 5)
		else if(false)
		{
			_loc7_ = 1;
			while(_loc7_ <= 3)
			{
				av[_loc7_ - 1] += av[3];
				if(av[_loc7_ - 1] >= 150)
				{
					av[_loc7_ - 1] -= 150;
					land.arcade["r" + _loc7_]._x = Math.random() * 190 + 5;
					av[6] = av[6] + 1;
					land.arcade.s1.gotoAndStop(av[6] % 10 + 1);
					land.arcade.s2.gotoAndStop(Math.floor(av[6] / 10) + 1);
				}
				land.arcade["r" + _loc7_]._y = Math.round(av[_loc7_ - 1] / 5) * 5;
				if(Math.abs(land.arcade["r" + _loc7_]._x - land.arcade.car._x) <= 20 && Math.abs(land.arcade["r" + _loc7_]._y - land.arcade.car._y) <= 20)
				{
					achget(226,true);
					land.arcade.gotoAndStop(4);
				}
				achget(498,av[6] >= 1 && guy.body._currentframe == 7);
				achget(222,av[6] >= 3);
				achget(223,av[6] >= 5);
				achget(224,av[6] >= 12);
				achget(225,av[6] >= 20);
				_loc7_ = _loc7_ + 1;
			}
			av[3] += 0.002;
		}
		// else if(land.arcade._currentframe == 6)
		else if(false)
		{
			av[0]--;
			land.arcade.s1.gotoAndStop(av[6] % 10 + 1);
			land.arcade.s2.gotoAndStop(Math.floor(av[6] / 10) + 1);
			_loc7_ = 0;
			while(_loc7_ < 6)
			{
				if(land.arcade["missile" + _loc7_]._y <= 0)
				{
					removeMovieClip(land.arcade["missile" + _loc7_]);
				}
				land.arcade["missile" + _loc7_]._y -= 5;
				_loc7_ = _loc7_ + 1;
			}
			achget(233,a[230] && a[231] && a[232]);
			achget(234,av[3] <= 9);
			var _loc6_ = 0;
			while(_loc6_ < 3)
			{
				var _loc4_ = 0;
				while(_loc4_ < 6)
				{
					_loc7_ = 0;
					while(_loc7_ < 6)
					{
						if(land.arcade["missile" + _loc7_]._x >= land.arcade["s" + _loc6_ + _loc4_]._x && land.arcade["missile" + _loc7_]._x <= land.arcade["s" + _loc6_ + _loc4_]._x + 20 && land.arcade["missile" + _loc7_]._y >= land.arcade["s" + _loc6_ + _loc4_]._y - 10 && land.arcade["missile" + _loc7_]._y <= land.arcade["s" + _loc6_ + _loc4_]._y + 20 && land.arcade["missile" + _loc7_]._y != undefined && land.arcade["s" + _loc6_ + _loc4_]._currentframe == 1)
						{
							land.arcade["s" + _loc6_ + _loc4_].gotoAndPlay(2);
							removeMovieClip(land.arcade["missile" + _loc7_]);
							av[3]--;
							av[6] += _loc6_ + 1;
							achget(229,true);
							achget(230 + _loc6_,true);
						}
						_loc7_ = _loc7_ + 1;
					}
					_loc4_ = _loc4_ + 1;
				}
				_loc6_ = _loc6_ + 1;
			}
			if(av[3] == 0)
			{
				_loc7_ = 0;
				while(_loc7_ < 6)
				{
					removeMovieClip(land.arcade["missile" + _loc7_]);
					_loc7_ = _loc7_ + 1;
				}
				achget(235,true);
				land.arcade.gotoAndStop(3);
			}
			if(av[0] <= 0)
			{
				av[0] += av[3];
				if(av[1] == 0)
				{
					if(land.arcade.s00._x <= 5)
					{
						_loc6_ = 0;
						while(_loc6_ < 3)
						{
							_loc4_ = 0;
							while(_loc4_ < 6)
							{
								land.arcade["s" + _loc6_ + _loc4_]._y += 5;
								_loc4_ = _loc4_ + 1;
							}
							_loc6_ = _loc6_ + 1;
						}
						av[1] = 1;
						achget(227,true);
					}
					else
					{
						_loc6_ = 0;
						while(_loc6_ < 3)
						{
							_loc4_ = 0;
							while(_loc4_ < 6)
							{
								land.arcade["s" + _loc6_ + _loc4_]._x -= 5;
								_loc4_ = _loc4_ + 1;
							}
							_loc6_ = _loc6_ + 1;
						}
					}
				}
				else if(land.arcade.s00._x >= 45)
				{
					_loc6_ = 0;
					while(_loc6_ < 3)
					{
						_loc4_ = 0;
						while(_loc4_ < 6)
						{
							land.arcade["s" + _loc6_ + _loc4_]._y += 5;
							_loc4_ = _loc4_ + 1;
						}
						_loc6_ = _loc6_ + 1;
					}
					av[1] = 0;
					achget(227,true);
				}
				else
				{
					_loc6_ = 0;
					while(_loc6_ < 3)
					{
						_loc4_ = 0;
						while(_loc4_ < 6)
						{
							land.arcade["s" + _loc6_ + _loc4_]._x += 5;
							_loc4_ = _loc4_ + 1;
						}
						_loc6_ = _loc6_ + 1;
					}
				}
				_loc6_ = 0;
				while(_loc6_ < 3)
				{
					_loc4_ = 0;
					while(_loc4_ < 6)
					{
						if(land.arcade["s" + _loc6_ + _loc4_]._currentframe == 1 && land.arcade["s" + _loc6_ + _loc4_]._y >= 145)
						{
							_loc7_ = 0;
							while(_loc7_ < 6)
							{
								removeMovieClip(land.arcade["missile" + _loc7_]);
								_loc7_ = _loc7_ + 1;
							}
							achget(236,true);
							land.arcade.gotoAndStop(4);
						}
						_loc4_ = _loc4_ + 1;
					}
					_loc6_ = _loc6_ + 1;
				}
			}
		}
		achget(434,a[435] && a[375]);
		achget(435,a[123] && a[144]);
		achget(430,a[220] && a[235]);
		achget(431,a[221] && a[236] && a[226]);
		achget(397,realy >= -730 && realy <= -625 && realx >= -180 && realx <= 30 && onob);
		achget(399,realy >= -730 && realy <= -625 && realx >= -180 && realx <= 30 && onob && a[395]);
		achget(32,realy < 200);
		achget(33,Math.abs(realy) <= 2 && realx >= 0 && realx <= 50 && onob);
		achget(36,realx < 660 && realx > 590 && Math.abs(realy - 200) < 2 && onob);
		achget(158,realx < 1490 && realx > 1470 && realy > -480 && realy < -470);
		achget(188,realx >= -340 && realx <= -215 && realy >= 110 && realy <= 170);
		achget(279,timer8 >= 150);
		achget(280,timer8 >= 250);
		achget(281,timer8 >= 500);
		achget(274,realx >= 1125 && realx <= 1200 && Math.abs(realy + 925) <= 2);
		if(realx >= 100 && realx <= 250 && Math.abs(realy - 125) <= 2)
		{
			achget(301,true);
			achget(302,law);
		}
		achget(275,realx >= 1310 && realx <= 1390 && Math.abs(realy + 1050) <= 2);
		achget(276,realx >= 1050 && realx <= 1100 && Math.abs(realy + 975) <= 2);
		achget(277,realx >= 900 && realx <= 1025 && Math.abs(realy + 1050) <= 2);
		achget(278,realx >= 950 && realx <= 1025 && Math.abs(realy + 1125) <= 2);
		achget(282,realx >= 1325 && realx <= 1475 && realy >= -1185 && realy <= -1145);
		achget(283,realx >= -775 && realx <= -500 && Math.abs(realy + 975) <= 10);
		achget(165,realx > -850 && realx < -350 && realy > -147 && realy < 0 && onob);
		achget(203,realx < -425 && realx > -850 && realy > -75);
		achget(171,realx > -400 && realx < -100 && realy < -850 && onob);
		achget(172,realx < -870 && realy > -840 && realy < -820);
		achget(34,realy > 300 && realy < 502 && realx > 100 && realx < 225);
		achget(42,realy > -325 && realy < -70 && realx > 125 && realx < 375);
		achget(416,realy > -325 && realy < -70 && realx > 125 && realx < 375 && guy.body._currentframe == 4);
		achget(43,realy < -348 && realy > -360 && realx > 75 && realx < 425);
		achget(87,realy > -252 && realy < -248 && realx >= -235 && realx <= -165);
		achget(95,realy > 20 && realy < 110 && realx >= 1775 && realx <= 1825 && onob);
		achget(361,realx <= -540 && realy >= 325);
		achget(374,realx <= -540 && realy >= 325 && guy.body._currentframe != 3);
		if(realy > -630 && realy < -580 && realx >= 535 && realx <= 635)
		{
			if(realy > -600)
			{
				var _loc13_ = land.pipe1._currentframe * 4 + land.pipe2._currentframe * 2 + land.pipe3._currentframe - 6;
				paintYouColor(_loc13_);
			}
			if(realx < 585)
			{
				vx += 0.4 * moveSpeed;
			}
			else
			{
				vx -= 0.4 * moveSpeed;
			}
		}
		achget(66,realx > 825 && realx < 875 && realy > -80 && realy < -70);
		achget(189,realx > -400 && realx < -300 && realy > -602 && realy < -498);
		achget(67,realx > 765 && realx < 860 && realy > -327 && realy < -298 && onob);
		achget(122,realx >= 860 && realx <= 915 && realy >= 360 && realy <= 390);
		achget(135,realx > 248 && realx < 277 && realy > -803 && realy < -797 && onob);
		achget(136,realy < -870 && realx > 50 && realx < 625 && onob);
		achget(137,realx > 50 && realx < 100 && realy > -1210 && realy < -1170 && onob);
		achget(138,realy < -1245);
		achget(147,realy < -1245 && guy.body._currentframe == 8);
		_loc7_ = 1;
		while(_loc7_ <= 5)
		{
			if(!a[377 + _loc7_] && onob && Math.abs(realy - (475 + 75 * _loc7_)) < 2 && realx >= -1152 && realx <= -1073)
			{
				achget(377 + _loc7_,true);
				if(_loc7_ <= 4)
				{
					land["out" + (_loc7_ + 1)].gotoAndPlay(2);
					land2["out" + (_loc7_ + 1)].gotoAndPlay(2);
				}
			}
			_loc7_ = _loc7_ + 1;
		}
		if(realx > 1350 && realx < 1400 && realy > -155 && realy < -145 && onob)
		{
			achget(148,true);
			if(ori != 1)
			{
				land.rstart.gotoAndPlay(2);
			}
			ori = 1;
		}
		else if(ori == 1)
		{
			ori = 3;
		}
		if(realx > 1275 && realx < 1325 && realy > -310 && realy < -245 && timer6 >= 6)
		{
			achget(149,true);
			if(ori == 3)
			{
				land.rend.gotoAndPlay(2);
				laps++;
				achget(210,timer6 < 350);
				achget(153,timer6 < 300);
				achget(154,timer6 >= 500);
			}
			ori = 2;
		}
		else if(ori == 2)
		{
			ori = 0;
		}
		if(realx <= 1350 && realy >= -180)
		{
			ori = 0;
			timer6 = 0;
		}
		achget(150,laps >= 1);
		achget(151,laps >= 3);
		achget(152,laps >= 5);
		if(ori == 3)
		{
			timer6 += framesToAdd;
		}
		else if(ori == 1)
		{
			timer6 = 0;
		}
		// paint.lapTimer.text = timeToText(timer6,3);
		// if(realx > 1210 && realx < 1365 && realy > 340 && realy < 480 && paint.guy._currentframe != 3)
		if(false)
		{
			if(ghost == 0)
			{
				talk = true;
			}
		}
		else if(realx > 1000 && realx < 1475 && realy > 305)
		{
			if(paint.talk._currentframe >= 3)
			{
				paint.talk.gotoAndStop(2);
				paint.guy.gotoAndPlay(1);
				achget(126,true);
			}
			talk = false;
		}
		else
		{
			// paint.talk.gotoAndStop(1);
			// paint.guy.gotoAndStop(1);
			talk = false;
		}
		if(realonob)
		{
			if(Key.isDown(49))
			{
				if(key != 1)
				{
					if(talk || pink || paint.etalk._currentframe >= 2)
					{
						achget(405,true);
						achget(407,true);
					}
					if(talk)
					{
						paint.guy.gotoAndPlay(1);
						paint.talk.gotoAndStop(poss[0][paint.talk._currentframe - 3]);
						ans++;
						achget(124,true);
					}
					else if(pink)
					{
						if(paint.talk2._currentframe == 6 || paint.talk2._currentframe == 31)
						{
							die(true);
							achget(391,true);
						}
						paint.guy2.gotoAndPlay(1);
						paint.talk2.gotoAndStop(poss2[0][paint.talk2._currentframe - 3]);
						ans++;
						achget(127,true);
					}
					else if(paint.etalk._currentframe == 2)
					{
						paint.etalk.gotoAndStop(3);
					}
					else if(paint.etalk._currentframe >= 3 && paint.etalk._currentframe <= 5)
					{
						paint.etalk.gotoAndPlay(6);
					}
				}
				key = 1;
			}
			else if(Key.isDown(50))
			{
				if(key != 2)
				{
					if(talk || pink || paint.etalk._currentframe >= 2)
					{
						achget(405,true);
						achget(408,true);
					}
					if(talk)
					{
						ans++;
						achget(124,true);
						paint.guy.gotoAndPlay(1);
						paint.talk.gotoAndStop(poss[1][paint.talk._currentframe - 3]);
					}
					else if(pink)
					{
						if(paint.talk2._currentframe == 6 || paint.talk2._currentframe == 31)
						{
							die(true);
							achget(391,true);
						}
						paint.guy2.gotoAndPlay(1);
						paint.talk2.gotoAndStop(poss2[1][paint.talk2._currentframe - 3]);
						ans++;
						achget(127,true);
					}
					else if(paint.etalk._currentframe == 2)
					{
						paint.etalk.gotoAndStop(4);
					}
					else if(paint.etalk._currentframe >= 3 && paint.etalk._currentframe <= 5)
					{
						paint.etalk.gotoAndPlay(6);
					}
				}
				key = 2;
			}
			else if(Key.isDown(51))
			{
				if(key != 3)
				{
					if(talk && paint.talk._currentframe != 11 || pink || paint.etalk._currentframe >= 2)
					{
						achget(405,true);
						achget(409,true);
					}
					if(talk)
					{
						achget(124,true);
						if(paint.talk._currentframe == 12)
						{
							vx = -40;
							achget(495,true);
						}
						else
						{
							if(paint.talk._currentframe == 18)
							{
								achget(496,true);
							}
							ans++;
						}
						paint.guy.gotoAndPlay(1);
						paint.talk.gotoAndStop(poss[2][paint.talk._currentframe - 3]);
					}
					else if(pink)
					{
						if(paint.talk2._currentframe == 6 || paint.talk2._currentframe == 31)
						{
							die(true);
							achget(391,true);
						}
						paint.guy2.gotoAndPlay(1);
						paint.talk2.gotoAndStop(poss2[2][paint.talk2._currentframe - 3]);
						ans++;
						achget(127,true);
					}
					else if(paint.etalk._currentframe == 2)
					{
						paint.etalk.gotoAndStop(5);
						achget(376,true);
					}
					else if(paint.etalk._currentframe >= 3 && paint.etalk._currentframe <= 5)
					{
						paint.etalk.gotoAndPlay(6);
					}
				}
				key = 3;
			}
			else
			{
				key = 0;
			}
		}
		// achget(377,paint.etalk._currentframe == 6);
		// achget(384,paint.talk2._currentframe == 9);
		// achget(146,paint.talk2._currentframe == 6);
		// achget(385,paint.talk2._currentframe == 34);
		// achget(386,paint.talk2._currentframe == 35);
		// achget(387,paint.talk2._currentframe == 36);
		if(talk)
		{
			achget(128,paint.talk._currentframe == 7);
			achget(129,paint.talk._currentframe == 13);
			achget(130,paint.talk._currentframe == 8);
			achget(131,paint.talk._currentframe == 9 || paint.talk._currentframe == 10);
			if(paint.talk._currentframe <= 2)
			{
				if(guy.body._currentframe == 3)
				{
					paint.talk.gotoAndStop(3);
					paint.guy.gotoAndPlay(1);
				}
				else
				{
					paint.talk.gotoAndStop(14);
					paint.guy.gotoAndPlay(1);
					achget(133,true);
				}
				times++;
				achget(404,true);
			}
			achget(123,true);
		}
		achget(125,ans == 30);
		achget(134,times == 2);
		if(realy > -600 && realy <= -520)
		{
			achget(116,realx > 910 && realx < 1050 && onob);
			achget(117,realx > 1210 && realx < 1330 && onob);
		}
	}
	else if(realx > 1210 && realx < 1365 && realy > 340 && realy < 480)
	{
		paint.guy.gotoAndStop(3);
		paint.talk.gotoAndStop(1);
		achget(132,true);
	}
	// if(Key.isDown(16))
	if(false)
	{
		if(!pressedShift)
		{
			if(moveSpeed >= 0.5)
			{
				moveSpeed = 0.3333333333333333;
			}
			else
			{
				moveSpeed = 1;
			}
		}
		pressedShift = true;
	}
	else
	{
		pressedShift = false;
	}
	// guy.ring._visible = moveSpeed <= 0.5;
	achget(113,colnum >= 4);
	achget(108,colnum >= 8);
	// paint.colnum.text = colnum + "/8";
	achget(88,timer5 > 25);
	achget(89,timer5 > 50);
	achget(90,timer5 > 75);
	achget(91,timer5 > 100);
	if(mouse == 0)
	{
		gloop = 0;
	}
	else if(mouse == 1)
	{
		gloop++;
		if(gloop >= 3)
		{
			gloop = 0;
			scroller--;
			doit = true;
		}
	}
	else if(mouse == 2)
	{
		gloop++;
		if(gloop >= 3)
		{
			gloop = 0;
			scroller++;
			doit = true;
		}
	}
	// if(guy._x >= land._x + land.flag._x - 20 && guy._x <= land._x + land.flag._x + 45)
	if(false)
	{
		if(guy._y >= land._y + land.flag._y - 42 && guy._y <= land._y + land.flag._y + 20)
		{
			land.gotoAndStop(land._currentframe + 1);
		}
	}
	if(vy > 40 || vy < -20)
	{
		vy *= 0.8;
	}
	if(onob)
	{
		if(moved == 0)
		{
			moved = 50000;
			achget(5,moved == 50000);
		}
		moved = -1;
	}
	else if(vx != 0)
	{
		moved = 1;
	}
	achget(98,Math.abs(vx) > 7.98);
	achget(99,deaths >= 10);
	achget(492,deaths >= 20);
	achget(350,true);
	achget(0,true);
	achget(1,true);
	achget(102,true);
	achget(4,vy <= -1);
	achget(6,vy <= -1 && vx != 0);
	// achget(7,Key.isDown(65) || Key.isDown(68) || Key.isDown(83) || Key.isDown(87));
	// achget(8,Key.isDown(38));
	// achget(9,Key.isDown(40));
	// achget(10,Key.isDown(32));
	// achget(11,Key.isDown(37) && Key.isDown(39));
	// achget(12,Key.isDown(38) && Key.isDown(40));
	achget(13,vy >= 5);
	achget(29,vy > 30);
	achget(23,a[20] && a[21] && a[22]);
	if(Math.abs(vy) < 4 && vx == 0)
	{
		timer1 += framesToAdd;
	}
	else
	{
		timer1 = 0;
	}
	achget(25,timer1 > 250);
	achget(41,timer4 > 500);
	// boxy.acht.text = acht;
	// boxy.coins2.text = coins2;
	// if(acht / 5 == Math.round(acht / 5))
	if(false)
	{
		boxy.pers.text = Math.round(acht) / 5 + ".0%";
	}
	else
	{
		// boxy.pers.text = Math.round(acht) / 5 + "%";
	}
	// boxy.timerreal.text = timeToText(timer,5);
	if(acht >= 500)
	{
		if(ending._currentframe == 1)
		{
			ending.gotoAndPlay(1);
			map.gotoAndStop(1);
			saved.gotoAndStop(1);
			exit.gotoAndStop(1);
		}
		else if(ending._currentframe >= 160)
		{
			flashy._visible = false;
			v._x = mask._width = mask2._width = 996;
			realy = -1000;
			guy._y = -1000;
			land._xscale = 20;
			land._yscale = 20;
			inback._xscale = 20;
			inback._yscale = 20;
			paint._xscale = 20;
			paint._yscale = 20;
			bg._xscale = 40;
			bg._yscale = 40;
			inback._x = 400;
			inback._y = 280;
			paint._x = 400;
			paint._y = 280;
			land._x = 400;
			land._y = 280;
			bg._x = 265;
			bg._y = 285;
			exitro._x = -1000;
			_loc7_ = 1;
			while(_loc7_ <= 12)
			{
				_root["b" + _loc7_]._x = 1500;
				_root["p" + _loc7_]._x = 1500;
				_loc7_ = _loc7_ + 1;
			}
			a1._x = 1500;
			a2._x = 1500;
			bar._x = 1400;
			bbeh._x = 1450;
			qbut._y = -100;
			mbut._y = -100;
			hbut._y = -100;
			sbut._y = -100;
			boxy._y = -200;
			if(ending._currentframe >= 602)
			{
				gotoAndStop("endingframe");
			}
		}
	}
	else
	{
		timer += framesToAdd;
		// if(Key.isDown(77))
		if(false)
		{
			if(!mp)
			{
				achget(304,true);
				if(map._currentframe == 1)
				{
					map.gotoAndPlay(2);
				}
				else
				{
					map.gotoAndStop(1);
					achget(306,true);
				}
				achget(315,true);
			}
			mp = true;
		}
		else
		{
			mp = false;
		}
		// if(Key.isDown(72))
		if(false)
		{
			if(!hp)
			{
				achget(288,true);
				achget(289,true);
				if(hint == 0)
				{
					hint = 1;
				}
			}
			hp = true;
		}
		else
		{
			hp = false;
		}
	}
	timer2 += framesToAdd;
	if(onob)
	{
		timer3 = 0;
	}
	else
	{
		timer3 += framesToAdd;
	}
	timer4 += framesToAdd;
	if(a[87])
	{
		timer5 += framesToAdd;
	}
	timer10 += framesToAdd;
	achget(390,timer10 > 3000);
	if(std.length > achesSeen)
	{
		_loc7_ = 1;
		while(_loc7_ <= 15)
		{
			// if(_root["ach" + _loc7_]._currentframe == 1)
			if(false)
			{
				doit = true;
				_root["ach" + _loc7_].gotoAndPlay(2);
				_root["ach" + _loc7_].box.gotoAndStop(2);
				_root["ach" + _loc7_].box.box2.gotoAndStop(std[achesSeen] + 1);
				_root["ach" + _loc7_].box.box3.gotoAndStop(std[achesSeen] + 1);
				achesSeen++;
				break;
			}
			_loc7_ = _loc7_ + 1;
		}
		timer4 = 0;
	}
	if(scroller < 0)
	{
		scroller = 0;
	}
	else if(scroller > 238)
	{
		scroller = 238;
	}
	// bar._y = scroller * 2 + 10;
	achget(24,Math.round(scroller) == 238);
	if(ph)
	{
		achget(74,typings >= 20);
		achget(75,paint.num1.text == "12345");
		achget(76,paint.num1.text == "729");
		achget(77,paint.num1.text == "1000000");
		achget(78,paint.num1.text == "1000000000");
		achget(79,paint.num1.text == "314");
		achget(190,paint.num1.text == "99");
		achget(82,paint.num1.text == "404");
		achget(449,paint.num1.text == "360");
	}
	achget(139,_xmouse > 370 && _xmouse < 580 && _ymouse < 72);
	// achget(140,Key.isDown(67) && Key.isDown(89));
	// achget(141,Key.isDown(66) && Key.isDown(83));
	// achget(142,Key.isDown(88) && Key.isDown(90));
	achget(201,keys >= 10);
	achget(202,keys >= 5);
	_loc7_ = 1;
	while(_loc7_ <= 10)
	{
		// if(Math.abs(realx - inback["coin" + _loc7_]._x) < 25 && Math.abs(realy - inback["coin" + _loc7_]._y - 10) < 25 && coincol[_loc7_ - 1])
		if(false)
		{
			coincol[_loc7_ - 1] = false;
			achget(432,!coincol[1] && !coincol[3] && !coincol[5] && !coincol[7] && !coincol[9]);
			achget(433,!coincol[0] && !coincol[2] && !coincol[4] && !coincol[6] && !coincol[8]);
			achget(436,!coincol[1] && !coincol[2] && !coincol[4] && !coincol[6]);
			achget(437,!coincol[3] && !coincol[8]);
			achget(438,!coincol[0] && !coincol[1] && !coincol[3] && !coincol[7]);
			inback["coin" + _loc7_].gotoAndPlay(2);
			coins++;
			coins2++;
			timer10 = 0;
			achget(319 + _loc7_,true);
			achget(330,true);
			achget(331,coins >= 2);
			achget(332,coins >= 5);
			achget(333,coins >= 9);
			achget(334,coins >= 10);
			var _loc2_ = 1;
			while(_loc2_ <= 5)
			{
				if(prices[_loc2_ - 1] > coins2 + 0.5)
				{
					if(land["buy" + _loc2_]._currentframe == 15 || land["buy" + _loc2_]._currentframe == 1)
					{
						land["buyt" + _loc2_].gotoAndStop(2);
						land["buy" + _loc2_].gotoAndStop(15);
					}
				}
				else if(land["buyt" + _loc2_]._currentframe != 3)
				{
					land["buyt" + _loc2_].gotoAndStop(1);
					land["buy" + _loc2_].gotoAndStop(1);
				}
				_loc2_ = _loc2_ + 1;
			}
		}
		_loc7_ = _loc7_ + 1;
	}
	_loc7_ = 1;
	while(_loc7_ <= 5)
	{
		// if(land["buy" + _loc7_]._currentframe == 1 && land["buyt" + _loc7_]._currentframe == 1 && ghost == 0)
		if(false)
		{
			if(Math.abs(realy - (475 + _loc7_ * 75)) <= 2 && realx >= _loc7_ % 2 * 425 - 1025 && realx <= _loc7_ % 2 * 425 - 975)
			{
				if(numon2 != 10 + _loc7_)
				{
					land["buy" + _loc7_].gotoAndStop(16);
					land["buyt" + _loc7_].gotoAndStop(3);
					coins2 -= prices[_loc7_ - 1];
					bought[_loc7_ - 1] = true;
					buyings++;
					achget(362 + buyings,true);
					achget(367 + prices[_loc7_ - 1],true);
					var _loc3_ = 1;
					while(_loc3_ <= 5)
					{
						if(prices[_loc3_ - 1] > coins2 + 0.5 && land["buyt" + _loc3_]._currentframe == 1)
						{
							land["buyt" + _loc3_].gotoAndStop(2);
							land["buy" + _loc3_].gotoAndStop(15);
						}
						else if(land["buyt" + _loc3_]._currentframe != 3 && land["buy" + _loc3_]._currentframe == 1)
						{
							land["buyt" + _loc3_].gotoAndStop(1);
							land["buy" + _loc3_].gotoAndStop(1);
						}
						_loc3_ = _loc3_ + 1;
					}
					if(_loc7_ == 1)
					{
						achget(355,true);
						paint.voice.gotoAndPlay(2);
						achget(404,true);
					}
					if(_loc7_ == 2)
					{
						land.out1.gotoAndPlay(2);
						land2.out1.gotoAndPlay(2);
					}
					achget(373,_loc7_ == 3);
					achget(355 + _loc7_,true);
					if(_loc7_ == 5)
					{
						paint.eguy.gotoAndPlay(2);
					}
				}
				numon2 = 10 + _loc7_;
			}
			else if(numon2 == 10 + _loc7_)
			{
				numon2 = 0;
			}
			if(land["buy" + _loc7_]._currentframe == 1 && land["buyt" + _loc7_]._currentframe == 3)
			{
				land["buy" + _loc7_].gotoAndStop(15);
			}
		}
		_loc7_ = _loc7_ + 1;
	}
	achget(371,bought[1] && bought[3]);
	achget(372,bought[0] && bought[2] && bought[4]);
	if(Math.abs(realy - 850) <= 2 && realx <= -300)
	{
		if(paint.eguy._currentframe == 47 && paint.etalk._currentframe == 1)
		{
			paint.etalk.gotoAndStop(2);
			achget(375,true);
			achget(404,true);
		}
	}
	// else if(paint.etalk._currentframe <= 5)
	else if(false)
	{
		paint.etalk.gotoAndStop(1);
	}
	oportal = portal;
	portal = false;
	_loc7_ = 1;
	while(_loc7_ <= 20)
	{
		// if(Math.sqrt(Math.pow(realx - paint["portal" + _loc7_]._x,2) + Math.pow(realy - paint["portal" + _loc7_]._y - 10,2)) <= 50)
		if(false)
		{
			if(!oportal)
			{
				var _loc9_ = camerax - realx;
				var _loc8_ = cameray - realy;
				if(_loc7_ % 2 == 1)
				{
					realx = paint["portal" + (_loc7_ + 1)]._x;
					realy = paint["portal" + (_loc7_ + 1)]._y;
				}
				else
				{
					realx = paint["portal" + (_loc7_ - 1)]._x;
					realy = paint["portal" + (_loc7_ - 1)]._y;
				}
				camerax = _loc9_ + realx;
				cameray = _loc8_ + realy;
				flashy.gotoAndPlay(2);
				flashy.white.gotoAndStop(4);
				achget(163,ghost == 2);
				achget(164,guy.body._currentframe != 3);
				if(achget(243 + Math.ceil(_loc7_ / 2),true))
				{
					portals++;
				}
				achget(254,portals >= 2);
				achget(255,portals >= 5);
				achget(256,portals >= 10);
				if(_loc7_ == 19)
				{
					vy = Math.min(vy,5);
				}
				using++;
				achget(156,true);
				oportal = true;
			}
			portal = true;
		}
		_loc7_ = _loc7_ + 1;
	}
	achget(157,realx >= 1575 && realx <= 1600 && realy >= 225 && realy <= 275 && vy >= 20);
	lamped[1] = lamped[0];
	lamped[0] = false;
	if(realx >= -510 && realx <= -450 && realy >= -805 && realy <= -725)
	{
		if(!lamped[1])
		{
			lamped[2] = lamped[2] + 1;
			if(lamped[2] == 1)
			{
				paint.lamp.gotoAndPlay(2);
				achget(174,true);
			}
			else if(lamped[2] == 2)
			{
				paint.lamp.gotoAndPlay(2);
				achget(175,true);
			}
			else if(lamped[2] == 3)
			{
				paint.lamp.gotoAndPlay(21);
				achget(176,true);
			}
		}
		lamped[0] = true;
	}
	// if(lamped[2] == 3 && paint.lamp._currentframe <= 20)
	if(false)
	{
		paint.lamp.gotoAndStop(90);
	}
	achget(159,using >= 2);
	achget(160,using >= 5);
	achget(161,using >= 10);
	achget(162,using >= 20);
	achget(257,using >= 30);
	achget(40,timer >= 50);
	achget(26,timer >= 250);
	achget(27,timer >= 500);
	achget(346,timer >= 1400);
	achget(28,timer >= 3000);
	achget(305,a[68] && a[181] && a[288] && a[304]);
	// if(Key.isDown(81))
	if(false)
	{
		if(!qp)
		{
			achget(68,true);
			achget(69,true);
			achget(71,a[70]);
			if(_quality == "HIGH")
			{
				_quality = "LOW";
			}
			else
			{
				_quality = "HIGH";
			}
		}
		qp = true;
	}
	else
	{
		qp = false;
	}
	// if(Key.isDown(83))
	if(false)
	{
		if(!sp)
		{
			if(sound)
			{
				sound = false;
				achget(181,true);
				music.setVolume(0);
			}
			else
			{
				sound = true;
				achget(184,true);
				music.setVolume(100);
			}
			achget(182,true);
		}
		sp = true;
	}
	else
	{
		sp = false;
	}
	achget(317,a[315] && a[316]);
	achget(318,a[182] && a[183]);
	achget(319,a[289] && a[290]);
	if(hint >= 1)
	{
		hint++;
		if(Math.random() > hint / 30 - 4)
		{
			hshow = true;
		}
		else
		{
			hshow = false;
		}
		achget(347,hint >= 50);
		achget(348,hint >= 120);
		if(hint >= 150)
		{
			hint = 0;
			hshow = false;
			achget(349,true);
		}
	}
	if(doit || hint >= 1)
	{
		// setAchievementBoard();
	}
	// if(paint.ball._currentframe == 1)
	if(false)
	{
		paint.gotoAndStop(land.pipe1._currentframe * 4 + land.pipe2._currentframe * 2 + land.pipe3._currentframe - 6);
		if(map._currentframe == 4)
		{
			map.gotoAndPlay(3);
		}
	}
	if(realonob)
	{
		dista += Math.abs(vx);
		achget(258,dista >= 200);
		achget(259,dista >= 1000);
		achget(260,dista >= 2000);
		achget(286,dista >= 4000);
		achget(287,dista >= 10000);
		achget(493,dista >= 20000);
	}
	// if(map._currentframe >= 2)
	if(false)
	{
		map.guy._x = realx * 0.15 + 180;
		map.guy._y = realy * 0.15 + 200;
	}
	if(!places[Math.floor((realy + 1333.33333) / 240)][Math.floor((realx + 1190) / 333.33333)] && mapgrid[Math.floor((realy + 1333.33333) / 240)][Math.floor((realx + 1190) / 333.33333)])
	{
		places[Math.floor((realy + 1333.33333) / 240)][Math.floor((realx + 1190) / 333.33333)] = true;
		unlock++;
		// if(map._currentframe == 4)
		if(false)
		{
			map.gotoAndPlay(3);
		}
	}
	// achget(110,guy.body._currentframe != 3);
	// map.tiles = unlock + "/hmt";
	achget(307,unlock >= 2);
	achget(308,unlock >= 5);
	achget(309,unlock >= 10);
	achget(310,unlock >= 25);
	achget(311,unlock >= 50);
	achget(469,unlock >= 71);
	empt = true;
	_loc7_ = 1;
	while(_loc7_ <= 15)
	{
		// if(_root["ach" + _loc7_]._currentframe >= 2)
		if(false)
		{
			empt = false;
		}
		_loc7_ = _loc7_ + 1;
	}
	achget(388,empt);
	if(coins == 9)
	{
		// inback.cl = "There is 1 coin left to collect.";
	}
	else
	{
		// inback.cl = "There are " + (10 - coins) + " coins left to collect.";
	}
	// achget(80,paint.num1.text == acht);
	// achget(80,paint.num1.text == achtold);
	achget(83,a[75] && a[76] && a[77] && a[78] && a[79] && a[80] && a[82] && a[190] && a[449]);
	achtold = acht;
	// updateLandGuyPosition();
}
function increaseX(amount)
{
	updateLandGuyPosition();
	realx += amount;
	if(ghost == 0)
	{
		if(land2.hitTest(realx + GUY_WIDTH,realy - 10,true))
		{
			vx = (- Math.abs(vx)) / 3;
			var _loc1_ = 0;
			while(land2.hitTest(realx + GUY_WIDTH,realy - 10,true) && _loc1_ < 40)
			{
				realx -= smallestUnit;
				_loc1_ = _loc1_ + 1;
			}
			achget(85,Key.isDown(39));
			achget(173,Key.isDown(39) && realx >= 686 && realx <= 705 && realy >= -930 && realy <= -875);
		}
		if(land2.hitTest(realx - GUY_WIDTH,realy - 10,true))
		{
			vx = Math.abs(vx) / 3;
			_loc1_ = 0;
			while(land2.hitTest(realx - GUY_WIDTH,realy - 10,true) && _loc1_ < 40)
			{
				realx += smallestUnit;
				_loc1_ = _loc1_ + 1;
			}
			achget(84,Key.isDown(37));
		}
	}
}
function increaseY(amount)
{
	updateLandGuyPosition();
	realy += amount;
	if(ghost == 0)
	{
		if(onob)
		{
			vy = 0;
			if(!standingOnLand(smallestUnit,0))
			{
				onob = false;
			}
			else
			{
				var _loc2_ = 0;
				while(standingOnLand(- smallestUnit,0) && _loc2_ < 40)
				{
					realy -= smallestUnit;
					_loc2_ = _loc2_ + 1;
				}
			}
		}
		else if(vy > 0)
		{
			if(standingOnLand(0,0))
			{
				onob = true;
				achget(81,vy > 30);
				vy = 0;
				_loc2_ = 0;
				while(standingOnLand(- smallestUnit,0) && _loc2_ < 40)
				{
					realy -= smallestUnit;
					_loc2_ = _loc2_ + 1;
				}
			}
		}
		else if(vy < 0 && !standingOnLand(0,0) && standingOnLand(-20,0) && ghost == 0)
		{
			achget(284,vy < -11.5);
			vy = Math.abs(vy * 0.4);
			_loc2_ = 0;
			while(standingOnLand(-20,0) && _loc2_ < 40)
			{
				realy += smallestUnit;
				_loc2_ = _loc2_ + 1;
			}
			achget(31,true);
			var _loc1_ = 1;
			while(_loc1_ <= 3)
			{
				if(Math.abs(realy + 380) <= 10 && realx >= -700 + 50 * _loc1_ && realx <= -675 + 50 * _loc1_ && land["block" + _loc1_].square._currentframe == 1)
				{
					if(land["block" + _loc1_]._currentframe == 3)
					{
						land["block" + _loc1_].gotoAndStop(1);
						achget(341,true);
						achget(448,true);
					}
					else
					{
						land["block" + _loc1_].nextFrame();
						achget(446,land["block" + _loc1_]._currentframe == 2);
						achget(447,land["block" + _loc1_]._currentframe == 3);
					}
					land["block" + _loc1_].square.gotoAndPlay(2);
					hits++;
					achget(335 + hits,hits <= 5);
					achget(342,land.block1._currentframe == 2 && land.block2._currentframe == 2 && land.block3._currentframe == 2);
					achget(343,land.block1._currentframe == 3 && land.block2._currentframe == 3 && land.block3._currentframe == 3);
					achget(344,land.block1._currentframe != land.block2._currentframe && land.block1._currentframe != land.block3._currentframe && land.block2._currentframe != land.block3._currentframe);
					achget(345,a[342] && a[343] && a[344] && a[341]);
				}
				_loc1_ = _loc1_ + 1;
			}
		}
	}
}
var currentMillisCheck = 11; // getTimer()
framesToAdd = (currentMillisCheck - lastMillisCheck) / 20;
var reps = Math.floor(currentMillisCheck / 20) - Math.floor(lastMillisCheck / 20);
reps = Math.min(reps,3);
lastMillisCheck = currentMillisCheck;
// runGame();
framesToAdd = 0;
var t = 1;
// while(t < reps)
// {
// 	runGame();
// 	t++;
// }

// Frame 6
// gotoAndStop("gp");
// play();

// Frame 8
// timetext.text = timeToText(timer,5);
if(timer <= recordtime)
{
	recordtime = timer;
	goime.data.recordtime = recordtime;
	// goime.flush();
}
// besttext.text = timeToText(recordtime,5);
