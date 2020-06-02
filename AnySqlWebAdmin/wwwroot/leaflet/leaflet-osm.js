L.OSM = {};

L.OSM.TileLayer = L.TileLayer.extend({
  options: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
  },

  initialize: function (options) {
    options = L.Util.setOptions(this, options);
    L.TileLayer.prototype.initialize.call(this, options.url);
  }
});

L.OSM.Mapnik = L.OSM.TileLayer.extend({
  options: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    maxZoom: 19
  }
});

L.OSM.CycleMap = L.OSM.TileLayer.extend({
  options: {
    url: 'https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}{r}.png?apikey={apikey}',
    attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors. Tiles courtesy of <a href="http://www.thunderforest.com/" target="_blank">Andy Allan</a>'
  }
});

L.OSM.TransportMap = L.OSM.TileLayer.extend({
  options: {
    url: 'https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}{r}.png?apikey={apikey}',
    attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors. Tiles courtesy of <a href="http://www.thunderforest.com/" target="_blank">Andy Allan</a>'
  }
});

L.OSM.HOT = L.OSM.TileLayer.extend({
  options: {
    url: 'https://tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    maxZoom: 20,
    subdomains: 'abc',
    attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors. Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
  }
});

L.OSM.GPS = L.OSM.TileLayer.extend({
  options: {
    url: 'https://gps-{s}.tile.openstreetmap.org/lines/{z}/{x}/{y}.png',
    maxZoom: 20,
    subdomains: 'abc'
  }
});

L.OSM.DataLayer = L.FeatureGroup.extend({
  options: {
    areaTags: ['area', 'building', 'leisure', 'tourism', 'ruins', 'historic', 'landuse', 'military', 'natural', 'sport'],
    uninterestingTags: ['source', 'source_ref', 'source:ref', 'history', 'attribution', 'created_by', 'tiger:county', 'tiger:tlid', 'tiger:upload_uuid'],
    styles: {}
  },

  initialize: function (xml, options) {
    L.Util.setOptions(this, options);

    L.FeatureGroup.prototype.initialize.call(this);

    if (xml) {
      this.addData(xml);
    }
  },


  getPolygonData: function (latLngs)
  {
      // event.sourceTarget.feature.nodes[q].latLng.lng

      var data = [];
      for (let q = 0; q < latLngs.length; ++q)
      {
          data.push(new L.LatLng(
                latLngs[q].lat
              , latLngs[q].lng
              , latLngs[q].alt
          ));
      }

      if (data[0].lat != data[data.length - 1].lat || data[0].lng != data[data.length - 1].lng)
      {
          data.push(new L.LatLng(
                data[0].lat
              , data[0].lng
              , data[0].alt
          ));
      }

      data.area = parseFloat(polygonArea(data));
      return data;
  },


  addData: function (features) {
    if (!(features instanceof Array)) {
      features = this.buildFeatures(features);
    }
    
    
    for (var i = 0; i < features.length; i++) {
      var feature = features[i], layer;
      
      var isPolygon = false;
      var addPolygon = false;
      var polygonData = null;
      
      if (feature.type === "changeset") {
        layer = L.rectangle(feature.latLngBounds, this.options.styles.changeset);
      } else if (feature.type === "node") {
        layer = L.circleMarker(feature.latLng, this.options.styles.node);
      } else {
        var latLngs = new Array(feature.nodes.length);
        
        for (var j = 0; j < feature.nodes.length; j++) {
          latLngs[j] = feature.nodes[j].latLng;
        }
        
        if (this.isWayArea(feature)) {
            latLngs.pop(); // Remove last == first.

            // var area = parseFloat(polygonArea(latLngs));
            //if (area > 9000)
            // if (features[i].tags.landuse === "residential")
            // if (features[i].tags.leisure === "park")
            if (features[i].tags.building != null)
            { 
                addPolygon = true;
                polygonData = this.getPolygonData(latLngs)
                // console.log(area);
                // console.log(features[i])
            }

            //layer = L.polygon(latLngs, this.options.styles.area);
            layer = L.polygon(latLngs, { className: 'osm_data_polygon', __color: "red", __dashArray: '10,10' } );
            isPolygon = true;
        } else {
          layer = L.polyline(latLngs, this.options.styles.way);
        }
      }
      
      // console.log("addto", this);
      // this: FeatureGroup - extends LayerGroup
      if (isPolygon && addPolygon)
      {
          if(false)
          layer.on("click", function (event)
          {
              console.log(event);
              // console.log(latLngs);

              if (!(event && event.sourceTarget && event.sourceTarget.feature && event.sourceTarget.feature.nodes))
                  return;

              if (event.sourceTarget.feature.nodes.constructor !== Array)
                  return;

              var data = [];
              for (let q = 0; q < event.sourceTarget.feature.nodes.length; ++q)
              {
                  data.push(new L.LatLng(
                        event.sourceTarget.feature.nodes[q].latLng.lat
                      , event.sourceTarget.feature.nodes[q].latLng.lng
                      , event.sourceTarget.feature.nodes[q].latLng.alt
                  ));
              }

              if (data[0].lat != data[data.length - 1].lat || data[0].lng != data[data.length - 1].lng)
              {
                  data.push(new L.LatLng(
                        event.sourceTarget.feature.nodes[0].latLng.lat
                      , event.sourceTarget.feature.nodes[0].latLng.lng
                      , event.sourceTarget.feature.nodes[0].latLng.alt
                  ));
              }

              // console.log("area", parseFloat(polygonArea(data)));
              // console.log("data", data);
              // console.log("area", polygonArea(data));
              
              //for (var p = 0; p < data.length; ++p)
              //{
              //    console.log("p: ", p, data[0].lat);
              //    console.log("p: ", p, data[0].lng);
              //}

          });

          
          var contentString = "area: ~" + thousandSeparator(polygonData.area) + "m<sup>2</sup></br>GPS:</br>";
          contentString += "<b>added by leaflet-osm.js</b> <br />"
          contentString += CreateSqlPolygon(polygonData);
          contentString += '<textarea style="width: 100%; height: 5cm;">'
          contentString += createInsertScriptSQL(polygonData);
          contentString += "</textarea>"

          
          /*
          for (var r = 0; r < polygonData.length; ++r)
          {
              contentString += polygonData[r].lat+ "°N,"+ polygonData[r].lng + "°E<br />";
          }
          */



          
          var popup = new L.Popup()
              .setContent(contentString)
              ;

          layer.bindPopup(popup);

          layer.on("click", function (event)
          {
              // console.log("lc", event);
              // console.log("tgt", event.target);
              // console.log("sd", event.sourceTarget);
              // console.log("ogt", event.originalEvent.target);
              // event.originalEvent.target.setAttribute("style", "fill: blue !important;");

              // https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
              if (event.originalEvent.target.classList.contains("active"))
                  event.originalEvent.target.classList.remove("active");
              else
                event.originalEvent.target.classList.add("active");
          });

          layer.addTo(this);
          layer.feature = feature;  
      }
    } // Next i 
  },

  buildFeatures: function (xml) {
    var features = L.OSM.getChangesets(xml),
      nodes = L.OSM.getNodes(xml),
      ways = L.OSM.getWays(xml, nodes),
      relations = L.OSM.getRelations(xml, nodes, ways);

    for (var node_id in nodes) {
      var node = nodes[node_id];
      if (this.interestingNode(node, ways, relations)) {
        features.push(node);
      }
    }

    for (var i = 0; i < ways.length; i++) {
      var way = ways[i];
      features.push(way);
    }

    return features;
  },

  isWayArea: function (way) {
    if (way.nodes[0] != way.nodes[way.nodes.length - 1]) {
      return false;
    }

    for (var key in way.tags) {
      if (~this.options.areaTags.indexOf(key)) {
        return true;
      }
    }

    return false;
  },

  interestingNode: function (node, ways, relations) {
    var used = false;

    for (var i = 0; i < ways.length; i++) {
      if (ways[i].nodes.indexOf(node) >= 0) {
        used = true;
        break;
      }
    }

    if (!used) {
      return true;
    }

    for (var i = 0; i < relations.length; i++) {
      if (relations[i].members.indexOf(node) >= 0)
        return true;
    }

    for (var key in node.tags) {
      if (this.options.uninterestingTags.indexOf(key) < 0) {
        return true;
      }
    }

    return false;
  }
});

