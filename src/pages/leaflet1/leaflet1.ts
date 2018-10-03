import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as L from 'leaflet';

@IonicPage()
@Component({
  selector: 'page-leaflet1',
  templateUrl: 'leaflet1.html',
})
export class Leaflet1Page {

  map: L.Map;
  center: L.PointTuple;
  markerGroup: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation) { }

  ionViewDidLoad() {
    this.center = [48.1124134, -1.5380102999999998];
    this.leafletMap();
  }

  leafletMap() {
    this.map = L.map('leafletmap', {
      center: this.center,
      zoom: 13
    });

    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Test de la formation Ionic'
    }).addTo(this.map);

    var marker = new L.Marker(this.center);
    this.markerGroup = L.featureGroup();
    this.markerGroup.addLayer(marker);
    this.map.addLayer(this.markerGroup);

    marker.bindPopup("<p>Ici se déroule une formation Ionic</p>");
  }

  public updateLocation() {
    this.geolocation.getCurrentPosition().then(position => {
      this.addHereMarker(position);
    }).catch((error) => {
      console.error('Erreur lors de récupération de la position : ' + error);
    });
  }


  addHereMarker(position) {
    // remove old layer
    if (this.map && this.markerGroup) {
      this.map.removeLayer(this.markerGroup);
    }

    this.markerGroup = L.featureGroup();
    let marker: any = L.marker([position.coords.latitude, position.coords.longitude]).on('click', () => {
      var popup = L.popup()
        .setLatLng([position.coords.latitude, position.coords.longitude])
        .setContent('<strong>Je suis ici</strong>')
        .openOn(this.map);
      popup.openPopup();
    });
    var latLngs = [marker.getLatLng()];
    var markerBounds = L.latLngBounds(latLngs);
    this.map.fitBounds(markerBounds);
    this.markerGroup.addLayer(marker);
    this.map.addLayer(this.markerGroup);
  }

}
