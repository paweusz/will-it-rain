import axios from "axios"

const CMAX_DATA_URL = "/api/cmax"

export default class RadarService {

  static fetchRadarEntries() {
    return axios.get(CMAX_DATA_URL).then(result => result.data)
  }

}
