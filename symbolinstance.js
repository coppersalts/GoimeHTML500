// Mock Flash objects

// MovieClip instance
class SymbolInstance {
	// constructor(instanceOf, startX, startY, onFrameOfParent, scale = [1,1], layer = 1) {
	constructor(args = {}) {
		this._currentframe = 1;
		this._visible = true;
		this._x = args.x;
		this._y = args.y;
		this.scaleX = ('scale' in args)?args.scale[0]:1;
		this.scaleY = ('scale' in args)?args.scale[1]:1;
		this.rotation = ('rot' in args)?args.rot:0;
		this._alpha = 100;
		this.cacheAsBitmap = false;

		this.instanceOf = args.sym;
		this.playing = !symbols[this.instanceOf].stopAtFirstFrame; // remember to default this to true
		this.onFrameOfParent = ('ofop' in args)?args.ofop:[1];
		// this.parent = '_root';
		this.color = [Math.random()*255,Math.random()*255,Math.random()*255];
		// this.drawingLayer = ('lyr' in args)?args.lyr:1;

		Object.keys(symbols[this.instanceOf].children).forEach(instanceName => this[instanceName] = symbols[this.instanceOf].children[instanceName]);
		this.instanceHasAlreadyBeenDrawnThisFrame = false;
	}
	
	gotoAndStop(newFrame) {
		this.playing = false;
		this.setFrame(newFrame, true);
	}
	
	nextFrame() {
		this.setFrame(this._currentframe+1);
	}
	
	gotoAndPlay(newFrame) {
		this.playing = true;
		this.setFrame(newFrame, true);
	}

	setFrame(newFrame, changeColor = false) {
		Object.keys(symbols[this.instanceOf].children).forEach(child => {
			// console.log(child);
			if (symbols[this.instanceOf].children[child].onFrameOfParent && // Make sure it's not dynamic text
				symbols[this.instanceOf].children[child].onFrameOfParent.includes(newFrame) &&
				!symbols[this.instanceOf].children[child].onFrameOfParent.includes(this._currentframe) &&
				!symbols[symbols[this.instanceOf].children[child].instanceOf].stopAtFirstFrame) {
				symbols[this.instanceOf].children[child].gotoAndPlay(1);
			}
			// stopAtFirstFrame
		});

		if (this._currentframe !== newFrame) {
			if (changeColor) this.color = [Math.random()*255,Math.random()*255,Math.random()*255];

			// Set opacity if needed.
			if (symbols[this.instanceOf].opacityChanges.length > 0) {
				let i = 0;
				let frameTotal = 0;
				while (i*2 < symbols[this.instanceOf].opacityChanges.length) {
					frameTotal += symbols[this.instanceOf].opacityChanges[i*2+1];
					if (frameTotal >= this._currentframe) break;
					i++;
				}
				if (i*2 >= symbols[this.instanceOf].opacityChanges.length) i = symbols[this.instanceOf].opacityChanges.length/2-1;
				if (i < 0) i = 0;
				this._alpha = symbols[this.instanceOf].opacityChanges[i*2];
			}
		}
		this._currentframe = newFrame;
		if (this._currentframe === 1 && symbols[this.instanceOf].stopAtFirstFrame) this.playing = false;
		if (this._currentframe === symbols[this.instanceOf]._totalframes && symbols[this.instanceOf].stopAtLastFrame) this.playing = false;
	}
	
	hitTest(x,y,shapeFlag) {
		if (this.instanceOf === 'sym370') {
			if (osctx2.getImageData(Math.floor((x+1150) * collisionMapPixelRatio), Math.floor((y+1250) * collisionMapPixelRatio), 1, 1).data[3] > 0) return true;
			else if (osctx1.getImageData(Math.floor((x+1150)), Math.floor((y+1250)), 1, 1).data[3] > 0) return true;
			else return false;
		} else {
			return false;
		}
	}

	attachMovie(symbol, instanceName, depth, initObject) {
		// console.log('adding');
		symbols[this.instanceOf].addChild({sym:symbol,name:instanceName,x:initObject._x,y:initObject._y,ofop:initObject.ofop});
	}

