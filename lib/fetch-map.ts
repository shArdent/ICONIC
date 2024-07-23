export const starterPlaces = async () => {
    let center = new google.maps.LatLng(-7.3505, 108.2172);
    const { Place } = (await google.maps.importLibrary(
        "places"
    )) as google.maps.PlacesLibrary;

    // Restrict within the map viewport.

    const request = {
        // required parameters
        fields: ["displayName", "location", "businessStatus"],
        locationRestriction: {
            center: center,
            radius: 10000,
        },
        // optional parameters
        includedPrimaryTypes: ["hospital"],
    };

    //@ts-ignore
    const { places } = await Place.searchNearby(request);

    return places;
};