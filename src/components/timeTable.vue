<template>
    <div
        v-if="show && schedule.length"
        class="campaign__times"
        :class="disabledControl ? 'm--info' : 'form-control p-3 p-xl-4 mb-4'"
    >
        <div class="table-responsive pb-2">
            <div class="campaign__times-row m--hours d-flex justify-content-end">
                <div
                    v-for="hour in 24"
                    :key="`id-${idKey}-hour-'${+hour - 1}`"
                    class="m--col"
                >
                    {{ hour - 1 }}
                </div>
            </div>
            <div
                v-if="!disabledControl"
                class="campaign__times-row m--hours-checks d-flex justify-content-end"
            >
                <div
                    v-for="hour in 24"
                    :key="`id-${idKey}-hour2-${hour - 1}`"
                    class="m--col"
                >
                    <b-form-checkbox
                        :id="`hour-${hour - 1}`"
                        v-model="hours[hour - 1]"
                        name="hour"
                        value="1"
                        unchecked-value="0"
                        @change="changeHour(hour - 1, $event)"
                    >
                    </b-form-checkbox>
                </div>
            </div>
            <div
                v-for="(day, index) in weekDaysName"
                :key="`id-${idKey}-${weekDaysName+index}`"
                class="campaign__times-row m--day-checks d-flex justify-content-end"
            >
                <div class="m--col">
                    {{ day }}
                </div>
                <div
                    v-if="!disabledControl"
                    class="m--col"
                >
                    <b-form-checkbox
                        :id="`weekday_${index}`"
                        v-model="weekdays[index]"
                        name="weekday"
                        value="1"
                        unchecked-value="0"
                        @change="changeDay(index, $event,day)"
                    >
                    </b-form-checkbox>
                </div>
                <div
                    v-for="hour in 24"
                    :key="`id-${idKey}-hour3-'${hour - 1}`"
                    class="m--col"
                >
                    <b-form-checkbox
                        :id="`hour_${index}_${hour - 1+Date.now()}`"
                        v-model="schedule[index][hour - 1]"
                        name="time_schedule_data"
                        value="1"
                        unchecked-value="0"
                        button
                        button-variant="outline-warning"
                        class="m--col-btn"
                        style="background: red"
                        :disabled="this.disabledTime(day,hour-1)"
                        @change="changeCell(index, hour - 1, $event)"
                    >
                    </b-form-checkbox>
                </div>
            </div>
        </div>


        <div
            v-if="!disabledControl"
            class="campaign__times-presets pt-1 ps-0 ps-md-4 d-flex flex-wrap"
        >
            <!--      <b-button-->
            <!--          v-for="item in presets"-->
            <!--          :key="`id-${idKey}-${item.name}`"-->
            <!--          variant="link"-->
            <!--          :class="preset === item.name ? 'text-warning' : 'text-muted'"-->
            <!--          @click="setPreset(item.name)"-->
            <!--      >-->
            <!--        {{ item.label }}-->
            <!--      </b-button>-->
            <b-button
                variant="link"
                class="ms-auto text-muted"
                @click="setPreset('clear')"
            >
                Сбросить
            </b-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'timeTable',
    props: {
        show: {
            type: Boolean,
            default() {
                return false;
            }
        },
        disabledControl: {
            type: Boolean,
            default() {
                return false;
            }
        },
        scheduleData: {
            type: Array,
            default() {
                return null;
            }
        },
        idKey: {
            type: Number,
            default: Date.now()
        }
    },
    created() {
        if (this.scheduleData.length === 1) {
            this.setPreset('clear');
        } else {
            this.checkControl();
            this.preset = null;
        }
    },
    data() {
        return {
            weekDaysName: [
                'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'
            ],
            presets: [{
                label: 'Круглосуточно, ежедневно',
                name: 'all'
                //}, {
                //    label: 'Круглосуточно, будни',
                //    name: 'all_workday'
                //}, {
                //    label: 'Рабочее время',
                //    name: 'worktime'
            }],
            preset: 'all',
            schedule: this.scheduleData || [[]],
            weekdays: new Array(7).fill('0'),
            hours: new Array(24).fill('0'),
            disableTime: {
                weekdays: [0, 1, 2, 3, 4, 5, 6, 23],
                weekend: [0, 1, 2, 3, 4, 5, 6, 7, 8, 23]
            }
        };
    },
    methods: {
        changeHour(index, data) {
            this.schedule.forEach((element, i) => {
                if (i === 5 || i === 6) {
                    this.schedule[i][index] = this.disabledTime('Вс', index) ? '0' : data;
                } else {
                    this.schedule[i][index] = this.disabledTime('', index) ? '0' : data;
                }
            });
            if (data === '0') {
                this.weekdays.fill('0');
            } else {
                this.checkControl();
            }
            this.$emit('changeScheduleData', this.schedule);
        },
        changeDay(index, data, day) {
            this.schedule[index] = this.fillingDaysTime(new Array(24).fill(data), data, day);
            if (data === '0') {
                this.hours.fill('0');
            } else {
                this.checkControl();
            }
            this.$emit('changeScheduleData', this.schedule);
        },
        changeCell(row, col, data) {
            if (data === '0') {
                this.weekdays[row] = '0';
                this.hours[col] = '0';
            } else {
                this.checkControl();
            }
            this.preset = null;
            this.$emit('changeScheduleData', this.schedule);
        },
        checkControl() {
            this.weekdays.forEach((element, i) => {
                if (this.schedule[i].indexOf('0') === -1) {
                    this.weekdays[i] = '1';
                }
            });
            this.hours.forEach((element, i) => {
                let col = this.schedule.map((value, row) => this.schedule[row][i]);
                if (col.indexOf('0') === -1) {
                    this.hours[i] = '1';
                }
            });
        },
        setPreset(preset) {
            this.preset = preset;
            if (preset === 'all') {
                this.weekdays.fill('1');
                this.hours.fill('1');
                for (let index = 0; index < 7; index++) {
                    this.schedule[index] = new Array(24).fill('1');
                }
            } else if (preset === 'all_workday') {
                this.weekdays.fill('1');
                this.weekdays[5] = '0';
                this.weekdays[6] = '0';
                this.hours.fill('0');
                for (let day = 0; day < 7; day++) {
                    if (day < 5) {
                        this.schedule[day] = new Array(24).fill('1');
                    } else {
                        this.schedule[day] = new Array(24).fill('0');
                    }
                }
            } else if (preset === 'worktime') {
                this.weekdays.fill('0');
                this.hours.fill('0');
                for (let day = 0; day < 7; day++) {
                    if (day < 5) {
                        for (let hour = 0; hour < 24; hour++) {
                            if (hour > 8 && hour < 18) {
                                this.schedule[day][hour] = '1';
                            } else {
                                this.schedule[day][hour] = '0';
                            }
                        }
                    } else {
                        this.schedule[day] = new Array(24).fill('0');
                    }
                }
            } else if (preset === 'clear') {
                this.weekdays.fill('0');
                this.hours.fill('0');
                for (let index = 0; index < 7; index++) {
                    this.schedule[index] = new Array(24).fill('0');
                }
            }
        },
        disabledTime(day, time) {
            if (day === 'Сб' || day === 'Вс') return this.disableTime.weekend.includes(time);
            else return this.disableTime.weekdays.includes(time);
        },
        fillingDaysTime(array, data, day) {
            return array.map((data, index) => {
                if (day === 'Сб' || day === 'Вс') {
                    return this.disableTime.weekend.includes(index) ? '0' : data
                } else {
                    return this.disableTime.weekdays.includes(index) ? '0' : data
                }
            })
        },
    }
}
</script>