	removeMovieClip(name) {
		if (name in this) {
			delete this[name];
			delete symbols[this.instanceOf][name];
			delete symbols[this.instanceOf].children[name];
		}
	}

	resetForNewFrame() {
		this.instanceHasAlreadyBeenDrawnThisFrame = false;
		Object.keys(symbols[this.instanceOf].children).forEach(child => {
			if (this[child].show && this[child].onFrameOfParent.includes(this._currentframe)) this[child].resetForNewFrame();
		});
	}

	resetToFrame1() {
		this._currentframe = 1;
		this.playing = !symbols[this.instanceOf].stopAtFirstFrame;
	}

	show(context,bypass=false,alphaBypass=false) {
		// if (uhhhtest) console.log(this._x);
		// if (this._visible) {
		context.save();
		if (!alphaBypass) context.globalAlpha = context.globalAlpha * (this._alpha/100.0);
		context.fillStyle = 'rgb('+this.color[0]+','+this.color[1]+','+this.color[2]+')';
		context.translate(this._x, this._y);
		context.scale(this.scaleX, this.scaleY);
		context.rotate(this.rotation);
		// if (this.instanceOf === 'sym370') {
		// 	ctx.globalAlpha = 0.03;
		// 	ctx.drawImage(collisionMap, -camerax-1076, -cameray-1251);
		// 	// ctx.drawImage(osc1, -camerax-1076, -cameray-1251);
		// 	// console.log('gjhk');
		// } else {

		if (this._visible || bypass) {
			if (symbols[this.instanceOf].visualType === 'image' || symbols[this.instanceOf].visualType === 'imgseq') {
				let bb = symbols[this.instanceOf].boundingBox;
				// ctx.drawImage(images[symbols[this.instanceOf].name + 'f' + this._currentframe + '.png'], bb[0], bb[1], bb[2], bb[3]);
				// let imageName = symbols[this.instanceOf].name + 'f' + ((symbols[this.instanceOf].visualType === 'imgseq')?:this._currentframe) + '.png';
				let frameNumberInFilename;
				if (symbols[this.instanceOf].visualType === 'imgseq') {
					let i = 0;
					let frameTotal = 0;
					while (i*2 < symbols[this.instanceOf].imageSequence.length) {
						frameTotal += symbols[this.instanceOf].imageSequence[i*2+1];
						if (frameTotal >= this._currentframe) {
							// i--;
							break;
						}
						i++;
					}
					if (i*2 >= symbols[this.instanceOf].imageSequence.length) i = symbols[this.instanceOf].imageSequence.length/2-1;
					if (i < 0) i = 0;
					frameNumberInFilename = symbols[this.instanceOf].imageSequence[i*2];
					// if (frameNumberInFilename > symbols[this.instanceOf].uniqueFrames) frameNumberInFilename = symbols[this.instanceOf].uniqueFrames;
					// if (frameNumberInFilename < 1) frameNumberInFilename = 1;
				} else frameNumberInFilename = this._currentframe;

				// Only draw an image if we're not on a blank frame.
				if (!symbols[this.instanceOf].blankFrames.includes(frameNumberInFilename))
					context.drawImage(images[symbols[this.instanceOf].name + 'f' + frameNumberInFilename + '.png'], bb[0], bb[1], bb[2], bb[3]);
			} else if (!symbols[this.instanceOf].blankFrames.includes(this._currentframe)) {
				if (symbols[this.instanceOf].visualType === 'nospecial') {
				} else if (symbols[this.instanceOf].visualType === 'colorrect') {
					let bb = symbols[this.instanceOf].boundingBox;
					context.fillStyle = '#' + symbols[this.instanceOf].rectColors[this._currentframe-1];
					context.fillRect(bb[0], bb[1], bb[2], bb[3]);
				} else {
					let bb = symbols[this.instanceOf].boundingBox;
					context.fillRect(bb[0], bb[1], bb[2], bb[3]);
				}
			}
		}
		// }

		if (this._visible || bypass) {
			Object.keys(symbols[this.instanceOf].children).forEach(child => {
				if (this[child].show && this[child].onFrameOfParent.includes(this._currentframe)) this[child].show(context,bypass,alphaBypass);
				// if (symbols[this.instanceOf].children[child].show) symbols[this.instanceOf].children[child].show();
			});
		}
		context.restore();

		// While we're here we might as well run a bit of logic for the MovieClip we'll want to do anyway.
		// I could've put this in its own function, but whatever.
		if (!this.instanceHasAlreadyBeenDrawnThisFrame) {
			// A few symbols' custom scripts. Kinda hacky to put it here.
			if (this.instanceOf === 'sym356' && this._currentframe === 14) {
				// button
				if (this._x <= -500 && this._y >= 500) this.gotoAndStop(16);
				this.gotoAndStop(1);
			} else if (this.instanceOf === 'sym407' && this._currentframe === 2) {
				// guy
				this.playing = false;
			} else if (this.instanceOf === 'sym340' && this._currentframe === 102) {
				// earth1
				this.playing = false;
			} else if (this.instanceOf === 'sym196' && this._currentframe === 153) {
				// tub
				this.gotoAndPlay(152);
			} else if (this.instanceOf === 'sym415') {
				// fan
				if (this._currentframe === 1 && random() > 0.8) this.gotoAndPlay(1);
				else if (this._currentframe === 4 && random() > 0.6) this.gotoAndPlay(2);
			} else if (this.instanceOf === 'sym664') {
				// rightwrong (test)
				if (this._currentframe === 2) achget(472,true);
				else if (this._currentframe === 36) this.gotoAndStop(1);
				else if (this._currentframe === 37) achget(473,true);
			} else if (this.instanceOf === 'sym620') {
				// shower
				if (this._currentframe === 12) {
					if (Math.abs(realx + 775) < 15 && realy < -580) paintYouColor(3);
				} else if (this._currentframe === 24) achget(185,true);
			} else if (this.instanceOf === 'sym638') {
				// money
				if (this._currentframe === 12) {
					if (Math.abs(realx + 700) < 15 && realy < -580) {
						paintYouColor(4);
						if (achget(103,true)) colnum++;
					}
				} else if (this._currentframe === 24) achget(185,true);
			} else if (this.instanceOf === 'sym223') {
				// rainbow
				if (this._currentframe === 2) achget(466,true);
				else if (this._currentframe === 421) achget(467,true);
				else if (this._currentframe === 443) this.gotoAndStop(1);
			} else if (this.instanceOf === 'sym679') {
				// test
				if (this._currentframe === 3) achget(477,true);
				else if (this._currentframe === 4) achget(478,true);
				else if (this._currentframe === 5) achget(479,true);
			} else if (this.instanceOf === 'sym728' && this._currentframe === 2) {
				// flashy
				achget(383,true);
			} else if (this.instanceOf === 'sym727') {
				// white
				if (this._currentframe === 2) achget(155,true);
				else if (this._currentframe === 3) achget(295,true);
				else if (this._currentframe === 4) achget(294,true);
			} else if (this.instanceOf === 'sym1800') {
				// exit
				if (this._currentframe === 52) this.playing = false;
			}
			if (this.instanceOf === 'sym1795' || this.instanceOf === 'sym1798') {
				this._visible = exit._currentframe == 52;
			}

			if (symbols[this.instanceOf].isButton) {
				let bb = symbols[this.instanceOf].boundingBox;
				if (onRect(_xmouse, _ymouse, bb[0] + this._x, bb[1] + this._y, bb[2], bb[3])) {
					mouseOver = true;
				}
				if (pmouseIsDown && !mouseIsDown && onRect(lastClickX, lastClickY, bb[0] + this._x, bb[1] + this._y, bb[2], bb[3])) {
					symbols[this.instanceOf].onRelease();
				}
			} else if (!(this._currentframe === symbols[this.instanceOf]._totalframes && symbols[this.instanceOf].stopAtLastFrame)) {
				if (this.playing) this.nextFrame();
				if (this._currentframe > symbols[this.instanceOf]._totalframes) this.setFrame(1);
			}
		}
		this.instanceHasAlreadyBeenDrawnThisFrame = true;
	}

