
const GOOGLE_API_KEY = 'AIzaSyBzawyNa6Sdxt-u6EIk3bZl4ODY2HBnDWM';


export const getMapPreview = (lat, lng) => {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
};

export const getAddress = async (lat, lng) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Something went wrong');
    }
    const data = await response.json();
    return data.results[0].formatted_address;
};
