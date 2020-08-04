import axios from "axios"

const CMAX_DATA_URL = "http://pogodynka.pl/api/radars/v1/list/cmax"

export default class RadarService {

  static fetchRadarEntries() {
    return axios
      .get(CMAX_DATA_URL)
      .then(result => result.data.cmax.list)
  }

}
