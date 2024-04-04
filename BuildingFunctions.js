
class Building {
    name;
    topLeft;
    topRight;
    bottomLeft;
    bottomRight;

    constructor(name, topLeft, topRight, bottomLeft, bottomRight) {
        this.name = name;
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
    }
}

const buildingList = [
    new Building("East Architecture",
                 [33.776217787259306, -84.39542688430666],
                 [33.77621278221531, -84.39496474519075],
                 [33.77607138960092, -84.39542086294956],
                 [33.77607889717923, -84.39497678790335])
]

export const isInEastArchitecture = (lat, lng) => {
    const topLeft = [33.77630556911948, -84.39575491672663]
    const bottomLeft = [33.77565645321612, -84.39568608972736]
    const bottomRight = [33.77568505842732, -84.39492369835084]
    const topRight = [33.776261561417044, -84.39491575677398]

    //return true; //DEBUGGING
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