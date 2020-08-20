import TimeSlider from '@/components/TimeSlider.vue'
import moment from 'moment'

describe('TimeSlider.vue', () => {
  it('calculates time scale', () => {
    const ts = moment('2013-02-08 09:38:26')
    expect(
      TimeSlider.methods.calculateTimestamps(ts)
      .map(ts => moment.unix(ts).format('HH:mm'))
    ).toEqual([
      '08:30', '08:40', '08:50', '09:00', '09:10', '09:20', '09:30'
    ])
  })
})
