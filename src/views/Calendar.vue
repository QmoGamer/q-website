<template>
  <div class="calendar">
    <h2>授課時間</h2>
    <header>
      <div class="week-picker">
        <button @click="updateWeekIndex(weekIndex - 1)" class="btn btn-prev-week" :disabled="weekIndex === 0">＜</button>
        <button @click="updateWeekIndex(weekIndex + 1)" class="btn btn-next-week">＞</button>
        <h3>
          {{ `${getWeekSomeDate(0).getFullYear()}/${getWeekSomeDate(0).getMonth() + 1}/${getWeekSomeDate(0).getDate()}` }}
          ~
          {{ `${getWeekSomeDate(6).getFullYear()}/${getWeekSomeDate(6).getMonth() + 1}/${getWeekSomeDate(6).getDate()}` }}
        </h3>
      </div>
      <div class="time-zone">*時間以 台北 (GMT{{ timezoneText }}:00) 顯示</div>
    </header>
    <div class="week-box" v-if="calendarList.length > 0">
      <section 
        :key="item" 
        v-for="(item, index) in calendarWeek" 
        :class="[ new Date().getTime() > getWeekSomeDate(index).getTime() ? 'disabled' : '']">
        <h4>{{ item }}</h4>
        <h4>{{ getWeekSomeDate(index).getDate() }}</h4>
        <template v-for="halfHour in halfHourList">
          <button
            v-if=" schedule[getWeekSomeDate(index).getDate()] && schedule[getWeekSomeDate(index).getDate()][halfHour] !== undefined"
            :key="`${getWeekSomeDate(index).getDate()}-${halfHour}`"
            :disabled="schedule[getWeekSomeDate(index).getDate()][halfHour] === 'booked'"
          >{{ halfHour }}</button>
        </template>
      </section>
    </div>
    <div v-else>no Data</div>
  </div>
</template>

<script>
const fakeData = {
  "available":[
    {
      "start":"2021-05-24T10:30:00Z",
      "end":"2021-05-24T11:00:00Z"
    },
    {
      "start":"2021-05-24T13:00:00Z",
      "end":"2021-05-24T14:00:00Z"
    },
    {
      "start":"2021-05-25T05:30:00Z",
      "end":"2021-05-25T07:00:00Z"
    }
  ],
  "booked":[
    {
      "start":"2021-05-24T11:00:00Z",
      "end":"2021-05-24T13:00:00Z"
    },
    {
      "start":"2021-05-24T14:00:00Z",
      "end":"2021-05-24T15:00:00Z"
    },
    {
      "start":"2021-05-25T07:00:00Z",
      "end":"2021-05-25T08:00:00Z"
    },
    {
      "start":"2020-07-18T11:30:00Z",
      "end":"2020-07-18T13:00:00Z"
    }
  ]
};
const CALENDAR_WEEK = ['日', '一', '二', '三', '四', '五', '六'];
const ONE_DAY_TIMES = 86400000;
const HALF_HOUR_TIMES = 1800000;
const HALF_HOUR_LIST = [
  '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', 
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', 
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
]

export default {
  name: 'Calendar',
  components: {},
  data: () => ({
    timezone: 0,
    weekIndex: 0,
    calendarList: [],
    calendarWeek: CALENDAR_WEEK,
    halfHourList: HALF_HOUR_LIST,
    schedule: {}
  }),
  computed: {
    timezoneText() {
      const { timezone } = this;
      const sign = timezone < 0 ? '+' : '-';
      let hour = Math.abs(timezone / 60);
      if (hour < 10) {
        hour = `0${hour}`;
      }
      return `${sign}${hour}`;
    },
  },
  created() {
    const { getWeekAllDate, getSchedule } = this;
    this.calendarList.push(getWeekAllDate(new Date()));
    this.timezone = new Date().getTimezoneOffset();
    getSchedule();
  },
  methods: {
    getSchedule() {
      const { timezone } = this;
      const refactor = (start, end, type) => {
        const startDateTimes = new Date(new Date(start).getTime() - timezone).getTime()
        const endDateTimes = new Date(new Date(end).getTime() - timezone).getTime()
        const step = (endDateTimes - startDateTimes) / HALF_HOUR_TIMES;
        for (let i = 0; i < step; i++) {
          const date = new Date(startDateTimes + (i * HALF_HOUR_TIMES));
          const hour = `${ date.getHours() < 10 ? '0' : '' }${ date.getHours() }`
          const second = `${ date.getMinutes() < 10 ? '0' : '' }${ date.getMinutes() }`
          this.schedule[date.getDate()] = { ...this.schedule[date.getDate()], [`${hour}:${second}`]: type };
        }
      }
      // api 
      fakeData.available.forEach(({ start, end }) => {
        refactor(start, end, 'available')
      });
      fakeData.booked.forEach(({ start, end }) => {
        refactor(start, end, 'booked')
      });
    },
    getWeekAllDate(date) {
      const firstDate = new Date(date.getTime() - ONE_DAY_TIMES * date.getDay())
      let dateList = [];
      for (let i = 0; i < 7; i++) {
        if (date.getDay() <= i) {
          dateList.push(new Date(firstDate.getTime() + ONE_DAY_TIMES * i));
        }
      }
      return dateList;
    },
    getWeekSomeDate(index) {
      const { weekIndex, calendarList } = this;
      if (calendarList.length < 0) {
        return new Date()
      }
      return new Date(calendarList[weekIndex][index]);
    },
    updateWeekIndex(index) {
      if (index < 0) {
        return;
      }
      const { calendarList, getWeekAllDate, weekIndex } = this;
      if (index > (calendarList.length - 1)) {
        const nextWeekFirstDate = new Date(calendarList[weekIndex][6].getTime() + ONE_DAY_TIMES * 1)
        this.calendarList.push(getWeekAllDate(nextWeekFirstDate));
      }
      this.weekIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  color: rgba(0, 0, 0, .87);
  padding: 20px;
  text-align: left;
  h2 {
    font-size: 20px;
    font-weight: 500;
  }
  header {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    align-items: center;
    .week-picker {
      display: flex;
      align-items: center;
      h3 {
        font-size: 15px;
        margin-left: 20px;
      }
      .btn {
        color: #606266;
        border: 1px solid #dcdfe6;
        padding: 2px 14px;
        border-radius: 3px;
        &:focus {
          color: #02cab9;
          border-color: #02cab9;
        }
        &:disabled {
          color: #c0c4cc;
          cursor: not-allowed;
          border-color: #ebeef5;
        }
        &.btn-prev-week {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-right: 0;
        }
        &.btn-next-week {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
    }
    .time-zone {
      font-size: 12px;
      margin-left: auto;
    }
  }
  .week-box {
    display: grid;
    grid-gap: 10px;
    margin-top: 15px;
    grid-template-columns: repeat(7, 4fr);
    section {
      display: flex;
      padding: 10px 0;
      border-top: 4px solid #02cab9;
      align-items: center;
      flex-direction: column;
      &.disabled {
        border-color: #d2d2d2;
      }
      h4 {
        line-height: 24px;
      }
      button {
        color: #02cab9;
        font-size: 12px;
        font-weight: 700;
        line-height: 26px;
        &:first-of-type {
          margin-top: 10px;
        }
        &:disabled {
          color: #b6b6b6;
        }
      }
    }
  }
}
</style>
