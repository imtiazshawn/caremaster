import flagIcon from "@assets/flag.svg";
import { FlexBox } from "@common/index";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const latLongs = [
  [51.548_116_720_806_625, -0.057_932_815_739_255_26],
  [51.517_224_275_022_1, -0.137_743_373_411_877_76],
];

const GoogleMaps = ({
  latitude = 51.517_224_275_022_1,
  longitude = -0.137_743_373_411_877_76,
}) => {
  const renderMarkers = async (map: any) => {
    latLongs.forEach((latLong) => {
      const marker = new window.google.maps.Marker({
        position: { lat: latLong[0], lng: latLong[1] },
        map,
        icon: flagIcon,
      });
      return marker;
    });
  };

  return (
    <FlexBox
      style={{
        height: "70vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "-20px",
      }}
    >
      <LoadScript googleMapsApiKey='AIzaSyCPRih4GYZvz32JJRmRrHZhtRkONM-fywY'>
        <GoogleMap
          mapContainerStyle={{ height: "70vh", width: "100%" }}
          center={{ lat: latitude, lng: longitude }}
          zoom={10}
          onLoad={renderMarkers}
        >
          <Marker
            position={{ lat: latitude, lng: longitude }}
            icon={flagIcon}
          />
        </GoogleMap>
      </LoadScript>
    </FlexBox>
  );
};

export default GoogleMaps;
