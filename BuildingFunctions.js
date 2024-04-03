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

export const isInInstructionalCenter = (lat, lng) => {
    const topLeft = [33.775685157019936, -84.4014699217776]
    const topRight = [33.775672667290166, -84.4010379308681]
    const bottomLeft = [33.77524489294654, -84.40148494754837]
    const bottomRight = [33.775276117423466, -84.40110554683653]

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