import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: require('https://i.pinimg.com/736x/54/69/e1/5469e1de14c7bf706f1452987d3b48fe--vector-clipart-maps.jpg'),
    iconRetinaUrl: require('https://i.pinimg.com/736x/54/69/e1/5469e1de14c7bf706f1452987d3b48fe--vector-clipart-maps.jpg'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(60, 75),
    className: 'leaflet-div-icon'
});

export { iconPerson };