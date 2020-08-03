import axios from "axios"

export default class RadarService {

  static fetchRadarEntries() {
    return axios.get("http://pogodynka.pl/api/radars/v1/list/cmax").then(result => result.data.cmax.list)
  }

}
