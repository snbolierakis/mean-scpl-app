import { Component, OnInit } from '@angular/core';

declare var ol: any;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.less']
})
export class MapViewComponent implements OnInit {

ol: any;
  ngOnInit(): void {

  var map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
          zoom: true,
          attribution: false,
          rotate: false
        }),
      layers: [
        new ol.layer.Tile({
          title: 'Global Imagery',
          source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
            title: 'Earthquakes',
            source: new ol.source.Vector({
              url: '/api/features',
              format: new ol.format.GeoJSON()
            }),
            style: new ol.style.Style({
              image: new ol.style.Icon({
                src:'../assets/pointer.svg',
                scale:0.02
              })
            })
          })
      ],
      view: new ol.View({

        center: ol.proj.fromLonLat([23.678112, 37.965956]),
        zoom: 16,
      minZoom: 16,
      maxZoom: 18
      })
    });


    }
}