	addChild(childInfo) {
		this[childInfo.name] = new SymbolInstance(childInfo);
	}

	addChildren(childrenInfo) {
		for (var i = 0; i < childrenInfo.length; i++) {
			this.addChild(childrenInfo[i]);
		}
	}
}

class DynamicText {
	constructor() {
		this.text = '';
	}
}

class FlashSymbol {
	constructor(name, visualsInfo = {}) {
		this.name = name;
		this.instances = [];
		this.children = {};

		// I will be abbreviating these if it kills me.
		if ('bb' in visualsInfo) this.boundingBox = visualsInfo.bb;
		else this.boundingBox = [0,0,10,10]; // Default if undefined
		if ('tf' in visualsInfo) this._totalframes = visualsInfo.tf;
		else this._totalframes = 20; // I need to remember to change this default to 1 later.
		if ('saff' in visualsInfo) this.stopAtFirstFrame = visualsInfo.saff;
		else this.stopAtFirstFrame = true; // I need to remember to change this default to false later.
		if ('salf' in visualsInfo) this.stopAtLastFrame = visualsInfo.salf;
		else this.stopAtLastFrame = false;
		if ('type' in visualsInfo) this.visualType = visualsInfo.type;
		else this.visualType = 'none';
		if ('bf' in visualsInfo) this.blankFrames = visualsInfo.bf;
		else this.blankFrames = [];
		if ('oc' in visualsInfo) this.opacityChanges = visualsInfo.oc;
		else this.opacityChanges = [];
		if ('butt' in visualsInfo) this.isButton = visualsInfo.butt; // hehe [USER WAS BANNED FOR THIS COMMENT]
		else this.isButton = false;
		if (this.isButton && 'onRelease' in visualsInfo) this.onRelease = visualsInfo.onRelease;
		else this.onRelease = function() {};

		if (this.visualType === 'image') {
			for (var f = 1; f <= this._totalframes; f++) {
				if (!this.blankFrames.includes(f)) images[this.name + 'f' + f + '.png'] = null;
			}
		} else if (this.visualType === 'imgseq') {
			for (var f = 1; f <= visualsInfo.uf; f++) {
				images[this.name + 'f' + f + '.png'] = null;
			}
			this.imageSequence = visualsInfo.imgseq;
			this.uniqueFrames = visualsInfo.uf;
		} else if (this.visualType === 'colorrect') {
			for (var f = 1; f <= this._totalframes; f++) {
				this.rectColors = visualsInfo.rc;
			}
		}
	}

