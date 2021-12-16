import React from 'react';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './../css/map.css';
import ApiWebService from "../api/ApiWebService";
import ErrorCodeManager from "./ErrorCodeManager";
import axios from "axios";
import marker from './../images/marker.png';
import { Icon } from 'leaflet'

const myIcon = new Icon({
    iconUrl: marker,
    iconSize: [32,32]
});

class WalloniaFixedMap extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            markers: [],
            error: undefined,
        }
    }

    async componentDidMount() {
        try{
            const response = await ApiWebService.get("/report");
            const reports = response.data;

            const markers = [];
            const promises = [];

            for(const report of reports){
                const address = `https://nominatim.openstreetmap.org/search?q=${escape(report.street).normalize("NFC")}%20${escape(report.house_number).normalize("NFC")}%20${report.zip_code}%20${escape(report.city).normalize("NFC")}&format=json`;
                const addressQuery = axios.get(address);
                promises.push(addressQuery)
            }

            const responses = await Promise.all(promises);
            for(const iResponse in responses){
                const response = responses[iResponse];
                const city = response.data[0];

                if(city !== undefined){
                    markers.push({lat: city.lat, lon: city.lon, description: reports[iResponse].description});
                }
            }

            this.setState({markers, error: undefined});
        }catch (error) {
            this.setState({reports: [], error: ErrorCodeManager.message(error)});
        }
    }

    render() {
        const position = [50.1364, 5.5096];

        return (
            <div className="row">
                <div className="col">
                    {this.state.error !== undefined ?
                        <div className="text-center">{this.state.error}</div> :
                        <MapContainer id="map-container" center={position} zoom={10} >
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {this.state.markers.map((marker, idx) => {
                                const position = [marker.lat, marker.lon];

                                return (
                                    <Marker key={`marker-${idx}`} position={position} icon={myIcon}>
                                        <Popup>
                                            {marker.description}
                                        </Popup>
                                    </Marker>
                                );
                            })}
                        </MapContainer>
                    }
                </div>
            </div>
        );
    }
}

export default WalloniaFixedMap;