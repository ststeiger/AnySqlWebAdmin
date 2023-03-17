"use strict";
L.SVG.include({
    _updateCurve: function (layer) {
        var svg_path = this._curvePointsToPath(layer._points);
        this._setPath(layer, svg_path);
        if (layer.options.animate) {
            var path = layer._path;
            var length_1 = path.getTotalLength();
            if (!layer.options.dashArray) {
                path.style.strokeDasharray = "".concat(length_1, " ").concat(length_1);
            }
            if (layer._initialUpdate) {
                path.animate([
                    { strokeDashoffset: length_1 },
                    { strokeDashoffset: 0 },
                ], layer.options.animate);
                layer._initialUpdate = false;
            }
        }
        return svg_path;
    },
    _curvePointsToPath: function (points) {
        var point;
        var curCommand;
        var str = '';
        for (var i = 0; i < points.length; i++) {
            point = points[i];
            if (typeof point === 'string' || point instanceof String) {
                curCommand = point;
                str += curCommand;
            }
            else {
                str += "".concat(point.x, ",").concat(point.y, " ");
            }
        }
        return str || 'M0 0';
    },
});
var Bezier = L.Path.extend({
    options: {},
    initialize: function (path, icon, options) {
        if (!path.mid || path.mid[0] === undefined) {
            path.mid = this.getMidPoint(path.from, path.to, (path.from.deep ? path.from.deep : 4), path.from.slide);
        }
        L.setOptions(this, options);
        this._initialUpdate = true;
        this.setPath(path);
        this.icon = icon;
    },
    onAdd: function (map) {
        this._renderer._initPath(this);
        this._reset();
        this._renderer._addPath(this);
        // TODO adjust plane according to zoom
        map.on('zoom', function () {
        });
    },
    onRemove: function () {
        if (this.spaceship_img) {
            this.spaceship_img.remove();
        }
        this._renderer._removePath(this);
    },
    setAnimatePlane: function (path) {
        var self = this;
        if (this.spaceship_img) {
            this.spaceship_img.remove();
        }
        var SnapSvg = Snap('.leaflet-overlay-pane>svg');
        var spaceship_img = this.spaceship_img = SnapSvg.image(this.icon.path).attr({
            visibility: 'hidden',
        });
        var spaceship = SnapSvg.group(spaceship_img);
        var flightPath = SnapSvg.path(path).attr({
            fill: 'none',
            stroke: 'none',
        });
        var fullPathLength = Snap.path.getTotalLength(flightPath);
        var destinationPathLength = fullPathLength / 2; // default half
        if (this.options.iconTravelLength && !isNaN(parseFloat(this.options.iconTravelLength))) {
            destinationPathLength = fullPathLength * parseFloat(this.options.iconTravelLength);
        }
        var halfPathLength = (destinationPathLength) - (destinationPathLength / (this.options.easeOutPiece ? this.options.easeOutPiece : 50));
        var width = halfPathLength / this._map.getZoom();
        var height = halfPathLength / this._map.getZoom();
        width = Math.min(Math.max(width, 30), this.options.iconMaxWidth ? this.options.iconMaxWidth : 50);
        height = Math.min(Math.max(height, 30), this.options.iconMaxHeight ? this.options.iconMaxHeight : 50);
        var fullAnimatedTime = this.options.fullAnimatedTime ? this.options.fullAnimatedTime : 7000;
        var easeOutTime = this.options.easeOutTime ? this.options.easeOutTime : 2500;
        var lastStep = 0;
        Snap.animate(0, halfPathLength, function (step) {
            // show image when plane start to animate
            spaceship_img.attr({
                visibility: 'visible',
            });
            spaceship_img.attr({ width: width, height: height, class: self.icon.class });
            lastStep = step;
            var moveToPoint = Snap.path.getPointAtLength(flightPath, step);
            var x = moveToPoint.x - (width / 2);
            var y = moveToPoint.y - (height / 2);
            spaceship.transform("translate(".concat(x, ",").concat(y, ") rotate(").concat(moveToPoint.alpha - 90, ", ").concat(width / 2, ", ").concat(height / 2, ")"));
        }, easeOutTime, mina.easeout, function () {
            Snap.animate(halfPathLength, destinationPathLength, function (step) {
                lastStep = step;
                var moveToPoint = Snap.path.getPointAtLength(flightPath, step);
                var x = moveToPoint.x - width / 2;
                var y = moveToPoint.y - height / 2;
                spaceship.transform("translate(".concat(x, ",").concat(y, ") rotate(").concat(moveToPoint.alpha - 90, ", ").concat(width / 2, ", ").concat(height / 2, ")"));
            }, fullAnimatedTime, mina.easein, function () {
                // done
            });
        });
    },
    getPath: function () {
        return this._coords;
    },
    setPath: function (path) {
        this._setPath(path);
        return this.redraw();
    },
    getBounds: function () {
        return this._bounds;
    },
    getMidPoint: function (from, to, deep, round_side) {
        if (round_side === void 0) { round_side = 'LEFT_ROUND'; }
        var offset = 3.14;
        if (round_side === 'RIGHT_ROUND') {
            offset *= -1;
        }
        var latlng1 = from;
        var latlng2 = to;
        var offsetX = latlng2.lng - latlng1.lng;
        var offsetY = latlng2.lat - latlng1.lat;
        var r = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));
        var theta = Math.atan2(offsetY, offsetX);
        var thetaOffset = (offset / (deep || 4));
        var r2 = (r / 2) / (Math.cos(thetaOffset));
        var theta2 = theta + thetaOffset;
        var midpointX = (r2 * Math.cos(theta2)) + latlng1.lng;
        var midpointY = (r2 * Math.sin(theta2)) + latlng1.lat;
        return [midpointY, midpointX];
    },
    _setPath: function (path) {
        this._coords = path;
        this._bounds = this._computeBounds();
    },
    _computeBounds: function () {
        var bound = new L.LatLngBounds();
        bound.extend(this._coords.from);
        bound.extend(this._coords.to); // for single destination
        bound.extend(this._coords.mid);
        return bound;
    },
    getCenter: function () {
        return this._bounds.getCenter();
    },
    _update: function () {
        if (!this._map) {
            return;
        }
        this._updatePath();
    },
    _updatePath: function () {
        // animated plane
        var path = this._renderer._updateCurve(this);
        this.setAnimatePlane(path);
    },
    _project: function () {
        this._points = [];
        this._points.push('M');
        var curPoint = this._map.latLngToLayerPoint(this._coords.from);
        this._points.push(curPoint);
        if (this._coords.mid) {
            this._points.push('Q');
            curPoint = this._map.latLngToLayerPoint(this._coords.mid);
            this._points.push(curPoint);
        }
        curPoint = this._map.latLngToLayerPoint(this._coords.to);
        this._points.push(curPoint);
    },
});
L.bezier = function (config, options) {
    var paths = [];
    for (var i = 0; config.path.length > i; i++) {
        var lastDestination = false;
        for (var c = 0; config.path[i].length > c; c++) {
            var currentDestination = config.path[i][c];
            if (lastDestination) {
                var path_pair = { from: lastDestination, to: currentDestination };
                paths.push(new Bezier(path_pair, config.icon, options));
            }
            lastDestination = config.path[i][c];
        }
    }
    return L.layerGroup(paths);
};