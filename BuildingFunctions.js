
class Building {
    name;
    firestoreAttribute;
    topLeft;
    topRight;
    bottomLeft;
    bottomRight;

    constructor(name, firestoreAttribute, topLeft, bottomLeft, bottomRight, topRight) {
        this.name = name;
        this.firestoreAttribute = firestoreAttribute;
        this.topLeft = topLeft;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
        this.topRight = topRight;
    }

    isInBuilding(lat, lng) {
        if (lat > this.topLeft[0]) {
            return false
        }
        if (lat < this.bottomLeft[0]) {
            return false
        }
        if (lng < this.topLeft[1]) {
            return false;
        }
        if (lng > this.topRight[1]) {
            return false;
        }
        return true;
    }

    getPolygonCoordinates() {
        return [
            { latitude: this.topLeft[0], longitude: this.topLeft[1]},
            { latitude: this.bottomLeft[0], longitude: this.bottomLeft[1]},
            { latitude: this.bottomRight[0], longitude: this.bottomRight[1]},
            { latitude: this.topRight[0], longitude: this.topRight[1]}
        ]
    }
}

export const buildingList = [
    new Building("East Architecture",
                 "timeSpentInEastArchitecture",
                 [33.77630556911948, -84.39575491672663],
                 [33.77565645321612, -84.39568608972736],
                 [33.77568505842732, -84.39492369835084],
                 [33.77626156141704, -84.39491575677398]),
    new Building("Instructional Center",
                 "timeSpentInInstructionalCenter",
                 [33.775685157019936, -84.4014699217776],
                 [33.775244892946540, -84.4014849475484],
                 [33.775276117423466, -84.4011055468365],
                 [33.775672667290166, -84.4010379308681]),         
]

// ARCHIVE

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