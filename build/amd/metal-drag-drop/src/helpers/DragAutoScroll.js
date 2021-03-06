'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(['exports', 'metal/src/core', 'metal/src/attribute/Attribute', 'metal-position/src/Position'], function (exports, _core, _Attribute2, _Position) {
	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _core2 = _interopRequireDefault(_core);

	var _Attribute3 = _interopRequireDefault(_Attribute2);

	var _Position2 = _interopRequireDefault(_Position);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = (function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	})();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	var _get = function get(object, property, receiver) {
		if (object === null) object = Function.prototype;
		var desc = Object.getOwnPropertyDescriptor(object, property);

		if (desc === undefined) {
			var parent = Object.getPrototypeOf(object);

			if (parent === null) {
				return undefined;
			} else {
				return get(parent, property, receiver);
			}
		} else if ("value" in desc) {
			return desc.value;
		} else {
			var getter = desc.get;

			if (getter === undefined) {
				return undefined;
			}

			return getter.call(receiver);
		}
	};

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var DragAutoScroll = (function (_Attribute) {
		_inherits(DragAutoScroll, _Attribute);

		function DragAutoScroll(opt_config) {
			_classCallCheck(this, DragAutoScroll);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DragAutoScroll).call(this, opt_config));

			_this.scrollTimeout_ = null;
			return _this;
		}

		_createClass(DragAutoScroll, [{
			key: 'disposeInternal',
			value: function disposeInternal() {
				_get(Object.getPrototypeOf(DragAutoScroll.prototype), 'disposeInternal', this).call(this);

				this.stop();
			}
		}, {
			key: 'getRegionWithoutScroll_',
			value: function getRegionWithoutScroll_(scrollContainer) {
				if (_core2.default.isDocument(scrollContainer)) {
					var height = window.innerHeight;
					var width = window.innerWidth;
					return _Position2.default.makeRegion(height, height, 0, width, 0, width);
				} else {
					return _Position2.default.getRegion(scrollContainer);
				}
			}
		}, {
			key: 'scroll',
			value: function scroll(scrollContainers, mouseX, mouseY) {
				this.stop();
				this.scrollTimeout_ = setTimeout(this.scrollInternal_.bind(this, scrollContainers, mouseX, mouseY), this.delay);
			}
		}, {
			key: 'scrollElement_',
			value: function scrollElement_(element, deltaX, deltaY) {
				if (_core2.default.isDocument(element)) {
					window.scrollBy(deltaX, deltaY);
				} else {
					element.scrollTop += deltaY;
					element.scrollLeft += deltaX;
				}
			}
		}, {
			key: 'scrollInternal_',
			value: function scrollInternal_(scrollContainers, mouseX, mouseY) {
				for (var i = 0; i < scrollContainers.length; i++) {
					var scrollRegion = this.getRegionWithoutScroll_(scrollContainers[i]);

					if (!_Position2.default.pointInsideRegion(mouseX, mouseY, scrollRegion)) {
						continue;
					}

					var deltaX = 0;
					var deltaY = 0;

					var scrollTop = _Position2.default.getScrollTop(scrollContainers[i]);

					var scrollLeft = _Position2.default.getScrollLeft(scrollContainers[i]);

					if (scrollLeft > 0 && Math.abs(mouseX - scrollRegion.left) <= this.maxDistance) {
						deltaX -= this.speed;
					} else if (Math.abs(mouseX - scrollRegion.right) <= this.maxDistance) {
						deltaX += this.speed;
					}

					if (scrollTop > 0 && Math.abs(mouseY - scrollRegion.top) <= this.maxDistance) {
						deltaY -= this.speed;
					} else if (Math.abs(mouseY - scrollRegion.bottom) <= this.maxDistance) {
						deltaY += this.speed;
					}

					if (deltaX || deltaY) {
						this.scrollElement_(scrollContainers[i], deltaX, deltaY);
						this.scroll(scrollContainers, mouseX, mouseY);
						break;
					}
				}
			}
		}, {
			key: 'stop',
			value: function stop() {
				clearTimeout(this.scrollTimeout_);
			}
		}]);

		return DragAutoScroll;
	})(_Attribute3.default);

	DragAutoScroll.ATTRS = {
		delay: {
			validator: _core2.default.isNumber,
			value: 50
		},
		maxDistance: {
			validator: _core2.default.isNumber,
			value: 20
		},
		speed: {
			validator: _core2.default.isNumber,
			value: 20
		}
	};
	exports.default = DragAutoScroll;
});
//# sourceMappingURL=DragAutoScroll.js.map