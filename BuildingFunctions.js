export const isInEastArchitecture = (lat, lng) => {
    const topLeft = [33.776217787259306, -84.39542688430666]
    const topRight = [33.77621278221531, -84.39496474519075]
    const bottomLeft = [33.77607138960092, -84.39542086294956]
    const bottomRight = [33.77607889717923, -84.39497678790335]

    return true; //DEBUGGING
    // lat = y-axis = [0]
    // lng = x-axis = [1]

    if (lat > topLeft[0]) {
        return false
    }
    if (lat < bottomLeft[0]) {
        return false
    }
    if (lng < topLeft[1]) {
        return false;
    }
    if (lng > topRight[1]) {
        return false;
    }
    return true;
}
