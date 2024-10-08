import { FlexBox } from "@common/index";
import { config } from "@config/index";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { useGetServiceUsersQuery } from "@reducers/api/serviceUsers";
import { useEffect, useState } from "react";

const centerLatLong = [51.548_116_720_806_625, -0.057_932_815_739_255_26];

const GoogleMapComponent = () => {
  const { data: serviceUsers } = useGetServiceUsersQuery();

  const renderMarkers = async (map: any) => {
    serviceUsers?.forEach(({ latitude, longitude }) => {
      if (Number.isNaN(Number(latitude)) || Number.isNaN(Number(longitude))) {
        return undefined;
      }
      const marker = new window.google.maps.Marker({
        position: { lat: Number(latitude), lng: Number(longitude) },
        map,
        // this is for to show any image on map don't wanna lose it that's why commented
        // icon: {
        //   url: "",
        //   // url: `${proPic}?pro-pic=true`, // url
        //   scaledSize: new google.maps.Size(40, 40), // scaled size
        //   origin: new google.maps.Point(0, 0), // origin
        //   anchor: new google.maps.Point(0, 0), // anchor
        //   // path: google.maps.SymbolPath.CIRCLE,
        //   strokeColor: "red",
        //   strokeWeight: 2,
        //   fillColor: "red",
        //   strokeOpacity: 1,
        // },
      });
      return marker;
    });
  };

  const mapKey = Math.random().toString();
  const [reloadMap, setReloadMap] = useState(false);

  // Note (Paul, 2023-12-02): This is a hack to force the map to reload
  // when we change the route. Otherwise, the map will not render.
  useEffect(() => {
    setReloadMap(false);
    const timer = setTimeout(() => {
      setReloadMap(true);
    }, 1);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <FlexBox
      style={{
        height: "50vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "-20px",
      }}
      sx={{
        [`img [src~="pro-pic"]`]: {
          borderRadius: "50%",
          border: "2px solid #fff",
        },
      }}
      key={mapKey}
    >
      <LoadScript
        googleMapsApiKey={config.GOOGLE_MAPS_API_KEY}
        key={mapKey}
      >
        {reloadMap && (
          <GoogleMap
            mapContainerStyle={{ height: "50vh", width: "100%" }}
            center={{ lat: centerLatLong[0], lng: centerLatLong[1] }}
            zoom={10}
            onLoad={renderMarkers}
            key={mapKey}
          ></GoogleMap>
        )}
      </LoadScript>
    </FlexBox>
  );
};

export default GoogleMapComponent;
