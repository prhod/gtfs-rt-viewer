// source of this code : https://codepen.io/kriz/pen/jdxYXY


class MapboxGLButtonControl {
  constructor ({
    className = "",
    title = "",
    eventHandler = false
  }) {
    this._className = className;
    this._title = title;
    this._eventHandler = eventHandler;
  }

  onAdd(map) {
    this._btn = document.createElement("button");
    this._btn.className = "mapboxgl-ctrl-icon" + " " + this._className;
    this._btn.type = "button";
    this._btn.title = this._title;
    this._btn.onclick = this._eventHandler;

    this._container = document.createElement("div");
    this._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
    this._container.appendChild(this._btn);
    this._map = map;

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

export default MapboxGLButtonControl;

/* Instantiate new controls with custom event handlers */
/*
  const ctrlPoint = new MapboxGLButtonControl({
  className: "mapbox-gl-draw_point",
  title: "Draw Point",
  eventHandler: one
});
*/

/* Add Controls to the Map */
/*
map.addControl(new mapboxgl.NavigationControl(), "top-left");
map.addControl(new PitchToggle({ minpitchzoom: 11 }), "top-left");
map.addControl(ctrlPoint, "bottom-left");
map.addControl(ctrlLine, "bottom-right");
map.addControl(ctrlPolygon, "top-left");
*/
