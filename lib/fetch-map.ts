
export const starterPlaces = async (currentPosition: google.maps.LatLng) => {
    let center = currentPosition;

    const { Place } = await google.maps.importLibrary(
        "places"
    ) as google.maps.PlacesLibrary;


    const request = {
        fields: ["displayName", "location", "businessStatus"],
        locationRestriction: {
            center: center,
            radius: 10000,
        },
        includedPrimaryTypes: ["hospital"],
    };

    //@ts-ignore
    const { places }: { places: google.maps.places.PlaceResult[] } = await Place.searchNearby(request);

    return places;
};

export const getRs = async (textQuery: string) => {

    const { Place } = await google.maps.importLibrary(
        "places"
    ) as google.maps.PlacesLibrary;

    const request = {
        textQuery,
        fields: ["displayName", "location", "businessStatus"],
        locationBias: {
            lat: -7.328647900226865,
            lng: 108.23270650372348
        },
        includedType: "hospital",
    };
    //@ts-ignore
    const { places } = await Place.searchByText(request)

    return places[0];

}