	addChild(childInfo) {
		// this.children[childInfo.name] = new SymbolInstance(childInfo.sym, childInfo.x, childInfo.y, ('ofop' in childInfo)?childInfo.ofop:[1], ('scale' in childInfo)?childInfo.scale:[1,1]);
		this.children[childInfo.name] = new SymbolInstance(childInfo);
		this[childInfo.name] = this.children[childInfo.name];
		this.instances.forEach(instance => instance[childInfo.name] = this.children[childInfo.name]);
		symbols[childInfo.sym].instances.push(this.children[childInfo.name]);
	}

	addChildren(childrenInfo) {
		for (var i = 0; i < childrenInfo.length; i++) {
			this.addChild(childrenInfo[i]);
		}
	}

	// addSimilarChildren(childrenInfo, instanceOf) {
	// 	for (var i = 0; i < childrenInfo.length; i++) {
	// 		this.addChild({name: childrenInfo[i].name, sym: instanceOf, x: childrenInfo[i].x, y: childrenInfo[i].y});
	// 	}
	// }

	addDynamicText(name) {
		// this[name] = new DynamicText();
		this.children[name] = new DynamicText();
		this.instances.forEach(instance => instance[name] = this.children[name]);
		// symbols[childInfo.sym].instances.push(this.children[childInfo.name]);
		this[name] = this.children[name];
	}

	addDynamicTextChildren(names) {
		for (var i = 0; i < names.length; i++) {
			this.addDynamicText(names[i]);
		}
	}
}