L.Util.extend(L.OSM, {
  getChangesets: function (xml) {
    var result = [];
    
    var nodes = xml.getElementsByTagName("changeset");
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i], id = node.getAttribute("id");
      result.push({
        id: id,
        type: "changeset",
        latLngBounds: L.latLngBounds(
          [node.getAttribute("min_lat"), node.getAttribute("min_lon")],
          [node.getAttribute("max_lat"), node.getAttribute("max_lon")]),
        tags: this.getTags(node)
      });
    }

    return result;
  },

  getNodes: function (xml) {
    var result = {};

    var nodes = xml.getElementsByTagName("node");
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i], id = node.getAttribute("id");
      result[id] = {
        id: id,
        type: "node",
        latLng: L.latLng(node.getAttribute("lat"),
                         node.getAttribute("lon"),
                         true),
        tags: this.getTags(node)
      };
    }

    return result;
  },

  getWays: function (xml, nodes) {
    var result = [];

    var ways = xml.getElementsByTagName("way");
    for (var i = 0; i < ways.length; i++) {
      var way = ways[i], nds = way.getElementsByTagName("nd");

      var way_object = {
        id: way.getAttribute("id"),
        type: "way",
        nodes: new Array(nds.length),
        tags: this.getTags(way)
      };

      for (var j = 0; j < nds.length; j++) {
        way_object.nodes[j] = nodes[nds[j].getAttribute("ref")];
      }
      
      result.push(way_object);
    }

    return result;
  },

  getRelations: function (xml, nodes, ways) {
    var result = [];
    
    var rels = xml.getElementsByTagName("relation");
    for (var i = 0; i < rels.length; i++) {
      var rel = rels[i], members = rel.getElementsByTagName("member");

      var rel_object = {
        id: rel.getAttribute("id"),
        type: "relation",
        members: new Array(members.length),
        tags: this.getTags(rel)
      };

      for (var j = 0; j < members.length; j++) {
        if (members[j].getAttribute("type") === "node")
          rel_object.members[j] = nodes[members[j].getAttribute("ref")];
        else // relation-way and relation-relation membership not implemented
          rel_object.members[j] = null;
      }

      result.push(rel_object);
    }

    return result;
  },

  getTags: function (xml) {
    var result = {};

    var tags = xml.getElementsByTagName("tag");
    for (var j = 0; j < tags.length; j++) {
      result[tags[j].getAttribute("k")] = tags[j].getAttribute("v");
    }

    return result;
  }
});
